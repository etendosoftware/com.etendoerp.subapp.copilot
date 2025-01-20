import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated, Easing } from 'react-native';

// Mock NativeAnimatedHelper
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock completo de react-native
jest.mock('react-native', () => ({
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  Animated: {
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(),
    })),
    loop: jest.fn(() => ({
      start: jest.fn(),
    })),
    sequence: jest.fn(),
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
    Image: 'Animated.Image',
  },
  Easing: {
    inOut: jest.fn(() => jest.fn()),
    ease: jest.fn(),
  },
  Image: 'Image',
}));

// Mock para la imagen de copilot
jest.mock('../../assets/images/copilot/copilot-processing.png', () => 'mocked-image-path');

// Importar el componente después de los mocks
import { LevitatingImage } from '../../../src/components/levitating-image/LevitatingImage';

describe('LevitatingImage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(<LevitatingImage />);
    const animatedImage = UNSAFE_getByType(Animated.Image);
    
    expect(animatedImage).toBeTruthy();
    expect(animatedImage.props.source).toBeDefined();
    expect(animatedImage.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 32,
          height: 32,
        }),
        { transform: [{ translateY: expect.any(Object) }] }
      ])
    );
  });

  it('sets up animation correctly', () => {
    render(<LevitatingImage />);

    expect(Animated.sequence).toHaveBeenCalledTimes(1);
    expect(Animated.timing).toHaveBeenCalledTimes(2);

    // Verificar la primera animación (movimiento hacia arriba)
    expect(Animated.timing).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
      {
        toValue: -5,
        duration: 2000,
        easing: expect.any(Function),
        useNativeDriver: true,
      }
    );

    // Verificar la segunda animación (movimiento hacia abajo)
    expect(Animated.timing).toHaveBeenNthCalledWith(
      2,
      expect.any(Object),
      {
        toValue: 5,
        duration: 2000,
        easing: expect.any(Function),
        useNativeDriver: true,
      }
    );

    expect(Animated.loop).toHaveBeenCalledTimes(1);
  });

  it('starts animation on mount', () => {
    render(<LevitatingImage />);
    
    const loop = Animated.loop as jest.Mock;
    const start = loop.mock.results[0].value.start;
    
    expect(start).toHaveBeenCalledTimes(1);
  });
});