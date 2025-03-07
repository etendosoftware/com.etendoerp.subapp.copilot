module.exports = {
  types: {
    allFiles: 'public.item',
    images: 'public.image',
    plainText: 'public.plain-text',
  },
  pick: jest.fn(() => Promise.resolve([{ uri: 'mocked-uri', name: 'mocked-file.txt', type: 'text/plain' }])),
  pickMultiple: jest.fn(() => Promise.resolve([{ uri: 'mocked-uri', name: 'mocked-file.txt', type: 'text/plain' }])),
  pickDirectory: jest.fn(() => Promise.resolve({ uri: 'mocked-directory-uri' })),
  releaseSecureAccess: jest.fn(),
  isCancel: jest.fn(() => false),
};
