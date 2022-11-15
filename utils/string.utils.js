export const truncate = (string) => {
  if (string.length > 205) {
    return string.substring(0, 205) + "...";
  }

  return string;
};
