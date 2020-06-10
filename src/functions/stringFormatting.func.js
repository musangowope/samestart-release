/** @format */

export function replaceUnderscoreWithSpace(str) {
  return str.replace(/_/g, ' ');
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export function snakeCaseToTitleCase(str) {
  return toTitleCase(replaceUnderscoreWithSpace(str));
}
