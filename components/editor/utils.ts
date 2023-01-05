import { Editor } from "@tiptap/react";

export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};

export const validateUrl = (link: string) => {
  if (!link.trim()) return "";

  let finalUrl;
  try {
    finalUrl = new URL(link);
  } catch (error) {
    finalUrl = new URL("http://" + link);
  }

  return finalUrl.origin;
};
