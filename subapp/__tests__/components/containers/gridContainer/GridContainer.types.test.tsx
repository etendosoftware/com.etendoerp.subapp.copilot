import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { IGridContainer } from '../../../../src/components/containers/gridContainer/GridContainer.types';
import GridContainer from '../../../../src/components/containers/gridContainer/GridContainer';

describe('GridContainer Types', () => {
  it('should accept valid props according to IGridContainer interface', () => {
    const props1: IGridContainer = {
      gapHorizontal: 10,
      gapVertical: 20,
      components: [],
    };
    expect(props1).toBeTruthy();

    const props2: IGridContainer = {
      components: [
        <Text key="1">Test</Text>,
        <View key="2"><Text>Nested</Text></View>,
      ],
    };
    expect(props2).toBeTruthy();

    const singleStyle: ViewStyle = {
      backgroundColor: 'red',
      padding: 10,
    };
    const props3: IGridContainer = {
      stylesContainer: singleStyle,
      components: [],
    };
    expect(props3).toBeTruthy();

    const styleArray: ViewStyle[] = [
      {
        backgroundColor: 'blue',
        margin: 5,
      },
      {
        padding: 15,
        borderRadius: 8,
      },
    ];
    const props4: IGridContainer = {
      stylesContainer: styleArray,
      components: [],
    };
    expect(props4).toBeTruthy();
  });

  it('should work with optional props', () => {
    const minimalProps: IGridContainer = {};
    expect(minimalProps).toBeTruthy();

    const partialProps: IGridContainer = {
      gapHorizontal: 10,
    };
    expect(partialProps).toBeTruthy();
  });

  it('should render component with various prop combinations', () => {
    const testRender1 = (
      <GridContainer
        gapHorizontal={15}
        gapVertical={25}
        components={[<Text key="1">Test</Text>]}
        stylesContainer={{ backgroundColor: 'red' }}
      />
    );
    expect(testRender1).toBeTruthy();

    const testRender2 = (
      <GridContainer
        components={[]}
        stylesContainer={[
          { backgroundColor: 'blue' },
          { padding: 10 },
        ]}
      />
    );
    expect(testRender2).toBeTruthy();

    const testRender3 = (
      <GridContainer
        gapHorizontal={undefined}
        gapVertical={undefined}
        components={undefined}
        stylesContainer={undefined}
      />
    );
    expect(testRender3).toBeTruthy();
  });

  it('should enforce correct types', () => {
    const invalidGap: IGridContainer = {
      gapHorizontal: "10", 
      components: [],
    };

    const invalidStyle: IGridContainer = {
      stylesContainer: "invalid-style", 
      components: [],
    };

    const invalidComponents: IGridContainer = {
      components: "not-an-array", 
    };
  });
});