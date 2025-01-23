import addImageStyle from "../../src/helpers/image_utils"; // Ensure this path is correct


it('should return empty array when no parameter is provided', () => {
    const result = addImageStyle();
    expect(result).toEqual([]);
  });

  it('should return empty array when undefined is passed', () => {
    const result = addImageStyle(undefined);
    expect(result).toEqual([]);
  });