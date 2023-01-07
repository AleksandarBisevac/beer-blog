import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
//components
import EditorToolBar from "./toolbar";
import EditLink from "./toolbar/link/EditLink";
import GalleryModal from "./gallery-modal";
import SEOForm, { SEOResult } from "./seo-form";
import Divider from "../common/Divider";
import ActionButton from "../common/ActionButton";
import ThumbnailSelector from "./thumbnail-selector";
import useSticky from "../../core/hooks/useSticky";

export interface FinalPost extends SEOResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
  onSubmit,
  initialValue,
  btnTitle = "Submit",
  busy = false,
}): JSX.Element => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [SEOInitialValue, setSEOInitialValue] = useState<SEOResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });

  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
  };

  const handleUploadImage = async (image: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/image", formData);
      setUploading(false);
      setImages([data, ...images]);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setPost({ ...post, title: target.value });

  const updateSEOData = (seoData: SEOResult) =>
    setPost({ ...post, ...seoData });

  const updateThumbnail = (thumbnail: File | string) => {
    setPost({ ...post, thumbnail });
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Type something...",
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      //handling selection edit
      handleClick(view, position, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(position),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none bg-neutralBg text-onNeutral max-w-full mx-auto h-full",
      },
    },
  });

  useSticky(toolbarRef);

  useEffect(() => {
    if (editor && selectionRange)
      editor.commands.setTextSelection(selectionRange);
  }, [editor, selectionRange]);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      setSEOInitialValue({
        meta: initialValue?.meta,
        slug: initialValue.slug,
        tags: initialValue.tags,
      });
      editor?.commands.setContent(initialValue.content);
    }
  }, [initialValue, editor]);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className="p-3 bg-neutralBg text-onNeutral transition">
        {/* Thumbnail Selector and Submit Button */}
        <div className="flex items-center justify-between mb-3">
          <ThumbnailSelector
            onChange={updateThumbnail}
            initialValue={post.thumbnail as string}
          />

          <ActionButton
            title={btnTitle}
            onClick={handleSubmit}
            busy={busy}
            disabled={busy}
          />
        </div>
        {/* Title input */}
        <input
          type="text"
          className="py-2 w-full border-0 border-b-[1px] border-onNeutral text-3xl font-semibold italic text-onNeutral mb-3 outline-none"
          placeholder="Title..."
          value={post.title}
          onChange={updateTitle}
        />
        <SEOForm
          title={post.title}
          onChange={updateSEOData}
          initialValue={SEOInitialValue}
        />
        <Divider size="sm" />
        <div ref={toolbarRef} className="h-8 z-50 bg-neutral">
          <EditorToolBar
            editor={editor}
            onOpenImageClick={() => {
              setShowGallery(true);
            }}
          />
        </div>
        <Divider size="sm" />
        {editor && <EditLink editor={editor} />}
        <div className="pt-5">
          <EditorContent editor={editor} />
        </div>
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        editor={editor}
        onFileSelect={handleUploadImage}
        images={images}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
