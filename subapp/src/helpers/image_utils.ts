const addImageStyle = (disabled?: boolean | undefined) => {
  let result = [];
  if (disabled) {
    result.push({opacity: 0.5});
  }
  return result;
};

export default addImageStyle;
