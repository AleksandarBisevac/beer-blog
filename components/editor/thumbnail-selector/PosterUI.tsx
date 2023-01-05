import { FC } from "react";

interface Props {
  label: string;
  className?: string;
}

const commonClasses =
  "border border-dashed border-onNeutral flex items-center justify-center rounded cursor-pointer aspect-video object-cover";

const PosterUI: FC<Props> = ({ label, className }): JSX.Element => {
  return (
    <div className={[commonClasses, className && className].join(" ")}>
      <span>{label}</span>
    </div>
  );
};

export default PosterUI;
