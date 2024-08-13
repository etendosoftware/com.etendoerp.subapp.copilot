import React from "react";
import { INITIAL_100 } from "../../styles/colors";
import { Linking, Text } from "react-native";

export const AnchorComponent = ({ node, children, href, ...props }: any) => (
    <Text
        style={{ fontSize: 14, fontWeight: "600", color: INITIAL_100, textDecoration: "underline" }}
        rel="noopener noreferrer"
        onPress={() => Linking.openURL(href)}
        {...props}
    >
        {children}
    </Text>
);
