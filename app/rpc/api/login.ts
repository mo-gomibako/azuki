import {
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
} from "arctic";
import { setCookie, getCookie } from "hono/cookie";
import initializeLucia, { initializeGoogleAuth } from "@/initializeLucia";
import { drizzle } from "drizzle-orm/d1";
import { oauthAccounts, users } from "@/schema";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import initializeHono from "@/initializeHono";
import { dev } from "@/env";

const google = initializeHono()
  .get("/", async (c) => {
    const googleAuth = initializeGoogleAuth(c);
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    setCookie(c, "google_oauth_state", state, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 10,
    });
    setCookie(c, "google_oauth_code_verifier", codeVerifier, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 10,
    });

    const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile"],
    });

    return c.redirect(url.toString());
  })
  .get("/callback", async (c) => {
    const storedState = getCookie(c, "google_oauth_state");
    const storedCodeVerifier = getCookie(c, "google_oauth_code_verifier");

    const code = c.req.query("code");
    const state = c.req.query("state");

    if (!state || !code || !storedState || !storedCodeVerifier) {
      throw new HTTPException(400, { message: "Invalid request" });
    }

    if (state !== storedState) {
      throw new HTTPException(400, { message: "Invalid request" });
    }

    try {
      const db = drizzle(c.env.DB);
      const lucia = initializeLucia(db);
      const googleAuth = initializeGoogleAuth(c);

      const tokens = await googleAuth.validateAuthorizationCode(
        code,
        storedCodeVerifier,
      );
      const googleUser = (await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        },
      ).then((res) => res.json())) as {
        sub: string;
        name: string;
        picture: string;
      };

      const existingAccount = await db
        .select()
        .from(oauthAccounts)
        .where(
          and(
            eq(oauthAccounts.providerId, "google"),
            eq(oauthAccounts.providerUserId, googleUser.sub),
          ),
        );

      if (existingAccount[0]) {
        const session = await lucia.createSession(
          existingAccount[0].userId,
          {},
        );
        const sessionCookie = lucia.createSessionCookie(session.id);
        c.res.headers.append("Set-Cookie", sessionCookie.serialize());

        if (dev(c.env)) {
          return c.redirect("http://localhost:5174/");
        }
        return c.redirect("https://azuki.momoogles.net");
      }

      const userId = crypto.randomUUID();

      await db.batch([
        db.insert(users).values({
          id: userId,
          name: googleUser.name,
          icon: googleUser.picture,
        }),
        db.insert(oauthAccounts).values({
          userId: userId,
          providerId: "google",
          providerUserId: googleUser.sub,
        }),
      ]);

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      c.res.headers.append("Set-Cookie", sessionCookie.serialize());

      if (dev(c.env)) {
        return c.redirect("http://localhost:5174/");
      }
      return c.redirect("https://azuki.momoogles.net");
    } catch (e) {
      if (e instanceof OAuth2RequestError) {
        throw new HTTPException(400, { message: "Invalid request" });
      }
      throw new HTTPException(500, { message: "Internal Server Error" });
    }
  });

export const apiLogin = initializeHono().route("google", google);
