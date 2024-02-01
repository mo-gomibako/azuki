import { NavLink } from "@remix-run/react";
import { rpcClient } from "@/rpc/client";
import { ComponentProps, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import Icon from "./Icon";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="[--footer-height:72px] [--header-height:80px] [--navigation-rail-width:96px]">
      <div className="pt-[calc(var(--header-height))] compact:pb-[var(--footer-height)] medium:pb-[var(--footer-height)] expanded:pl-[var(--navigation-rail-width)] large:pl-[var(--navigation-rail-width)]">
        <div className="m-auto box-border max-w-[1284px] p-16">
          <div className="min-h-[100vh]">{children}</div>

          <div className="grid h-64 place-content-end text-12 leading-12+4*2 text-text4">
            © 2024 momoogles
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex h-[var(--footer-height)] bg-background1 expanded:hidden large:hidden">
        <IconNav to="/search" name="manage_search" size={32}>
          検索
        </IconNav>
        <IconNav to="/event" name="calendar_month" size={32}>
          募集
        </IconNav>
        <IconNav to="/feed" name="new_releases" size={32}>
          新着
        </IconNav>
        <IconNav to="/feed" name="release_alert" size={32}>
          注目
        </IconNav>
      </div>

      <div className="fixed inset-y-0 left-0 grid w-[var(--navigation-rail-width)] content-start pt-[var(--header-height)] compact:hidden medium:hidden">
        <IconNav to="/search" name="manage_search" size={40}>
          検索
        </IconNav>
        <IconNav to="/event" name="calendar_month" size={40}>
          募集
        </IconNav>
        <IconNav to="/feed" name="new_releases" size={40}>
          新着
        </IconNav>
        <IconNav to="/feed" name="release_alert" size={40}>
          注目
        </IconNav>
      </div>

      <div className="fixed left-0 top-0 grid h-[var(--header-height)] w-[var(--navigation-rail-width)] place-content-center font-emoji text-32 leading-32+4*2 text-brand drop-shadow-4">
        🫘
      </div>
      <div className="fixed right-0 top-0 grid h-[var(--header-height)] place-content-center pr-16">
        <a
          href={rpcClient.api.login.google.$url().toString()}
          className="relative z-0 inline-grid h-40 place-content-center rounded-full bg-brand px-16 text-14 font-bold drop-shadow-4 hover:before:absolute hover:before:inset-0 hover:before:bg-surface3 hover:before:content-['']"
        >
          ログイン
        </a>
      </div>
    </div>
  );
}

function IconNav({
  to,
  children,
  ...props
}: ComponentProps<typeof Icon> & {
  to: string;
  children: string;
}) {
  return (
    <NavLink
      to={to}
      className="inline-grid size-full place-content-center p-8 hover:bg-surface3"
    >
      <Icon {...props} />
      <span
        className={tv({
          base: "truncate text-center",
          variants: {
            size: {
              small: "text-10 leading-10+4*2",
              medium: "text-12 leading-12+4*2",
            },
          },
        })({
          size: props.size < 40 ? "small" : "medium",
        })}
        style={{
          width: props.size,
        }}
      >
        {children}
      </span>
    </NavLink>
  );
}
