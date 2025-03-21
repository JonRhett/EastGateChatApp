/**
 * SplashScreen Component
 * 
 * A dynamic and eye-catching splash screen for the EastGate Church app
 * with coffee-inspired aesthetics and modern animations.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withDelay,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { colors, spacing, typography } from '@/constants/theme';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

/**
 * An animated splash screen component that displays the EastGate Church branding
 * with impressive animations and visual effects.
 */
export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  // Animation shared values
  const mainTextScale = useSharedValue(0.8);
  const mainTextOpacity = useSharedValue(0);
  
  const taglineOpacity = useSharedValue(0);
  const taglineWidth = useSharedValue(0);
  
  const circle1Scale = useSharedValue(0);
  const circle2Scale = useSharedValue(0);
  const circle3Scale = useSharedValue(0);
  
  const pulseScale = useSharedValue(1);
  
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Start with dramatic circles expansion
    circle1Scale.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
    circle2Scale.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }));
    circle3Scale.value = withDelay(400, withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }));
    
    // Main text animation with spring effect
    mainTextScale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 100 }));
    mainTextOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    
    // Start pulse animation for the main text
    startPulseAnimation();
    
    // Tagline reveal animation
    taglineOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    taglineWidth.value = withDelay(1200, withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }));

    // Complete the splash animation
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  // Create a subtle pulse animation for the main text
  const startPulseAnimation = () => {
    pulseScale.value = withDelay(
      1200,
      withSequence(
        withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      )
    );
  };

  // Animated styles
  const mainTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mainTextOpacity.value,
    transform: [
      { scale: mainTextScale.value },
      { scale: pulseScale.value }
    ],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const taglineLineAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(taglineWidth.value, [0, 1], [0, width * 0.35], Extrapolate.CLAMP),
  }));

  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ scale: circle1Scale.value }],
    opacity: interpolate(circle1Scale.value, [0, 1], [0, 0.1], Extrapolate.CLAMP),
  }));

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ scale: circle2Scale.value }],
    opacity: interpolate(circle2Scale.value, [0, 1], [0, 0.08], Extrapolate.CLAMP),
  }));

  const circle3Style = useAnimatedStyle(() => ({
    transform: [{ scale: circle3Scale.value }],
    opacity: interpolate(circle3Scale.value, [0, 1], [0, 0.05], Extrapolate.CLAMP),
  }));

  return (
    <LinearGradient
      colors={['#2B1D12', '#1A1208']} // Darker rich coffee to very deep brown
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      {/* Animated background circles */}
      <Animated.View style={[styles.circle1, circle1Style]} />
      <Animated.View style={[styles.circle2, circle2Style]} />
      <Animated.View style={[styles.circle3, circle3Style]} />
      
      {/* Animated coffee bean particles */}
      <View style={styles.beansContainer}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={[styles.bean, {
            top: Math.random() * height,
            left: Math.random() * width,
            transform: [{ rotate: `${Math.random() * 360}deg` }]
          }]} />
        ))}
      </View>
      
      {/* Main content container */}
      <View style={[styles.contentContainer, { paddingTop: 20 }]}>
        {/* Logo with fade animation */}
        <Animated.View style={[styles.mainTextContainer, mainTextAnimatedStyle]}>
          <Animated.Image 
            source={require('../../assets/images/TanLogo.png')}
            style={[styles.logo, { marginTop: 20 }]}
            resizeMode="contain"
          />
        </Animated.View>
        
        {/* Tagline with reveal animation */}
        <Animated.View style={[styles.taglineContainer, taglineAnimatedStyle]}>
          <Animated.View style={[styles.taglineLine, taglineLineAnimatedStyle]} />
          <View style={styles.taglineTextContainer}>
            <ThemedText variant="body" style={styles.tagline}>Connecting With Jesus...</ThemedText>
            <ThemedText variant="body" style={styles.tagline}>...Building Community</ThemedText>
          </View>
          <Animated.View style={[styles.taglineLine, taglineLineAnimatedStyle]} />
        </Animated.View>
        
        {/* Coffee cup icon at the bottom */}
        <Animated.View style={[styles.iconContainer, taglineAnimatedStyle]}>
          <Feather name="coffee" size={24} color="#B38769" />
        </Animated.View>
      </View>
      
      {/* Shimmer effect overlay */}
      <View style={styles.shimmerContainer}>
        <View style={styles.shimmerStrip} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1208', // Deeper coffee color
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: spacing.lg,
  },
  circle1: {
    position: 'absolute',
    width: Dimensions.get('window').width * 1.5,
    height: Dimensions.get('window').width * 1.5,
    borderRadius: Dimensions.get('window').width * 0.75,
    backgroundColor: '#B38769', // Creamy coffee
    top: -Dimensions.get('window').width * 0.5,
    left: -Dimensions.get('window').width * 0.25,
  },
  circle2: {
    position: 'absolute',
    width: Dimensions.get('window').width * 1.2,
    height: Dimensions.get('window').width * 1.2,
    borderRadius: Dimensions.get('window').width * 0.6,
    backgroundColor: '#8D7361', // Medium coffee
    bottom: -Dimensions.get('window').width * 0.3,
    right: -Dimensions.get('window').width * 0.3,
  },
  circle3: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: Dimensions.get('window').width * 0.4,
    backgroundColor: '#D9CFCA', // Soft cream
    top: Dimensions.get('window').height * 0.4,
    left: -Dimensions.get('window').width * 0.3,
  },
  beansContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1,
  },
  bean: {
    position: 'absolute',
    width: 15,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(179, 135, 105, 0.15)', // Creamy coffee with opacity
  },
  mainTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
    marginBottom: spacing.xl,
  },
  mainTitle: {
    color: '#D9CFCA', // Soft cream
    textAlign: 'center',
    fontFamily: typography.fonts.primary,
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  logo: {
    width: '90%',
    height: undefined,
    aspectRatio: 2.5,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl * 0.5,
    width: '100%',
  },
  taglineTextContainer: {
    paddingHorizontal: spacing.md,
  },
  taglineLine: {
    height: 1,
    backgroundColor: 'rgba(179, 135, 105, 0.5)', // Creamy coffee with opacity
  },
  tagline: {
    color: '#A19389', // Muted taupe
    textAlign: 'center',
    fontFamily: typography.fonts.secondary,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  iconContainer: {
    marginTop: spacing.xl * 2,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(179, 135, 105, 0.3)',
    borderRadius: 30,
  },
  shimmerContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    overflow: 'hidden',
    zIndex: 8,
  },
  shimmerStrip: {
    position: 'absolute',
    width: Dimensions.get('window').width * 3,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    transform: [{ rotate: '-45deg' }, { translateX: -Dimensions.get('window').width * 2 }],
    top: Dimensions.get('window').height * 0.3,
  },
});