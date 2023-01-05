import { FC, useEffect, useState } from "react";
import { validateUrl } from "../../utils";

export type linkOption = {
  url: string;
  openInNewTab: boolean;
};

interface Props {
  visible: boolean;
  onSubmit(link: linkOption): void;
  initialState?: linkOption;
}

const LinkForm: FC<Props> = ({
  visible,
  onSubmit,
  initialState,
}): JSX.Element | null => {
  const [link, setLink] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const handleApply = () => {
    if (!link.trim()) return;

    onSubmit({ url: validateUrl(link), openInNewTab });
    resetForm();
  };

  const resetForm = () => {
    setLink("");
    setOpenInNewTab(false);
  };

  useEffect(() => {
    if (initialState) {
      setLink(initialState.url);
      if (initialState.openInNewTab) {
        setOpenInNewTab(initialState.openInNewTab);
      }
    }
  }, [initialState]);

  if (!visible) return null;
  return (
    <div className="rounded p-2 shadow-md">
      <input
        value={link}
        onChange={(e) => setLink(e.currentTarget.value)}
        autoFocus
        type="text"
        className="bg-transparent rounded border-2 border-onNeutral focus:bg-primaryBg focus:text-onPrimaryBg focus:border-onNeutral transition p-2"
        placeholder="https://example.com"
      />
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={openInNewTab}
          onChange={(e) => setOpenInNewTab(e.currentTarget.checked)}
        />
        <label htmlFor="open-in-new-tab" className="text-sm">
          open in new tab
        </label>
        <div className="flex-1 text-right">
          <button
            onClick={handleApply}
            className="bg-primaryBg px-2 py-1 rounded text-sm text-onPrimaryBg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
