import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

interface Props {
  id: string;
  name?: string;
  label?: string;
  inputClasses?: string;
  placeholder?: string;
  type?: string;
  value: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SEOInput: FC<Props> = ({
  id,
  name,
  label,
  inputClasses,
  placeholder,
  type = "text",
  value,
  onChange,
}): JSX.Element => {
  return (
    <label htmlFor="input-slug" className="relative block">
      {label && (
        <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-onNeutral pl-2">
          {label + ":"}
        </span>
      )}
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        id={id}
        className={[label && "pl-12", inputClasses ? inputClasses : ""].join(
          " "
        )}
        onChange={onChange}
      />
    </label>
  );
};

export default SEOInput;
