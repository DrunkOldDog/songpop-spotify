export const getPlaylistIdFromInput = (textInput: string) => {
  const regex = /playlist\/(\w+)/;
  const regexResult = regex.exec(textInput)?.[1];
  return regexResult ?? "";
};
