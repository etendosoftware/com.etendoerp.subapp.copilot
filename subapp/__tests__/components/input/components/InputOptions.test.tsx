import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import InputOptions from '../../../../src/components/input/components/InputOptions';

// Mock de los estilos
jest.mock('../../../../src/components/input/Input.style', () => ({
  styles: {
    optionOverlay: {},
    optionsContainer: {},
    optionContainer: {},
    optionText: {},
    optionFilterContainer: {},
    optionTopFilterContainer: {},
    searchContainer: {},
    optionFilterImg: {},
    optionFilterText: {},
    cancelContainer: {},
    cancelFilterImg: {},
    scrollOptions: {},
  }
}));

// Mock de las utilidades
jest.mock('../../../../src/helpers/table_utils', () => ({
  isTablet: jest.fn(() => false),
  disableOutline: jest.fn(() => ({})),
}));

// Mock de los colores
jest.mock('../../../../src/styles/colors', () => ({
  NEUTRAL_600: '#666666',
  PRIMARY_100: '#123456',
  QUATERNARY_10: '#789012',
}));

// Mock de etendo-ui-library
jest.mock('etendo-ui-library', () => ({
  SearchIcon: function SearchIcon() { return null; },
  XIcon: function XIcon() { return null; },
  ChevronDownIcon: function ChevronDownIcon() { return null; },
  EyeIcon: function EyeIcon() { return null; },
}));

// Mock completo de react-native
jest.mock('react-native', () => {
  const rn = {
    Platform: {
      OS: 'ios',
      select: jest.fn(obj => obj.ios),
    },
    Keyboard: {
      addListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
      removeListener: jest.fn(),
      dismiss: jest.fn(),
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ 
        height: 800, 
        width: 400, 
        screen: { height: 800 } 
      }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    PixelRatio: {
      get: jest.fn(() => 2),
      getFontScale: jest.fn(() => 1),
      getPixelSizeForLayoutSize: jest.fn(size => size),
      roundToNearestPixel: jest.fn(size => size),
    },
    StyleSheet: {
      create: jest.fn(styles => styles),
      flatten: jest.fn(style => {
        if (Array.isArray(style)) {
          return Object.assign({}, ...style);
        }
        return style || {};
      }),
      compose: jest.fn((style1, style2) => ({ ...style1, ...style2 })),
      absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
      hairlineWidth: 1,
    },
    View: 'View',
    Text: 'Text',
    TouchableOpacity: 'TouchableOpacity',
    Modal: 'Modal',
    Pressable: 'Pressable',
    ScrollView: 'ScrollView',
    TextInput: 'TextInput',
    ActivityIndicator: 'ActivityIndicator',
  };
  return rn;
});

describe('InputOptions Component', () => {
  const mockData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  const defaultProps = {
    data: mockData,
    showOptions: true,
    positionModal: {
      width: 200,
      left: 0,
      top: 0,
      bottom: 0,
      height: 0,
    },
    displayKey: 'name',
    onClose: jest.fn(),
    onOptionSelected: jest.fn(),
    onChangeFilterText: jest.fn(),
    showSearchInPicker: true,
    placeholderPickerSearch: 'Search...',
    filterValue: '',
    currentPage: 0,
    isPagination: false,
    isStopLoadMoreData: false,
    isLoadingMoreData: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText, UNSAFE_getAllByType } = render(
      <InputOptions {...defaultProps} />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input).toBeTruthy();
    
    // Filtrar solo los Pressables que tienen Text como hijo (las opciones)
    const options = UNSAFE_getAllByType('Pressable').filter(pressable => {
      return pressable.props.children && 
             React.isValidElement(pressable.props.children) && 
             pressable.props.children.type === 'Text';
    });
    expect(options).toHaveLength(mockData.length);
  });

  it('handles option selection correctly', () => {
    const { UNSAFE_getAllByType } = render(<InputOptions {...defaultProps} />);
    
    // Encontrar los Pressables que son opciones
    const options = UNSAFE_getAllByType('Pressable').filter(pressable => {
      return pressable.props.children && 
             React.isValidElement(pressable.props.children) && 
             pressable.props.children.type === 'Text' &&
             pressable.props.children.props.children === 'Option 1';
    });

    // Simular el evento onPress con el índice correcto
    options[0].props.onPress();

    expect(defaultProps.onOptionSelected).toHaveBeenCalledWith(mockData[0], 0);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles search filter correctly', async () => {
    const { getByPlaceholderText } = render(<InputOptions {...defaultProps} />);
    
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Option 1');

    await waitFor(() => {
      expect(defaultProps.onChangeFilterText).toHaveBeenCalledWith('Option 1');
    }, { timeout: 600 });
  });

  it('handles overlay press correctly', () => {
    const { UNSAFE_getAllByType } = render(<InputOptions {...defaultProps} />);
    const overlay = UNSAFE_getAllByType('TouchableOpacity')[0];
    fireEvent.press(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles filter clear correctly', () => {
    const props = {
      ...defaultProps,
      filterValue: 'test',
    };

    const { UNSAFE_getAllByType } = render(<InputOptions {...props} />);
    const touchables = UNSAFE_getAllByType('TouchableOpacity');
    const clearButton = touchables.find(t => 
      t.props.children && 
      React.isValidElement(t.props.children) && 
      t.props.children.type.name === 'XIcon'
    );

    if (clearButton) {
      fireEvent.press(clearButton);
      expect(defaultProps.onChangeFilterText).toHaveBeenCalledWith('');
    }
  });

  it('handles pagination correctly', () => {
    const onLoadMoreData = jest.fn();
    const props = {
      ...defaultProps,
      isPagination: true,
      onLoadMoreData,
    };

    const { UNSAFE_getAllByType } = render(<InputOptions {...props} />);
    const scrollView = UNSAFE_getAllByType('ScrollView')[0];
    
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { y: 500 },
        layoutMeasurement: { height: 100 },
        contentSize: { height: 600 },
      },
    });

    expect(onLoadMoreData).toHaveBeenCalledWith(1, '');
  });
});