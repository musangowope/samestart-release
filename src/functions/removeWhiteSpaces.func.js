export const removeWhiteSpaces = (str) => str.replace(/\s/g, '');

export const removeSpaceAfterLastWord = (str) =>
  str.replace(/\s+$/, '');
