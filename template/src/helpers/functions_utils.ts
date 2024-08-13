import { Platform } from "react-native";

export const isWebPlatform = (): boolean => {
    return Platform.OS === 'web';
};