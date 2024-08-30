import { useState } from "react";
import { Clipboard, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// @ts-ignore
import { CopyIcon } from "../../assets/images/icons/CopyIcon";
import { NEUTRAL_0, PRIMARY_20 } from "../../styles/colors";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeComponent = ({
    node,
    inline,
    className,
    children,
    ...props
}: any) => {
    const [copiedCode, setCopiedCode] = useState(false);

    const textContent =
        typeof children === 'string'
            ? children
            : typeof children === 'object' && children.props && typeof children.props.children === 'string'
                ? children.props.children
                : '';

    // Copies the code to the clipboard
    const copyToClipboard = () => {
        setCopiedCode(true);
        Clipboard.setString(textContent);
        // Reset copied status after a short delay
        setTimeout(() => setCopiedCode(false), 2000);
    };

    return (
        <View style={{
            marginTop: 8,
            marginBottom: 8,
        }}>
            <View style={styles.copyButton}>
                <CopyIcon fill={NEUTRAL_0} style={{ width: 12, height: 12 }} />
                <Text style={styles.copyButtonText} onPress={copyToClipboard}>{copiedCode ? 'Copied text!' : 'Copy code'}</Text>
            </View>
            <SyntaxHighlighter
                style={nightOwl}
                customStyle={{
                    borderBottomRightRadius: "0.25rem",
                    borderBottomLeftRadius: "0.25rem",
                    fontSize: "0.75rem",
                    margin: 0,
                }}
                children={textContent}
            />
        </View>)
};

// StyleSheet for the components
const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold',
    },
    italicText: {
        fontStyle: 'italic',
    },
    copyButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 5,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        backgroundColor: PRIMARY_20,
        gap: 5,
    },
    copyButtonText: {
        color: NEUTRAL_0,
        fontSize: 12,
    },
});
