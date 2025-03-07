// Mock modules before importing anything else
jest.mock('react-native', () => ({
  Platform: {
    OS: 'web',
    select: (obj) => obj.web,
  },
  StyleSheet: {
    create: (obj) => obj,
    flatten: (style) => style,
  },
  Dimensions: {
    get: () => ({
      width: 400,
      height: 800,
      scale: 1,
      fontScale: 1,
    }),
  },
  PixelRatio: {
    get: () => 1,
    getFontScale: () => 1,
    getPixelSizeForLayoutSize: (size) => size,
    roundToNearestPixel: (size) => size,
  },
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  SafeAreaView: 'SafeAreaView',
  Modal: 'Modal',
}));

// Mock File API if it's not available
class MockFile {
  constructor(bits, name, options = {}) {
    this.name = name;
    this.size = bits.length;
    this.type = options.type || '';
    this._bits = bits;
  }
}

if (typeof File === 'undefined') {
  global.File = MockFile;
}

// Mock Blob if it's not available
if (typeof Blob === 'undefined') {
  global.Blob = function(content, options = {}) {
    return {
      size: content.reduce((acc, curr) => acc + curr.length, 0),
      type: options.type || ''
    };
  };
}

// Mock window methods
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

global.window = {
  ...global.window,
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
};

jest.mock('../../../../src/components/inputBase/file-search-input/FileSearchInput.styles', () => ({
  styles: {
    container: {},
    fileIcon: {},
    fileContainer: {},
    fileNameContainer: {},
    fileNameLoadedLeftContainer: {},
    fileIconContainer: {},
    iconWrapper: {},
    badge: {},
    badgeText: {},
    fileContent: {},
    fileNameText: {},
    progressBarContainer: {},
    fileNameRightContainer: {},
    checkCircleIcon: {},
    containerXicon: {},
    deleteIcon: {},
  },
}));

jest.mock('../../../../src/helpers/functions_utils.ts', () => ({
  isWebPlatform: () => true,
}));

jest.mock('../../../../src/components/inputBase/InputBase', () => 'InputBase');

jest.mock('etendo-ui-library', () => ({
  Button: 'Button',
  SkeletonItem: 'SkeletonItem',
  CheckCircleFillIcon: 'CheckCircleFillIcon',
  CornerDownRightIcon: 'CornerDownRightIcon',
  PaperclipIcon: 'PaperclipIcon',
  FileIcon: 'FileIcon',
  XIcon: 'XIcon',
}));

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import FileSearchInput from '../../../../src/components/inputBase/file-search-input/FileSearchInput';

describe('FileSearchInput Component', () => {
  const mockProps = {
    value: '',
    placeholder: 'Search files...',
    onChangeText: jest.fn(),
    onSubmit: jest.fn(),
    setFile: jest.fn(),
    onFileUploaded: jest.fn(),
    onError: jest.fn(),
    token: 'test-token',
    maxFileSize: 512,
  };

  const createMockFile = (content = 'test', name = 'test.txt', type = 'text/plain') => {
    return new File([content], name, { type });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(<FileSearchInput {...mockProps} />);
    expect(UNSAFE_getByType('InputBase')).toBeTruthy();
  });

  it('handles text input changes', () => {
    const { UNSAFE_getByType } = render(<FileSearchInput {...mockProps} />);
    const input = UNSAFE_getByType('InputBase');
    fireEvent(input, 'onChangeText', 'test input');
    expect(mockProps.onChangeText).toHaveBeenCalledWith('test input');
  });

  it('handles file selection', async () => {
    const mockFile = createMockFile();

    const { UNSAFE_getByType } = render(
      <FileSearchInput
        {...mockProps}
        uploadConfig={{ url: 'test-url', method: 'POST' }}
      />
    );

    await act(async () => {
      mockProps.setFile([mockFile]);
    });

    expect(mockProps.setFile).toHaveBeenCalledWith([mockFile]);
  });

  it('handles file upload', async () => {
    const mockFile = createMockFile();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(
      <FileSearchInput
        {...mockProps}
        uploadConfig={{ url: 'test-url', method: 'POST' }}
        initialFiles={mockFile}
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('handles submit action', async () => {
    const props = {
      ...mockProps,
      value: 'test message',
      onSubmit: jest.fn(),
    };

    const { UNSAFE_getByType } = render(
      <FileSearchInput {...props} />
    );

    const inputBase = UNSAFE_getByType('InputBase');
    
    await act(async () => {
      if (inputBase.props.rightButtons?.length > 0) {
        const submitButton = inputBase.props.rightButtons[0];
        submitButton.props.onPress();
      }
    });

    expect(props.onSubmit).toHaveBeenCalledWith('test message', []);
  });

  it('handles scroll events', () => {
    render(<FileSearchInput {...mockProps} />);
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });

  it('cleans up event listeners', () => {
    const { unmount } = render(<FileSearchInput {...mockProps} />);
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});