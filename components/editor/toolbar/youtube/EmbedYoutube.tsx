import { FC, useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { BsYoutube } from "react-icons/bs";
import Button from "../Button";
import { getFocusedEditor } from "../../utils";

interface Props {
  editor: Editor;
}

const EmbedYoutube: FC<Props> = ({ editor }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const { commands } = editor;

  const handleSubmit = () => {
    if (!url.trim()) return hideForm();

    getFocusedEditor(editor).setYoutubeVideo({ src: url }).run();

    setUrl("");
    hideForm();
  };

  const hideForm = useCallback(() => setVisible(false), []);
  const showForm = useCallback(() => setVisible(true), []);

  return (
    <div
      className="relative"
      onKeyDown={({ key }) => {
        if (key === "Escape") {
          hideForm();
        }
      }}
    >
      <Button
        active={editor.isActive("link")}
        onClick={visible ? hideForm : showForm}
      >
        <BsYoutube size={22} />
      </Button>
      <div className="absolute top-full right-0 mt-4 z-[99]">
        {visible && (
          <div className="flex space-x-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              autoFocus
              type="text"
              className="bg-transparent rounded border-2 border-onNeutral focus:bg-primaryBg focus:text-onPrimaryBg focus:border-onNeutral transition p-2"
              placeholder="https://youtube.com"
            />

            <button
              onClick={handleSubmit}
              className="bg-primaryBg p-2 rounded text-sm text-onPrimaryBg"
            >
              Embed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedYoutube;
