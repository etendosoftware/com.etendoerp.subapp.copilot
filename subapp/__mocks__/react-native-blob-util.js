const ReactNativeBlobUtil = {
  fs: {
    dirs: {
      DocumentDir: '',
      CacheDir: '',
    },
  },
  config: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve({ data: 'mocked data' })),
  })),
  session: jest.fn(),
  fetch: jest.fn(),
  wrap: jest.fn(),
  readStream: jest.fn(),
  writeStream: jest.fn(),
};

module.exports = ReactNativeBlobUtil;
