export interface TextMessageProps {
    title?: string;
    text: string;
    file?: string;
    time?: string;
    type?: 'left-user' | 'right-user' | 'error';
    backgroundColor?: string;
    files?: File[];
}
