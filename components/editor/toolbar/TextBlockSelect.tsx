import React from "react";
import { Editor } from "@tiptap/react";
import DropdownOptions, { DropdownOption } from "../../common/DropdownOptions";
import { AiFillCaretDown } from "react-icons/ai";
import { getFocusedEditor } from "../utils";

type Props = {
  editor: Editor;
};

const getLabel = (editor: Editor): string => {
  if (editor.isActive("heading", { level: 1 })) return "Heading 1";
  if (editor.isActive("heading", { level: 2 })) return "Heading 2";
  if (editor.isActive("heading", { level: 3 })) return "Heading 3";
  return "Paragraph";
};

const Head = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center space-x-1">
      <p>{getLabel(editor)}</p>
      <AiFillCaretDown />
    </div>
  );
};

export const TextBlockSelect: React.FC<Props> = ({ editor }) => {
  const options: DropdownOption[] = [
    {
      label: "Paragraph",
      value: "paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      value: "h1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      value: "h2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      value: "h3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];
  return <DropdownOptions options={options} head={<Head editor={editor} />} />;
};
