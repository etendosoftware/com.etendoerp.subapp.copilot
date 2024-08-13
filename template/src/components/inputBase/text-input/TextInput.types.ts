import { IInputBase } from '../InputBase.types';

export interface ITextInput extends Omit<IInputBase, 'secureTextEntry'> {
  validation?: 'success' | 'error' | 'none';
}
