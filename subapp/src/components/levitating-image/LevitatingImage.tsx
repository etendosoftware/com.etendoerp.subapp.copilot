import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { styles } from "./styles";
import copilotProcessing from "../../assets/images/copilot/copilot-processing.png";

// LevitatingImage Component for Floating Image Animation
export const LevitatingImage = () => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate();
  }, [translateY]);

  return (
    <Animated.Image
      source={{ uri: copilotProcessing }}
      style={[styles.icon, { transform: [{ translateY }] }]}
    />
  );
};
