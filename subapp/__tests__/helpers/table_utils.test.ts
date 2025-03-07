import { 
  isOdd, 
  paintOddRows, 
  isTablet, 
  disableOutline, 
  cursorPointer, 
  findPrimaryId
} from "../../src/helpers/table_utils";
import { Platform, PixelRatio, Dimensions } from 'react-native';
import { NEUTRAL_0, QUATERNARY_10 } from '../../src/styles/colors';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'web',
    select: jest.fn()
  },
  PixelRatio: {
    get: jest.fn()
  },
  Dimensions: {
    get: jest.fn(() => ({
      width: 800,
      height: 600
    }))
  }
}));

describe('isOdd function', () => {
  it('should return true for odd numbers', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(5)).toBe(true);
  });

  it('should return false for even numbers', () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(4)).toBe(false);
  });
});

describe('paintOddRows function', () => {
  it('should return QUATERNARY_10 background for odd indices', () => {
    const result = paintOddRows(1);
    expect(result).toEqual({ backgroundColor: QUATERNARY_10 });
  });

  it('should return NEUTRAL_0 background for even indices', () => {
    const result = paintOddRows(2);
    expect(result).toEqual({ backgroundColor: NEUTRAL_0 });
  });
});

describe('isTablet function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  it('should return false when pixel density is 2 but dimensions are small', () => {
    (PixelRatio.get as jest.Mock).mockReturnValue(2);
    
    (Dimensions.get as jest.Mock).mockReturnValue({
      width: 200,
      height: 300
    });
    
    const result = isTablet();
    expect(result).toBe(false);
  });
});

describe('disableOutline function', () => {
  beforeAll(() => {
    Platform.OS = 'web';
  });

  it('should return outline style object when platform is web', () => {
    Platform.OS = 'web';
    const result = disableOutline();
    expect(result).toEqual({ outline: 'none' });
  });


});

describe('cursorPointer function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return cursor style object when platform is web', () => {
    Platform.OS = 'web';
    const result = cursorPointer();
    expect(result).toEqual({ cursor: 'pointer' });
  });

});

describe('findPrimaryId additional tests', () => {
  it('should return empty string when no primary column is found', () => {
    const columns = [
      { primary: false, key: 'id1' },
      { primary: false, key: 'id2' }
    ];
    const data = { id1: '100', id2: '200' };
    const result = findPrimaryId(columns, data);
    expect(result).toBe('');
  });

  it('should return empty string when primary column has no key property', () => {
    const columns = [
      { primary: true },
      { primary: false, key: 'id2' }
    ];
    const data = { id1: '100', id2: '200' };
    const result = findPrimaryId(columns, data);
    expect(result).toBe('');
  });

  it('should handle undefined data values', () => {
    const columns = [
      { primary: true, key: 'id1' },
    ];
    const data = { id1: undefined };
    const result = findPrimaryId(columns, data);
    expect(result).toBe(undefined);
  });
});