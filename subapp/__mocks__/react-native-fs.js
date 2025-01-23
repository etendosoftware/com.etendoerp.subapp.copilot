export default {
  DocumentDirectoryPath: '/mocked/path',
  writeFile: jest.fn().mockResolvedValue(null),
  readFile: jest.fn().mockResolvedValue(null),
  unlink: jest.fn().mockResolvedValue(null),
  exists: jest.fn().mockResolvedValue(true),
  mkdir: jest.fn().mockResolvedValue(null),
};
