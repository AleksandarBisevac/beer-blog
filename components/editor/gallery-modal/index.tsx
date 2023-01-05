import Image from "next/image";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ActionButton from "../../common/ActionButton";
import ModalContainer, {
  ModalContainerProps,
} from "../../common/ModalContainer";
import Gallery from "./Gallery";
import { getFocusedEditor } from "../utils";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalContainerProps {
  onFileSelect(image: File): void;
  images: { src: string }[];
  editor: Editor | null;
  uploading?: boolean;
}

const GalleryModal: FC<Props> = ({
  visible,
  onClose,
  onFileSelect,
  images,
  editor,
  uploading,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage || !editor) return handleClose();

    //handle image selection
    getFocusedEditor(editor)
      .setImage({ src: selectedImage, alt: altText })
      .run();

    handleClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-onNeutral text-neutral">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] max-h-[50vh] overflow-y-auto custom-scroll-bar">
            <Gallery
              images={images}
              onSelect={(src) => setSelectedImage(src)}
              selectedImage={selectedImage}
              uploading={uploading}
            />
          </div>
          {/* image selection and upload */}

          <div className="basis-1/4 px-2 space-y-4">
            <div>
              <input
                onChange={handleOnImageChange}
                hidden
                type="file"
                id="image-input"
                accept="image/png, image/jpeg, image/jpg"
                multiple={false}
              />
              <label htmlFor="image-input">
                <div className="w-full border-2 border-primaryBg text-onNeutral flex items-center justify-center space-x-2 cursor-pointer py-1 rounded hover:scale-[0.97]">
                  <AiOutlineCloudUpload size={20} className="text-primaryBg" />
                  <span className="text-primaryBg px-2">Upload Image</span>
                </div>
              </label>
            </div>
            {selectedImage && (
              <>
                <textarea
                  value={altText}
                  onChange={({ target }) => {
                    setAltText(target.value);
                  }}
                  placeholder="Alt text..."
                  className="resize-none w-full bg-transparent rounded border-2 border-neutral focus:bg-primaryBg focus:ring-1 transition p-2 text-onPrimaryBg h-32 "
                ></textarea>
                <ActionButton title="Select" onClick={handleSelection} />
                <div className="relative aspect-video bg-png-pattern">
                  <Image
                    src={selectedImage}
                    fill={true}
                    alt="selected-img"
                    style={{ aspectRatio: "1/1", objectFit: "contain" }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
