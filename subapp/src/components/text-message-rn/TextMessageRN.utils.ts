import { DANGER_900, NEUTRAL_800 } from "../../styles/colors";

export const getTextColorByType = (type: 'left-user' | 'right-user' | 'error') => {
    if (type === 'error') {
        return DANGER_900;
    }
    return NEUTRAL_800;
};
