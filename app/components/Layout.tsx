import { rpcClient } from "@/rpc/client";
import { ComponentProps, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import Icon from "./Icon";
import Dialog, { useDialog } from "./Dialog";
import { Link } from "@tanstack/react-router";

export default function Layout({ children }: PropsWithChildren) {
  const { getReferenceProps, setReference, ...modalProps } = useDialog();
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
        <IconNav to="/search" name="manage_search" wght={200}>
          検索
        </IconNav>
        <IconNav to="/event" name="calendar_month" wght={200}>
          募集
        </IconNav>
        <IconNav to="/feed" name="new_releases" wght={200}>
          新着
        </IconNav>
        <IconNav to="/feed" name="release_alert" wght={200}>
          注目
        </IconNav>
      </div>

      <div className="fixed inset-y-0 left-0 grid w-[var(--navigation-rail-width)] content-start pt-[var(--header-height)] compact:hidden medium:hidden">
        <IconNav to="/search" name="manage_search" size={40} wght={200}>
          検索
        </IconNav>
        <IconNav to="/event" name="calendar_month" size={40} wght={200}>
          募集
        </IconNav>
        <IconNav to="/feed" name="new_releases" size={40} wght={200}>
          新着
        </IconNav>
        <IconNav to="/feed" name="release_alert" size={40} wght={200}>
          注目
        </IconNav>
      </div>

      <div className="fixed left-0 top-0 grid h-[var(--header-height)] w-[var(--navigation-rail-width)] place-content-center font-emoji text-32 leading-32+4*2 text-brand drop-shadow-4 ">
        🫘
      </div>

      <div className="fixed right-0 top-0 grid h-[var(--header-height)] place-content-center pr-16">
        <button
          {...getReferenceProps()}
          ref={setReference}
          className="hover:overlay relative z-0 inline-grid h-40 place-content-center rounded-full bg-brand px-16 text-14 font-bold leading-14+4*2 text-text5 drop-shadow-4 hover:before:rounded-full"
        >
          ログイン
        </button>
        <Dialog title="ログイン" {...modalProps}>
          <div className="grid place-items-center gap-8">
            <GoogleLoginLink
              to={rpcClient.api.login.google.$url().toString()}
            />
            <AppleLoginLink />
          </div>
        </Dialog>
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
    <Link
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
          size: (props.size ?? 32) < 40 ? "small" : "medium",
        })}
        style={{
          width: props.size,
        }}
      >
        {children}
      </span>
    </Link>
  );
}

function GoogleLoginLink({ to }: { to: string }) {
  return (
    <a
      href={to}
      className="hover:overlay relative z-0 box-content inline-grid h-[40px] w-272 cursor-pointer place-content-center rounded-full border-[1px] border-[#747775] bg-[#fff] text-center font-['Roboto',arial,sans-serif] text-[14px] text-[#1f1f1f] transition-all duration-[218ms] hover:before:bg-[#303030] hover:before:opacity-[0.12]"
    >
      <div className="inline-flex items-center gap-[10px]">
        <svg
          width={20}
          height={20}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          ></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          ></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          ></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          ></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        <span className="font-['Roboto',_arial,_sans-serif] text-14 font-bold leading-14+4*2">
          Googleでログイン
        </span>
      </div>
    </a>
  );
}

function AppleLoginLink() {
  return (
    <a
      href="api/login/apple"
      aria-disabled="true"
      className="inline-grid h-40 w-272 place-content-center rounded-full bg-[white] text-[black]"
    >
      <div className="inline-flex h-[38px] items-center overflow-hidden">
        <svg
          height={40}
          viewBox="0 0 31 44"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          {/* <!-- Generator: Sketch 61 (89581) - https://sketch.com --> */}
          <title>Left Black Logo Medium</title>
          <desc>Created with Sketch.</desc>
          <g
            id="Left-Black-Logo-Medium"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect
              id="Rectangle"
              fill="#FFFFFF"
              x="0"
              y="0"
              width="31"
              height="44"
            ></rect>
            <path
              d="M15.7099491,14.8846154 C16.5675461,14.8846154 17.642562,14.3048315 18.28274,13.5317864 C18.8625238,12.8312142 19.2852829,11.852829 19.2852829,10.8744437 C19.2852829,10.7415766 19.2732041,10.6087095 19.2490464,10.5 C18.2948188,10.5362365 17.1473299,11.140178 16.4588366,11.9494596 C15.9152893,12.56548 15.4200572,13.5317864 15.4200572,14.5222505 C15.4200572,14.6671964 15.4442149,14.8121424 15.4562937,14.8604577 C15.5166879,14.8725366 15.6133185,14.8846154 15.7099491,14.8846154 Z M12.6902416,29.5 C13.8618881,29.5 14.3812778,28.714876 15.8428163,28.714876 C17.3285124,28.714876 17.6546408,29.4758423 18.9591545,29.4758423 C20.2395105,29.4758423 21.0971074,28.292117 21.9063891,27.1325493 C22.8123013,25.8038779 23.1867451,24.4993643 23.2109027,24.4389701 C23.1263509,24.4148125 20.6743484,23.4122695 20.6743484,20.5979021 C20.6743484,18.1579784 22.6069612,17.0588048 22.7156707,16.974253 C21.4353147,15.1382708 19.490623,15.0899555 18.9591545,15.0899555 C17.5217737,15.0899555 16.3501271,15.9596313 15.6133185,15.9596313 C14.8161157,15.9596313 13.7652575,15.1382708 12.521138,15.1382708 C10.1536872,15.1382708 7.75,17.0950413 7.75,20.7911634 C7.75,23.0861411 8.64383344,25.513986 9.74300699,27.0842339 C10.6851558,28.4129053 11.5065162,29.5 12.6902416,29.5 Z"
              id=""
              fill="#000000"
              fillRule="nonzero"
            ></path>
          </g>
        </svg>
        <span className="font-['Segoe_UI',Meiryo,system-ui,-apple-system,BlinkMacSystemFont,sans-serif] text-14 font-bold leading-14+4*2">
          Appleでサインイン
        </span>
      </div>
    </a>
  );
}
