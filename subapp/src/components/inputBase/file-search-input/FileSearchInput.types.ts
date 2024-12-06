import { IInputBase } from '../InputBase.types';

interface UploadConfig {
    file: any;
    url: string;
    method: string;
    headers?: any;
}

export interface FileSearchInputProps extends Omit<IInputBase, 'keyboardType' | 'secureTextEntry'> {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: (message: string, file?: any) => void;
    placeholder?: string;
    setFile?: (file: any) => void;
    onFileUploaded?: (object: any) => void;
    onError?: (error: any) => void;
    token?: string;
    maxFileSize?: number;
    uploadConfig?: UploadConfig | undefined,
    isSendDisable?: boolean;
    isAttachDisable?: boolean;
    initialFiles?: File[] | null;
}