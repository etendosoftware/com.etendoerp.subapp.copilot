import { IInputBase } from '../InputBase.types';

export interface IPasswordInput extends Omit<IInputBase, 'keyboardType' | 'secureTextEntry' | 'multiline' | 'numberOfLines'> {
  value?: string;
  onChangeText?: (text: string) => void;
}
