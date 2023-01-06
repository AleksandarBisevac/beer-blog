type Config = {
  [key: string]: (value: any) => any;
};

const generateFormData = (obj: Object, config: Config) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (config[key] && value.trim()) {
      formData.append(key, config[key](value));
    } else formData.append(key, value);
  }

  return formData;
};

export default generateFormData;
