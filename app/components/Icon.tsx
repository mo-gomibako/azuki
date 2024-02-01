export default function Icon({
  name,
  size = 24,
  wght = 500,
}: {
  name: string;
  size?: number;
  wght?: 200 | 500;
}) {
  return (
    <span
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="material-symbols-outlined"
      style={{
        // NOTE: 透明なフォントにfallbackすることで、ligatureの変換前の文字列が表示されるのを防ぐ
        fontFamily: "'Material Symbols Outlined', Skeleton",
        fontVariationSettings: `"FILL" 0, "wght" ${wght}, "GRAD" 0, "opsz" ${size}`,
        fontSize: size,
        width: size,
        height: size,
      }}
    >
      {name}
    </span>
  );
}
