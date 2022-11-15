export const truncate = (string, len = 205) => {
  if (string.length > len) {
    return string.substring(0, len) + "...";
  }

  return string;
};
