import React from 'react';
import { ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { LayoutProps } from './Layout.types';
import { defaultStyle } from './Layout.style';

const Layout = ({
  children,
  isScrollVertical,
  isKeyboadAvoid,
  style,
}: LayoutProps) => {
  let content = <View style={[defaultStyle, style]}>{children}</View>;

  if (isScrollVertical) {
    content = <ScrollView>{content}</ScrollView>;
  }

  if (isKeyboadAvoid) {
    content = (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
};

export default Layout;
