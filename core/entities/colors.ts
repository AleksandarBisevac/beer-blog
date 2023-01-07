export type ColorName =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export type CustomColorName =
  | "primary"
  | "primaryBg"
  | "onPrimaryBg"
  | "neutral"
  | "onNeutralBg"
  | "secondary"
  | "white"
  | "black";

export type ColorValue =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type BgColor<
  C extends ColorName,
  D extends CustomColorName,
  V extends ColorValue
> = `bg-${C}-${V}` | `bg-${D}`;

export type BgColorProps = {
  bgColor: BgColor<ColorName, CustomColorName, ColorValue>;
};

export type TextColor<
  C extends ColorName,
  D extends CustomColorName,
  V extends ColorValue
> = `text-${C}-${V}` | `text-${D}`;
