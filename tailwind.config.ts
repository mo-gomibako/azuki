import type { Config } from "tailwindcss";
import { dark } from "@charcoal-ui/theme";

const px = (v: number) => `${v}px` as const;

const fontSize = (size: keyof typeof dark.typography.size) =>
  px(dark.typography.size[size].fontSize);

const lineHeight = (size: keyof typeof dark.typography.size) =>
  px(dark.typography.size[size].lineHeight);

const borderRadius = (size: keyof typeof dark.borderRadius) =>
  px(dark.borderRadius[size]);

const spacing = (size: keyof typeof dark.spacing) => px(dark.spacing[size]);

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: dark.color,
    spacing: {
      0: spacing(0),
      4: spacing(4),
      8: spacing(8),
      16: spacing(16),
      24: spacing(24),
      40: spacing(40),
      64: spacing(64),
      104: spacing(104),
      168: spacing(168),
      272: spacing(272),
      440: spacing(440),
    },
    fontSize: {
      10: px(10),
      12: fontSize(12),
      14: fontSize(14),
      16: fontSize(16),
      20: fontSize(20),
      32: fontSize(32),
    },
    lineHeight: {
      /** font size + half leading * 2 */
      "10+4*2": px(10 + 4 * 2),
      "12+4*2": lineHeight(12),
      "14+4*2": lineHeight(14),
      "16+4*2": lineHeight(16),
      "20+4*2": lineHeight(20),
      "32+4*2": lineHeight(32),
    },
    borderRadius: {
      0: borderRadius("none"),
      4: borderRadius(4),
      8: borderRadius(8),
      16: borderRadius(16),
      24: borderRadius(24),
      full: borderRadius("oval"),
    },
    screens: {
      compact: { max: "599px" },
      medium: { min: "600px", max: "839px" },
      expanded: { min: "840px", max: "1199px" },
      large: { min: "1200px" },
    },
    dropShadow: {
      4: `0px 0px 4px ${dark.color.background1}`,
    },
    extend: {
      fontFamily: {
        emoji: ["Noto Emoji"],
        noto: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
