/**
 * SplashScreen Component
 * 
 * An elegant splash screen for the EastGate Church app with warm coffee-inspired tones.
 * Creates a welcoming and sophisticated first impression.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue,
  withDelay,
  withSequence
} from 'react-native-reanimated';
import { colors, layout, spacing, typography } from '@/constants/theme';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

/**
 * A beautiful splash screen component that displays the EastGate Church branding
 * with a smooth fade-in animation and gradient background.
 */
export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    // Animate logo first
    logoOpacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1200 });
    
    // Then animate text
    textOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));

    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: scale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#362517', '#241A13']} // Rich coffee dark to deeper brown
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <View style={styles.circleOverlay} />
      
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image 
          source={require('@/assets/images/TanLogo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Animated.View style={[styles.content, textAnimatedStyle]}>
        <ThemedText variant="h1" style={styles.title}></ThemedText>
        <ThemedText variant="h2" style={styles.subtitle}></ThemedText>
        <View style={styles.taglineContainer}>
          <View style={styles.taglineLine} />
          <ThemedText variant="body" style={styles.tagline}>Connecting With Jesus{'\n'}Building Community</ThemedText>
          <View style={styles.taglineLine} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#241A13', // Deep coffee color
    position: 'relative',
    overflow: 'hidden',
  },
  circleOverlay: {
    position: 'absolute',
    top: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(179, 135, 105, 0.07)', // Creamy coffee, very transparent
  },
  logoContainer: {
    marginBottom: spacing.xl * 1.5,
  },
  logoImage: {
    width: 300,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: '#D9CFCA', // Soft cream
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: typography.fonts.primary,
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 46,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#B38769', // Creamy coffee
    marginBottom: spacing.xl,
    textAlign: 'center',
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes.h2,
    fontWeight: '600',
    lineHeight: typography.lineHeights.h2,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    width: '90%',
  },
  taglineLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(179, 135, 105, 0.3)', // Creamy coffee with opacity
  },
  tagline: {
    color: '#A19389', // Muted taupe
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    fontFamily: typography.fonts.secondary,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
}); 