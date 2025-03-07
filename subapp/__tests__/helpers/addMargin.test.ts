import addMarginContainer from "../../src/helpers/addMargin";

it('should return object with margin 20 when Platform.OS is android', () => {
    jest.mock('react-native', () => ({
      Platform: {
        OS: 'android'
      }
    }));

    const result = addMarginContainer();

    expect(result).toEqual({margin: 20});
  });

  it('should return margin object when Platform.OS is web', () => {
    jest.mock('react-native', () => ({
      Platform: {
        OS: 'web'
      }
    }));

    const result = addMarginContainer();

    expect(result).toEqual({margin: 20});
  });