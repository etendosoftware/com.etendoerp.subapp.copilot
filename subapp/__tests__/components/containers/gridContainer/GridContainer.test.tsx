import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import GridContainer from '../../../../src/components/containers/gridContainer/GridContainer';

describe('GridContainer Component', () => {
  // Test default props and basic rendering
  it('should render correctly with default props', () => {
    const { toJSON } = render(<GridContainer components={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  // Test with custom gap values
  it('should apply custom gap values', () => {
    const customGapVertical = 20;
    const customGapHorizontal = 16;
    
    const { toJSON } = render(
      <GridContainer 
        gapVertical={customGapVertical}
        gapHorizontal={customGapHorizontal}
        components={[]}
      />
    );

    const gridViewProps = toJSON().props.style;
    expect(gridViewProps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rowGap: customGapVertical,
          columnGap: customGapHorizontal,
        }),
      ])
    );
  });

  // Test rendering multiple components
  it('should render all provided components', () => {
    const testComponents = [
      <Text key="1">Component 1</Text>,
      <Text key="2">Component 2</Text>,
      <Text key="3">Component 3</Text>,
    ];

    const { getAllByText } = render(
      <GridContainer components={testComponents} />
    );

    expect(getAllByText(/Component \d/)).toHaveLength(3);
  });

  // Test custom styles application
  it('should apply custom container styles', () => {
    const customStyles = {
      backgroundColor: 'red',
      padding: 20,
    };

    const { toJSON } = render(
      <GridContainer 
        components={[]}
        stylesContainer={customStyles}
      />
    );

    const gridViewProps = toJSON().props.style;
    expect(gridViewProps).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customStyles),
      ])
    );
  });


  // Test with undefined values
  it('should handle undefined props gracefully', () => {
    const { toJSON } = render(
      <GridContainer 
        gapVertical={undefined}
        gapHorizontal={undefined}
        components={undefined}
        stylesContainer={undefined}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

});