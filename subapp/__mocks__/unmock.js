module.exports = {
  on: jest.fn(),
  off: jest.fn(),
  reset: jest.fn(),
  init: jest.fn(() => ({
    services: jest.fn(),
    reset: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  })),
};
