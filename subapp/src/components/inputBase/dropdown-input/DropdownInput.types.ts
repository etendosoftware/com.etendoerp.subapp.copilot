import {
  DimensionValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import { IInputBase } from '../InputBase.types';
import { RefObject } from 'react';

export interface IDropdownInput
  extends Omit<IInputBase, 'keyboardType' | 'secureTextEntry' | 'multiline' | 'numberOfLines'> {
  staticData?: any[];
  displayKey?: string;
  maxVisibleOptions?: number;
  onSelect?: (option: any) => void;
  onFetchData?: (
    currentPage: number,
    pageSize?: number,
    filterText?: string,
  ) => Promise<any[]>;
  pageSize?: number;
  searchPlaceholder?: string;
  noResultsText?: string;
}

export interface IDropdownInputOptions {
  isVisibleDropdown: boolean;
  onClose: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelectOption: (item: any) => void;
  onFilterTextChange: (value: string) => void;
  maxVisibleOptions?: number;
  modalPosition: {
    top: number;
    left: number;
    width: number;
  };
  windowWidth: DimensionValue;
  windowHeight: DimensionValue;
  data?: any[];
  displayKey?: string;
  value?: string;
  isLoading?: boolean;
  isStaticData?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  isModalUp: boolean;
  refScrollView?: RefObject<ScrollView>
}
