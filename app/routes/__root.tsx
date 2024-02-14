import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import Layout from "../components/Layout";
import { rpcClient } from "@/rpc/client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export const Route = createRootRoute({
  component: App,
  loader: async () => {
    const sessionUser = await rpcClient.api.session_user
      .$get()
      .then((v) => v.json());
    return { sessionUser };
  },
});

function App() {
  const { sessionUser } = Route.useLoaderData();
  const auth = useAuth();

  const matches = useRouterState().matches;
  const getTitle = matches
    .map((v) => ("getTitle" in v.routeContext ? v.routeContext.getTitle : null))
    .findLast((v) => v !== null);
  const getDescription = matches
    .map((v) =>
      "getDescription" in v.routeContext ? v.routeContext.getDescription : null,
    )
    .findLast((v) => v !== null);

  useEffect(() => {
    auth.setUser(sessionUser.user?.id ?? "");
  });

  return (
    <html lang="ja">
      <head>
        <title>{getTitle?.() ?? "azuki"}</title>
        <meta name="description" content={getDescription?.() ?? "🫘"} />
      </head>
      <body className="bg-background1 font-noto text-text2">
        <Layout>
          <Outlet />
        </Layout>
      </body>
    </html>
  );
}
