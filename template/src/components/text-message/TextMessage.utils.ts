import { DANGER_900, NEUTRAL_800 } from "../../styles/colors";

export const getTextColorByType = (type: 'left-user' | "right-user" | "error") => {
    switch (type) {
        case 'error': return DANGER_900;
        default: return NEUTRAL_800;
    }
};