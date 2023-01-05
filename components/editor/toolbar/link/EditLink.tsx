import { FC, useCallback, useMemo, useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import LinkForm, { linkOption } from "./LinkForm";
import { getFocusedEditor } from "../../utils";

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditFrom, setShowEditForm] = useState(false);

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes("link");
    if (href && window) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const handleSubmit = ({ url, openInNewTab }: linkOption) => {
    getFocusedEditor(editor)
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
      .run();

    setShowEditForm(false);
  };

  const initialState = useCallback((): linkOption => {
    const { href, target } = editor.getAttributes("link");
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => {
        return editor.isActive("link");
      }}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false);
        },
      }}
    >
      <LinkForm
        visible={showEditFrom}
        onSubmit={handleSubmit}
        initialState={initialState()}
      />
      {showEditFrom ? null : (
        <div className="rounded bg-neutral text-onNeutral shadow-secondaryBg shadow-md p-3 flex items-center space-x-6  z-[99]">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>
          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>
          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
