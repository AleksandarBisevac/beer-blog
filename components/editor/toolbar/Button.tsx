import React, { FC, MouseEventHandler, ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}): JSX.Element => {
  //
  const commonClasses =
    "p-1 rounded text-lg hover:scale-110 hover:shadow-md transition";

  const activeStyle = useMemo((): string => {
    if (active) return "bg-primaryBg text-onPrimaryBg";
    return "bg-secondaryBg text-neutral";
  }, [active]);

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={[commonClasses, activeStyle].join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
