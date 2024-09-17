import { View, Animated, ColorValue, DimensionValue } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NEUTRAL_10 } from '../../styles/colors';

interface SkeletonItemProps {
  width: DimensionValue;
  height: DimensionValue;
  color?: ColorValue;
  borderRadius?: number;
  delay?: number;
  animationSpeed?: number;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({
  width,
  height,
  color = NEUTRAL_10,
  borderRadius,
  delay = 10,
  animationSpeed = 600,
}) => {
  const opacity = useRef(new Animated.Value(0.5)).current;
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      Animated.timing(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
        duration: delay,
      }).start(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 1,
              useNativeDriver: false,
              duration: animationSpeed,
            }),
            Animated.timing(opacity, {
              toValue: 0.5,
              useNativeDriver: false,
              duration: animationSpeed,
            }),
          ]),
        ).start();
      });
      setHasStarted(true);
    }
  }, [hasStarted, delay, animationSpeed]);

  return (
    <Animated.View
      style={{ width, height, backgroundColor: color, opacity, borderRadius }}>
      <View style={{ width: '100%', height: '100%' }} />
    </Animated.View>
  );
};

export default SkeletonItem;
