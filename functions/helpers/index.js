export const truncateText = (text, maxLength) => {
  return text.length < maxLength ? text : text.slice(0, maxLength).concat("...");
};
