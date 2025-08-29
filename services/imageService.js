export const getProfileImage = (file) => {
    if (file && typeof file == 'string') return file;
    if (file && typeof file == 'object') return file;
}

export const getFilePath = (file) => {
  if (!file) return null;
  if (typeof file === "string") return { uri: file };
  if (typeof file === "object" && file.uri) return { uri: file.uri };
  return null;
};
