import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { IGridContainer } from '../../../../src/components/containers/gridContainer/GridContainer.types';
import GridContainer from '../../../../src/components/containers/gridContainer/GridContainer';

describe('GridContainer Types', () => {
  it('should accept valid props according to IGridContainer interface', () => {
    // Test valid numeric gaps
    const props1: IGridContainer = {
      gapHorizontal: 10,
      gapVertical: 20,
      components: [],
    };
    expect(props1).toBeTruthy();

    // Test with ReactNode components
    const props2: IGridContainer = {
      components: [
        <Text key="1">Test</Text>,
        <View key="2"><Text>Nested</Text></View>,
      ],
    };
    expect(props2).toBeTruthy();

    // Test with single ViewStyle
    const singleStyle: ViewStyle = {
      backgroundColor: 'red',
      padding: 10,
    };
    const props3: IGridContainer = {
      stylesContainer: singleStyle,
      components: [],
    };
    expect(props3).toBeTruthy();

    // Test with ViewStyle array
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
    // Test with minimal props
    const minimalProps: IGridContainer = {};
    expect(minimalProps).toBeTruthy();

    // Test with partial props
    const partialProps: IGridContainer = {
      gapHorizontal: 10,
    };
    expect(partialProps).toBeTruthy();
  });

  it('should render component with various prop combinations', () => {
    // Testing type compatibility with actual component usage
    const testRender1 = (
      <GridContainer
        gapHorizontal={15}
        gapVertical={25}
        components={[<Text key="1">Test</Text>]}
        stylesContainer={{ backgroundColor: 'red' }}
      />
    );
    expect(testRender1).toBeTruthy();

    // Testing with style array
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

    // Testing with undefined optional props
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

  // Type assertion test (this will fail TypeScript compilation if types are wrong)
  it('should enforce correct types', () => {
    // @ts-expect-error - Testing invalid gap type
    const invalidGap: IGridContainer = {
      gapHorizontal: "10", // Should be number
      components: [],
    };

    // @ts-expect-error - Testing invalid style type
    const invalidStyle: IGridContainer = {
      stylesContainer: "invalid-style", // Should be ViewStyle or ViewStyle[]
      components: [],
    };

    // @ts-expect-error - Testing invalid components type
    const invalidComponents: IGridContainer = {
      components: "not-an-array", // Should be ReactNode[]
    };
  });
});