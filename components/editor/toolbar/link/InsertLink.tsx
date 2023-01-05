import { FC, useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Button";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  editor: Editor;
}

const InsertLink: FC<Props> = ({ editor }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const { commands } = editor;

  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return hideForm();

    if (link?.openInNewTab)
      commands.setLink({ href: link.url, target: "_blank" });
    else commands.setLink({ href: link.url });

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
        <BsLink45Deg size={22} />
      </Button>
      <div className="absolute top-full right-0 mt-4 z-[99]">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
