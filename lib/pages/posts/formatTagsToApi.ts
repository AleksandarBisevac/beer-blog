const formatTagsToApi = (value: string) => {
  const tags = value.split(" ").map((x: string) => x.trim());
  return JSON.stringify(tags);
};

export default formatTagsToApi;
