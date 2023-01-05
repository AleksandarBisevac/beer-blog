import React, { FC } from "react";

export type DropdownOption = {
  label: string;
  value: any;
  onClick(label: string, value: any): void;
};

interface Props {
  options: DropdownOption[];
  head: React.ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = React.useState(false);
  return (
    <button
      className="relative"
      onMouseDown={() => {
        setShowOptions(!showOptions);
      }}
      onBlur={() => setShowOptions(false)}
    >
      {head}
      {showOptions ? (
        <div className="min-w-max absolute top-full mt-4 right-2 y-10 border-2 border-onNeutral rounded text-left bg-primaryBg z-[99]">
          <ul className="p-3 space-y-3">
            {options.map(({ label, value, onClick }, idx) => {
              return (
                <li onMouseDown={() => onClick(label, value)} key={label + idx}>
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </button>
  );
};

export default DropdownOptions;
