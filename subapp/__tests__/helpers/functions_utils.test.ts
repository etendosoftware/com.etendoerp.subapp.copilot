import { isWebPlatform } from "../../src/helpers/functions_utils";

const mockPlatform = {
  OS: 'web'
};

jest.mock('react-native', () => ({
  Platform: mockPlatform
}));

describe('isWebPlatform tests', () => {
  beforeEach(() => {
    mockPlatform.OS = 'web';
  });

  it('should return false when Platform.OS is undefined', () => {
    (mockPlatform.OS as any) = undefined;
    
    const { isWebPlatform } = require('../../src/helpers/functions_utils');
    const result = isWebPlatform();
    expect(result).toBe(false);
  });

  it('should return true when Platform.OS is web', () => {
    mockPlatform.OS = 'web';
    
    const { isWebPlatform } = require('../../src/helpers/functions_utils');
    const result = isWebPlatform();
    expect(result).toBe(true);
  });
});