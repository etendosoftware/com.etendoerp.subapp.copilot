import React from "react";
import { Animated, Easing } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef } from "react";

// LevitatingImage Component for Floating Image Animation
export const LevitatingImage = () => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 5,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <Animated.Image
      source={require('../../assets/images/copilot/copilot-processing.png')}
      style={[styles.icon, { transform: [{ translateY }] }]}
    />
  );
};