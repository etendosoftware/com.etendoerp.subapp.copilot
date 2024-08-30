import { DimensionValue, ViewStyle} from 'react-native';
import { RightButtons } from '../../inputBase/InputBase.types';
import { ISearchInput } from '../../inputBase/search-input/SearchInput.types';

export interface ISearchContainer extends Omit<ISearchInput, 'styleContainer'>{
  buttons?: RightButtons;
  widthSearchInput?: DimensionValue;
  styleContainer?: ViewStyle;
  styleGridContainer?: ViewStyle;
  gridGapHorizontal?: number;
  gridGapVertical?: number;
}
