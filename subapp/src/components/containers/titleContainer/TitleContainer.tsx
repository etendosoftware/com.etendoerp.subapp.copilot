import React, { FC } from 'react';
import { Text } from 'react-native';
import { DEFAULT } from './TitleContainer.default';
import { ITitleContainer } from './TitleContainer.types';
import { GridContainer } from '../gridContainer';

const TitleContainer: FC<ITitleContainer> = ({
  buttons,
  title,
  styleContainer,
  styleTitle,
  styleGridContainer,
  gridGapHorizontal,
  gridGapVertical,
}) => {
  return (
    <GridContainer
      stylesContainer={styleContainer}
      components={[
        <Text
          style={[DEFAULT.TITLE_STYLE, styleTitle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>,
        <GridContainer
          components={buttons}
          stylesContainer={styleGridContainer}
          gapHorizontal={gridGapHorizontal}
          gapVertical={gridGapVertical}
        />,
      ]}
    />
  );
};

export default TitleContainer;
