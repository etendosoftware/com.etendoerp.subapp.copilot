module.exports = {
  Camera: jest.fn().mockReturnValue(null),
  useCameraDevices: jest.fn(() => ({
    back: { id: 'back', name: 'Back Camera', devices: [] },
    front: { id: 'front', name: 'Front Camera', devices: [] },
  })),
  useFrameProcessor: jest.fn(),
  PermissionStatus: {
    AUTHORIZED: 'authorized',
    NOT_DETERMINED: 'not-determined',
    DENIED: 'denied',
  },
  requestCameraPermission: jest.fn(() => Promise.resolve('authorized')),
  getCameraPermissionStatus: jest.fn(() => Promise.resolve('authorized')),
};
