import { FC } from "react";
import { Editor } from "@tiptap/react";
import { TextBlockSelect } from "./TextBlockSelect";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  BsTypeBold,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsImageFill,
} from "react-icons/bs";
import Button from "./Button";
import { getFocusedEditor } from "../utils";
import InsertLink from "./link/InsertLink";
import EmbedYoutube from "./youtube/EmbedYoutube";

interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

const EditorToolBar: FC<Props> = ({
  editor,
  onOpenImageClick,
}): JSX.Element | null => {
  if (!editor) return null;

  return (
    <div className="flex items-center">
      <TextBlockSelect editor={editor} />
      <div className="h-6 w-[1px] bg-secondaryBg mx-8" />
      {/* button for */}
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold size={22} />
        </Button>

        <Button
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic size={22} />
        </Button>

        <Button
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline size={22} />
        </Button>

        <Button
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough size={22} />
        </Button>
      </div>

      <div className="h-6 w-[1px] bg-secondaryBg mx-8" />

      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL size={22} />
        </Button>

        <Button
          active={editor.isActive("code")}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode size={22} />
        </Button>

        <Button
          active={editor.isActive("codeblock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces size={22} />
        </Button>

        <InsertLink editor={editor} />

        <Button
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl size={22} />
        </Button>
        <Button
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl size={22} />
        </Button>
      </div>
      <div className="h-6 w-[1px] bg-secondaryBg mx-8" />
      <div className="flex items-center space-x-3">
        <Button>
          <BsImageFill size={22} onClick={onOpenImageClick} />
        </Button>
        <EmbedYoutube editor={editor} />
      </div>
    </div>
  );
};

export default EditorToolBar;
