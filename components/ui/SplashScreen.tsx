/**
 * Custom splash screen component with animated graphics and smooth transitions.
 * Uses Reanimated for animations and Skia for custom graphics.
 */

import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { useTextStyles, useContainerStyles } from '@/hooks/useThemeStyles';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const { theme } = useTheme();
  const textStyles = useTextStyles();
  const containerStyles = useContainerStyles();

  // Animation values
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 15 });

    // Trigger completion callback after animations
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, containerStyles.container]}>
      <Animated.View style={[styles.content, containerAnimatedStyle]}>
        <Animated.Text style={[styles.title, textStyles.h1]}>
          EastGate
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, textStyles.body]}>
          Church Communication Hub
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    marginBottom: 8,
    textAlign: 'center',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    color: '#2C3E50',
  },
}); 