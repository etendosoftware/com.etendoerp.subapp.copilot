import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import Layout from '../../../../src/components/containers/layout/Layout.tsx';

describe('Running Test for Layout', () => {
  it('Check Layout', () => {
    const tree = renderer
      .create(
        <Layout
          style={{ backgroundColor: 'red' }}
          isKeyboadAvoid
          isScrollVertical>
          <Text>Test</Text>
        </Layout>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
