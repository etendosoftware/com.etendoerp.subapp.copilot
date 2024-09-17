import {
  ColorValue,
  DimensionValue,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type InputFieldType = 'textInput' | 'text';

export type InputTypeStyle =
  | 'default'
  | 'destructive'
  | 'disabled'
  | 'readOnly';

export type InputFieldVariants =
  | 'readOnly'
  | 'picker'
  | 'textInput'
  | 'textInputSearch'
  | 'textInputPassword'
  | 'pressableText'
  | 'pressableSearch'

export enum InputFieldVariant {
  ReadOnly = 'readOnly',
  Picker = 'picker',
  TextInput = 'textInput',
  TextInputSearch = 'textInputSearch',
  TextInputPassword = 'textInputPassword',
  PressableText = 'pressableText',
  PressableSearch = 'pressableSearch',
}

export type KeyboardTypes = 'text' | 'number';

export type InputFieldConfigType = {
  type: InputFieldType;
  image?: React.ReactElement;
  width?: DimensionValue;
  height?: DimensionValue;
  disabledField?: boolean;
  disabledSubmit?: boolean;
  backgroundColor?: ColorValue;
  placeholderStyle?: TextStyle;
};

export type InputVariantsType = Record<
  InputFieldVariants,
  { field: InputFieldConfigType }
>;

export type TypeInputStyleVariant = Record<
  InputTypeStyle,
  {
    fieldStyle: {
      field: ViewStyle | ViewStyle[];
      focus: ViewStyle | ViewStyle[];
      textDefault: TextStyle | TextStyle[];
      textPlaceholder: TextStyle | TextStyle[];
    };
    titleStyle: TextStyle | TextStyle[];
    helperStyle: TextStyle | TextStyle[];
  }
>;

export interface InputProps {
  titleLabel?: string;
  titleImage?: React.ReactElement;
  value: string | number | Date | undefined;
  helperText?: string;
  placeholder?: string;
  placeholderPickerSearch?: string;
  disabled?: boolean;
  isError?: boolean;
  maxLength?: number;
  centerText?: boolean;
  typeField: InputFieldVariants;
  keyboardType?: KeyboardTypes;
  fontSize?: number;
  height?: DimensionValue;
  dataPicker?: Array<Record<string, any>>;
  displayKey?: string;
  showOptionsAmount?: number;
  showSearchInPicker?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
  onSubmit?: (event?: GestureResponderEvent) => void;
  onChangeText?: (text: string) => void;
  onFocus?: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onOptionSelected?: (selectedItem: Array<Record<string, any>>) => void;
  backgroundColor?: ColorValue;
  showCalendar?: boolean;
  isLoadingMoreData?: boolean;
  onLoadMoreData?: (currentPage?: number, filterText?: string) => void;
  currentPage?: number;
  isPagination?: boolean;
  isStopLoadMoreData?: boolean;
}

export interface InputTitleProps {
  titleLabel?: string;
  titleImage?: React.ReactElement;
  styleTitle: TextStyle | TextStyle[];
  disabled?: boolean;
}

export interface InputHelperProps {
  styleHelper: TextStyle | TextStyle[];
  label?: string;
}

export interface InputFieldProps {
  disabled?: boolean;
  value?: string | number | Date | undefined | any;
  placeholder?: string;
  placeholderPickerSearch?: string;
  configField: InputFieldConfigType;
  keyboardType?: KeyboardTypes;
  styleField: {
    field: ViewStyle | ViewStyle[];
    focus: ViewStyle | ViewStyle[];
    textDefault: TextStyle | TextStyle[];
    textPlaceholder: TextStyle | TextStyle[];
  };
  type: InputFieldVariants;
  maxLength?: number;
  centerText?: boolean;
  numberOfLines?: number;
  fontSize?: number;
  height?: DimensionValue;
  dataPicker?: any;
  language?: any;
  displayKey?: string;
  backgroundColor?: ColorValue;
  onOptionSelected?: any;
  showOptionsAmount?: number;
  showSearchInPicker?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
  onSubmit?: (event?: GestureResponderEvent) => void;
  onChangeText?: (text: string) => void;
  onFocus: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  dateFormat?: any;
  showCalendar?: boolean;
  isLoadingMoreData?: boolean;
  onLoadMoreData?: (currentPage?: number, filterText?: string) => void;
  currentPage?: number;
  isPagination?: boolean;
  isStopLoadMoreData?: boolean;
}

export interface InputHelperProps {
  styleHelper: TextStyle | TextStyle[];
  label?: string;
}

export interface InputOptionsProps {
  data: any;
  displayKey?: string;
  showSearchInPicker?: boolean;
  onOptionSelected: (item: any, index: number) => void;
  showOptions: boolean;
  showOptionsAmount?: number;
  positionModal: {
    top: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  };
  onClose: (event?: GestureResponderEvent) => void;
  onChangeFilterText: (text: string) => void;
  filterValue: string;
  placeholderPickerSearch?: string;
  optionsTop: boolean;
  dataPicker: any;
  isLoadingMoreData?: boolean;
  onLoadMoreData?: (currentPage?: number, filterText?: string) => void;
  currentPage?: number;
  isPagination?: boolean;
  isStopLoadMoreData?: boolean;
}
