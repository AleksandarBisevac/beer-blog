import { ChangeEventHandler, FC, useEffect, useState } from "react";
import Img from "../gallery-modal/Img";
import PosterUI from "./PosterUI";

interface Props {
  initialValue?: string;
  onChange(file: File): void;
}

const ThumbnailSelector: FC<Props> = ({
  initialValue,
  onChange,
}): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));
    onChange(file);
  };

  useEffect(() => {
    if (initialValue && typeof initialValue === "string")
      setSelectedThumbnail(initialValue);
  }, [initialValue]);

  return (
    <div className="w-32">
      <input
        type="file"
        hidden
        accept="image/jpg, image/jpeg, image/png"
        id="thumbnail-selector"
        onChange={handleChange}
      />
      <label htmlFor="thumbnail-selector">
        {selectedThumbnail ? (
          <div className="border border-dashed border-onNeutral rounded">
            <Img
              src={selectedThumbnail}
              alt="selected image"
              aspectRatio="16/9"
              objectFit="contain"
              width={150}
              height={150}
            />
          </div>
        ) : (
          <PosterUI label="Thumbnail" />
        )}
      </label>
    </div>
  );
};

export default ThumbnailSelector;
