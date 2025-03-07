import { sizeSvg } from "../../src/helpers/svg_utils"; 


it('should return styleSize when a valid number is provided', () => {
    const styleSize = 100;
    const defaultValue = 50;

    const result = sizeSvg(styleSize, defaultValue);

    expect(result).toBe(100);
  });

  it('should return negative styleSize when negative number is provided', () => {
    const styleSize = -50;
    const defaultValue = 100;

    const result = sizeSvg(styleSize, defaultValue);

    expect(result).toBe(-50);
  });

