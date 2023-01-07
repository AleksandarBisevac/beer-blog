import React, { FC, useMemo } from "react";
import { IconType } from "react-icons";
import {
  BgColor,
  ColorName,
  ColorValue,
  CustomColorName,
  TextColor,
} from "../../core/entities/colors";

interface Props<
  C extends ColorName,
  D extends CustomColorName,
  V extends ColorValue
> {
  icon?: IconType;
  bgColor?: BgColor<C, D, V>;
  textColor?: TextColor<C, D, V>;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
}

const Loading: FC<Props<ColorName, CustomColorName, ColorValue>> = ({
  icon,
  bgColor = "bg-primaryBg",
  textColor = "text-onPrimaryBg",
  size = "md",
}): JSX.Element => {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "h-[12px] w-[12px]";
      case "md":
        return "h-[16px] w-[16px]";
      case "lg":
        return "h-[20px] w-[20px]";
      case "xl":
        return "h-[24px] w-[24px]";
      case "2xl":
        return "h-[28px] w-[28px]";
      case "3xl":
        return "h-[32px] w-[32px]";
      case "4xl":
        return "h-[36px] w-[36px]";
      case "5xl":
        return "h-[40px] w-[40px]";
      case "6xl":
        return "h-[44px] w-[44px]";
      case "7xl":
        return "h-[48px] w-[48px]";

      default:
        return "h-[16px] w-[16px]";
    }
  }, [size]);

  return (
    <div className={["relative left-1/2 ", calculatedSize].join(" ")}>
      <div
        className={[
          "absolute animate-ping rounded-full opacity-75",
          bgColor ? bgColor : "bg-primaryBg",
          calculatedSize,
        ].join(" ")}
      ></div>
      <div className={["relative rounded-full", calculatedSize].join(" ")}>
        {icon &&
          React.createElement(icon, {
            className: [
              textColor ? textColor : "text-primaryBg",
              calculatedSize,
            ].join(" "),
          })}
      </div>
    </div>
  );
};

export default Loading;
