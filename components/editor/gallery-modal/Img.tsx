import Image from "next/image";
import { FC } from "react";
import CheckMark from "../../common/CheckMark";

interface Props {
  src: string;
  alt?: string;
  selected?: boolean;
  onClick?(): void;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  className?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
}

const Img: FC<Props> = ({
  src,
  selected,
  onClick,
  alt,
  aspectRatio = "auto",
  objectFit = "contain",
  className,
  width = 200,
  height = 200,
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative rounded overflow-hidden cursor-pointer"
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt || "gallery"}
        style={{ objectFit, aspectRatio }}
        className={[
          "bg-primaryBg hover:scale-110 transition",
          className && className,
        ].join(" ")}
        loading="lazy"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Img;
