/**
 * SplashScreen Component
 * Displays the initial loading screen with the church logo and name
 * Uses the church's color scheme and typography system
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, layout } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(onAnimationComplete, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            {/* Logo will be added here */}
          </View>
          <Animated.Text style={styles.title}>
            EastGate Church
          </Animated.Text>
          <Animated.Text style={styles.subtitle}>
            Welcome Home
          </Animated.Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: layout.screenWidth,
    height: layout.screenHeight,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface.light,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.textStyles.h1,
    color: colors.text.light,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.textStyles.body,
    color: colors.text.light,
    opacity: 0.8,
    textAlign: 'center',
  },
}); 