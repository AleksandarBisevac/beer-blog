import { FC } from "react";
import { BsCardImage } from "react-icons/bs";
import Img from "./Img";

interface Props {
  images: {
    src: string;
  }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage?: string;
}

const Gallery: FC<Props> = ({
  images,
  onSelect,
  uploading = false,
  selectedImage = "",
}): JSX.Element => {
  return (
    <div className="flex flex-wrap min-w-[320px] min-h-[320px] items-start justify-start">
      {uploading && (
        <div className="basis-1/4 p-2">
          <div className="max-w-[148px] max-h-[150px] aspect-square flex flex-col items-center justify-center bg-primaryBg text-onPrimaryBg rounded animate-pulse">
            <BsCardImage size={60} />
            <p>Uploading</p>
          </div>
        </div>
      )}
      {images.map(({ src }, idx) => {
        return (
          <div key={src} className="basis-1/4 p-2">
            <Img
              src={src}
              selected={selectedImage === src}
              onClick={() => onSelect(src)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
