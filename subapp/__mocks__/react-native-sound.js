const Sound = jest.fn(() => ({
  play: jest.fn(),
  stop: jest.fn(),
  release: jest.fn(),
}));

Sound.setCategory = jest.fn();

export default Sound;
