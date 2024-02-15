import {
  Outlet,
  StaticDataRouteOption,
  createRootRoute,
  useMatches,
} from "@tanstack/react-router";
import Layout from "../components/Layout";
import { rpcClient } from "@/rpc/client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    // NOTE: これをoptionalにするときは<App />内でのnon-null assertionに注意すること
    title: string;
    // NOTE: これをoptionalにするときは<App />内でのnon-null assertionに注意すること
    description: string;
  }
}

export const Route = createRootRoute({
  component: App,
  staticData: {
    title: "azuki",
    description: "🫘",
  },
  loader: async () => {
    const sessionUser = await rpcClient.api.session_user
      .$get()
      .then((v) => v.json());
    return { sessionUser };
  },
});

function useStaticDataLast(key: keyof StaticDataRouteOption) {
  const matches = useMatches();
  return (
    matches
      .map((v) => (key in v.staticData ? v.staticData[key] : null))
      .findLast((v) => v !== null) ?? null
  );
}

function App() {
  const { sessionUser } = Route.useLoaderData();
  const auth = useAuth();

  // NOTE: StaticDataRouteOptionの型的に絶対に存在する
  const title = useStaticDataLast("title")!;
  const description = useStaticDataLast("description")!;

  useEffect(() => {
    auth.setUser(sessionUser.user?.id ?? "");
  }, [auth, sessionUser.user?.id]);

  useEffect(() => {
    const titleElement = document.querySelector("title");
    if (titleElement) {
      titleElement.innerHTML = title;
    } else {
      const el = document.createElement("title");
      el.innerHTML = title;
      document.head.appendChild(el);
    }

    const descriptionElement = document.querySelector("meta[name=description]");
    if (descriptionElement) {
      descriptionElement.setAttribute("content", description);
    } else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = description;
      document.head.appendChild(el);
    }
  }, [description, title]);

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
