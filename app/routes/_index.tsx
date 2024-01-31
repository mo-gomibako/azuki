import type { MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { rpcClient } from "@/rpc/client";
import { ComponentProps, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

export const meta: MetaFunction = () => {
  return [{ title: "azuki" }, { name: "description", content: "🫘" }];
};

export async function clientLoader() {
  const items = await rpcClient.api.items.$get().then((v) => v.json());
  const sessionUser = await rpcClient.api.session_user
    .$get()
    .then((v) => v.json());
  return { items, sessionUser };
}

export default function Index() {
  const data = useLoaderData<typeof clientLoader>();

  console.log(data);

  return (
    <div>
      <Layout>
        <div className="grid gap-24">
          <div className="text-20 leading-20+4*2">
            人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、
            人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、
            人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、
            諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、
            加盟国は、国際連合と協力して、人権及び基本的自由の普遍的な尊重及び遵守の促進を達成することを誓約したので、
            これらの権利及び自由に対する共通の理解は、この誓約を完全にするためにもっとも重要であるので、
            よって、ここに、国連総会は、
            社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、加盟国の管轄下にある地域の人民の間にも、これらの権利と自由との尊重を指導及び教育によって促進すること並びにそれらの普遍的措置によって確保することに努力するように、すべての人民とすべての国とが達成すべき共通の基準として、この人権宣言を公布する。
          </div>
          <div className="text-20 leading-20+4*2">
            人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、
            人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、
            人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、
            諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、
            加盟国は、国際連合と協力して、人権及び基本的自由の普遍的な尊重及び遵守の促進を達成することを誓約したので、
            これらの権利及び自由に対する共通の理解は、この誓約を完全にするためにもっとも重要であるので、
            よって、ここに、国連総会は、
            社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、加盟国の管轄下にある地域の人民の間にも、これらの権利と自由との尊重を指導及び教育によって促進すること並びにそれらの普遍的措置によって確保することに努力するように、すべての人民とすべての国とが達成すべき共通の基準として、この人権宣言を公布する。
          </div>
          <div className="text-20 leading-20+4*2">
            人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、
            人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、
            人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、
            諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、
            加盟国は、国際連合と協力して、人権及び基本的自由の普遍的な尊重及び遵守の促進を達成することを誓約したので、
            これらの権利及び自由に対する共通の理解は、この誓約を完全にするためにもっとも重要であるので、
            よって、ここに、国連総会は、
            社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、加盟国の管轄下にある地域の人民の間にも、これらの権利と自由との尊重を指導及び教育によって促進すること並びにそれらの普遍的措置によって確保することに努力するように、すべての人民とすべての国とが達成すべき共通の基準として、この人権宣言を公布する。
          </div>
          <div className="text-20 leading-20+4*2">
            人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、
            人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、
            人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、
            諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、
            加盟国は、国際連合と協力して、人権及び基本的自由の普遍的な尊重及び遵守の促進を達成することを誓約したので、
            これらの権利及び自由に対する共通の理解は、この誓約を完全にするためにもっとも重要であるので、
            よって、ここに、国連総会は、
            社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、加盟国の管轄下にある地域の人民の間にも、これらの権利と自由との尊重を指導及び教育によって促進すること並びにそれらの普遍的措置によって確保することに努力するように、すべての人民とすべての国とが達成すべき共通の基準として、この人権宣言を公布する。
          </div>
        </div>
      </Layout>
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="[--footer-height:72px] [--header-height:80px] [--navigation-rail-width:96px]">
      <div className="pt-[calc(var(--header-height))] compact:pb-[var(--footer-height)] medium:pb-[var(--footer-height)] expanded:pl-[var(--navigation-rail-width)] large:pl-[var(--navigation-rail-width)]">
        <div className="m-auto box-border max-w-[1284px] p-16">
          <div>{children}</div>

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

      <div className="fixed left-0 top-0 grid h-[var(--header-height)] w-[var(--navigation-rail-width)] place-content-center font-emoji text-32 leading-32+4*2 text-brand">
        🫘
      </div>
      <div className="fixed right-0 top-0 grid h-[var(--header-height)] place-content-center pr-16">
        <a
          href={rpcClient.api.login.google.$url().toString()}
          className="inline-grid h-40 place-content-center rounded-full bg-brand px-16 text-14 font-bold"
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

function Icon({
  name,
  size,
}: {
  name: string;
  size: number;
  children?: string;
}) {
  return (
    <span
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" ${size}`,
        fontSize: size,
        width: size,
        height: size,
      }}
    >
      {name}
    </span>
  );
}
