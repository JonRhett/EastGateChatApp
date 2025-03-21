/**
 * SplashScreen Component
 * 
 * A beautiful, color-theory compliant splash screen for the EastGate Church app.
 * Uses the church's established color palette and typography system.
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { colors, typography, spacing } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 15 });

    const timer = setTimeout(onAnimationComplete, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[...colors.gradients.primary]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>EastGate</Text>
        <Text style={styles.subtitle}>Church</Text>
        <Text style={styles.tagline}>Connecting Hearts, Building Community</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.dark,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...typography.textStyles.h1,
    color: colors.accent.main,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.textStyles.h2,
    color: colors.primary.light,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  tagline: {
    ...typography.textStyles.body,
    color: colors.accent.dark,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
}); 