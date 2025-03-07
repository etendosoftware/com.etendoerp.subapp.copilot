module.exports = {
  open: jest.fn(() => Promise.resolve({ success: true })),
  Share: jest.fn(),
  Social: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    WHATSAPP: 'whatsapp',
  },
};
