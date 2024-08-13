import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { ImageStyle, ColorValue } from 'react-native';
import { DEFAULT_COLOR_THEME } from '../../../styles/colors';
import { sizeSvg } from '../../../helpers/svg_utils';

export interface SvgImageProps {
  style?: ImageStyle;
  fill?: ColorValue;
}

export const BackIcon = ({
  style,
  fill = DEFAULT_COLOR_THEME,
}: SvgImageProps) => {
  const width = sizeSvg(style?.width, 16);
  const height = sizeSvg(style?.height, 16);

  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.19333 8.0601C4.87635 8.74534 5.52295 9.39367 6.16923 10.0425C6.51817 10.3465 6.78089 10.6415 7.07489 10.9582C7.54066 11.4598 7.60881 12.2564 7.24733 12.8198C6.87785 13.3957 6.24184 13.5175 5.76334 13.0436C3.97195 11.2697 2.18629 9.48629 0.412239 7.68511C-0.154617 7.12957 -0.124611 6.17707 0.426776 5.61827C2.19376 3.82811 3.97002 2.05216 5.75187 0.28522C6.24251 -0.225978 6.89012 0.0101201 7.25953 0.519648C7.61161 1.08922 7.58374 1.88638 7.05995 2.37804C6.22544 3.25829 5.33185 4.11775 4.47372 4.98664C4.39044 5.09229 4.31722 5.16411 4.24861 5.32171C4.35923 5.32171 4.50173 5.32171 4.58055 5.32171C6.56618 5.32179 8.55175 5.38459 10.5637 5.32262C13.6765 5.32914 15.992 8.25753 15.9981 12.1744C15.9994 12.9801 16.0022 13.7857 15.997 14.5913C15.9917 15.407 15.5981 15.9988 14.9507 16C14.3333 16.0011 13.8814 15.4074 13.8676 14.5952C13.849 13.5357 13.9008 12.3934 13.7958 11.3109C13.6203 9.50266 12.332 8.05007 10.8811 8.0175C8.69658 7.96856 6.51084 8.00289 4.32563 8.00297C4.30589 8.00297 4.28608 8.01926 4.19333 8.0601Z"
        fill={fill}
      />
    </Svg>
  );
};
