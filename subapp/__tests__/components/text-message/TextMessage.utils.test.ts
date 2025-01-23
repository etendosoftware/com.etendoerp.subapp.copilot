import { getTextColorByType, } from "../../../src/components/text-message/TextMessage.utils";
import { NEUTRAL_800 } from "../../../src/styles/colors";


it('should return NEUTRAL_800 when type is left-user', () => {
    const result = getTextColorByType('left-user');
    expect(result).toBe(NEUTRAL_800);
  });

it('should return NEUTRAL_800 when type is undefined', () => {
    const result = getTextColorByType(undefined as any);
    expect(result).toBe(NEUTRAL_800);
  });