import { PixelRatio, Dimensions } from 'react-native';
import { formatTimeNewDate, getMessageType, isTabletDevice, formatTime, scrollToEnd } from '../../src/utils/functions';

describe('isTabletDevice', () => {
  beforeEach(() => {
    // Restauramos los mocks después de cada test
    jest.resetAllMocks();
  });

  it('should return true when pixel density is less than 1.6 and adjusted width is >= 1000', () => {
    jest.spyOn(PixelRatio, 'get').mockReturnValue(1.5);
    jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 700, height: 500 });
    
    const result = isTabletDevice();
    expect(result).toBe(true);
  });

  it('should return true when pixel density is 2 and adjusted dimensions >= 1920', () => {
    jest.spyOn(PixelRatio, 'get').mockReturnValue(2);
    jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 1000, height: 800 });
    
    const result = isTabletDevice();
    expect(result).toBe(true);
  });

  it('should return false when pixel density is greater than 1.6', () => {
    jest.spyOn(PixelRatio, 'get').mockReturnValue(1.7);
    jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 500, height: 400 });
    
    const result = isTabletDevice();
    expect(result).toBe(false);
  });
});

describe('formatTime', () => {
  it('should format time string with single digit hours and minutes', () => {
    const dateString = '2023-01-01T09:05:00';
    const result = formatTime(dateString);
    expect(result).toBe('09:05');
  });

  it('should format time string with double digit hours and minutes', () => {
    const dateString = '2023-01-01T23:45:00';
    const result = formatTime(dateString);
    expect(result).toBe('23:45');
  });

  it('should handle invalid date string', () => {
    const result = formatTime('invalid-date');
    expect(result).toBe('NaN:NaN');
  });

  it('should handle midnight time', () => {
    const dateString = '2023-01-01T00:00:00';
    const result = formatTime(dateString);
    expect(result).toBe('00:00');
  });
});

describe('formatTimeNewDate', () => {
  it('should pad single digit hours with zero', () => {
    const date = new Date(2023, 0, 1, 9, 30);
    const result = formatTimeNewDate(date);
    expect(result).toBe('09:30');
  });

  it('should pad single digit minutes with zero', () => {
    const date = new Date(2023, 0, 1, 14, 5);
    const result = formatTimeNewDate(date);
    expect(result).toBe('14:05');
  });

  it('should handle midnight', () => {
    const date = new Date(2023, 0, 1, 0, 0);
    const result = formatTimeNewDate(date);
    expect(result).toBe('00:00');
  });
});

describe('getMessageType', () => {
  it('should return right-user type when sender is user', () => {
    const result = getMessageType('user');
    expect(result).toBe('right-user');
  });

  it('should return error type when sender is error', () => {
    const result = getMessageType('error');
    expect(result).toBe('error');
  });

  it('should return left-user type for any other sender value', () => {
    const values = ['assistant', 'system', '', null, undefined];
    values.forEach(value => {
      const result = getMessageType(value as string);
      expect(result).toBe('left-user');
    });
  });
});

describe('scrollToEnd', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should call scrollToEnd with animation', () => {
    const mockScrollToEnd = jest.fn();
    const mockRef = {
      current: {
        scrollToEnd: mockScrollToEnd
      }
    };

    scrollToEnd(mockRef as any);
    jest.advanceTimersByTime(100);

    expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
    expect(mockScrollToEnd).toHaveBeenCalledTimes(1);
  });

  it('should handle null ScrollView ref', () => {
    const mockRef = { current: null };

    expect(() => {
      scrollToEnd(mockRef as any);
      jest.advanceTimersByTime(100);
    }).not.toThrow();
  });

  it('should handle undefined ScrollView ref', () => {
    const mockRef = { current: undefined };

    expect(() => {
      scrollToEnd(mockRef as any);
      jest.advanceTimersByTime(100);
    }).not.toThrow();
  });
});