import { DimensionValue } from 'react-native';

const sizeSvg = (styleSize?: DimensionValue | number | string, defaultValue?: number) => {
  return typeof styleSize === 'number' || typeof styleSize === 'string'
    ? styleSize
    : defaultValue;
};

export { sizeSvg };
