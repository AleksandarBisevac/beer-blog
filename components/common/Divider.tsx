import { FC, useCallback } from "react";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
}

const Divider: FC<Props> = ({ size }): JSX.Element => {
  const setMarginY = useCallback(() => {
    switch (size) {
      case "sm":
        return "my-3";
      case "md":
        return "my-6";
      case "lg":
        return "my-10";
      case "xl":
        return "my-16";

      default:
        return "my-3";
    }
  }, [size]);

  return <div className={"h-[1px] w-full bg-secondaryBg " + setMarginY()} />;
};

export default Divider;
