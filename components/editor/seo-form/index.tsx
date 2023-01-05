import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import Input from "../../common/Input";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import slugify from "slugify";

export interface SEOResult {
  meta: string;
  slug: string;
  tags: string;
}

interface Props {
  title?: string;
  onChange: (result: SEOResult) => void;
  initialValue?: SEOResult;
}

const commonInputClasses =
  "outline-none border-2 p-1 rounded border-secondaryBg focus:border-primaryBg transition italic w-full";

const SEOForm: FC<Props> = ({
  title = "",
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({ meta: "", slug: "", tags: "" });
  const { meta, slug, tags } = values;
  const [showForm, setShowForm] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const maxHeight = showForm ? "1000px" : "0";
    const visibility = showForm ? "visible" : "hidden";
    const transition =
      "max-height 300ms ease-in-out, visibility 300ms ease-in-out";
    if (formRef.current) {
      formRef.current.style.maxHeight = maxHeight;
      formRef.current.style.visibility = visibility;
      formRef.current.style.transition = transition;
    }
  }, [showForm]);

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) setValues({ ...initialValue });
  }, [initialValue]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-semibold text-xl">SEO Section</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? <BiCaretUp size={20} /> : <BiCaretDown size={20} />}
        </button>
      </div>

      <div
        className={`space-y-4 form-wrapper overflow-hidden mt-2`}
        ref={formRef}
      >
        <Input
          id="input-slug"
          name="slug"
          label="Slug"
          placeholder="Type slug here..."
          type="text"
          value={slug}
          onChange={handleChange}
          inputClasses={commonInputClasses}
        />
        <Input
          id="input-slug"
          name="tags"
          label="Tags"
          placeholder="tag1 tag2 tag3..."
          type="text"
          value={tags}
          onChange={handleChange}
          inputClasses={commonInputClasses}
        />
        <div className="relative">
          <textarea
            name="meta"
            className={[commonInputClasses, "resize-none pl-2 pb-2"].join(" ")}
            placeholder="Meta description..."
            onChange={handleChange}
            maxLength={150}
            value={meta}
          ></textarea>
          <p className="absolute bottom-3 text-onNeutral right-3">
            {meta.length}/150
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEOForm;
