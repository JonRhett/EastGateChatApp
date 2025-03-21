/**
 * Theme Style Hooks
 * Provides utility hooks for common theme styling operations.
 */

import { StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeColors, ThemeTypography, ThemeSpacing, ThemeBorderRadius, ThemeShadows } from '@/constants/theme';

/**
 * Hook to create themed text styles
 */
export function useThemedTextStyles() {
  const { colors, typography, spacing } = useTheme();

  return StyleSheet.create({
    h1: {
      fontFamily: typography.fonts.primary,
      fontSize: typography.sizes.h1,
      lineHeight: typography.lineHeights.h1,
      fontWeight: typography.weights.bold,
      color: colors.text.light,
    },
    h2: {
      fontFamily: typography.fonts.primary,
      fontSize: typography.sizes.h2,
      lineHeight: typography.lineHeights.h2,
      fontWeight: typography.weights.bold,
      color: colors.text.light,
    },
    h3: {
      fontFamily: typography.fonts.primary,
      fontSize: typography.sizes.h3,
      lineHeight: typography.lineHeights.h3,
      fontWeight: typography.weights.semibold,
      color: colors.text.light,
    },
    body: {
      fontFamily: typography.fonts.secondary,
      fontSize: typography.sizes.body,
      lineHeight: typography.lineHeights.body,
      color: colors.text.light,
    },
    caption: {
      fontFamily: typography.fonts.secondary,
      fontSize: typography.sizes.caption,
      lineHeight: typography.lineHeights.caption,
      color: colors.text.light,
    },
  });
}

/**
 * Hook to create themed container styles
 */
export function useThemedContainerStyles() {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface.light,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      ...shadows.light,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background.light,
      padding: spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}

/**
 * Hook to create themed button styles
 */
export function useThemedButtonStyles() {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return StyleSheet.create({
    primary: {
      backgroundColor: colors.primary.main,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
    },
    text: {
      color: colors.surface.light,
      fontFamily: typography.fonts.secondary,
      fontSize: typography.sizes.body,
      fontWeight: typography.weights.medium,
    },
  });
}

/**
 * Hook to create themed input styles
 */
export function useThemedInputStyles() {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return StyleSheet.create({
    input: {
      backgroundColor: colors.surface.light,
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      fontFamily: typography.fonts.secondary,
      fontSize: typography.sizes.body,
      color: colors.text.light,
    },
    label: {
      fontFamily: typography.fonts.secondary,
      fontSize: typography.sizes.caption,
      color: colors.text.light,
      marginBottom: spacing.xs,
    },
  });
}

/**
 * Hook to create themed list styles
 */
export function useThemedListStyles() {
  const { colors, spacing, borderRadius } = useTheme();

  return StyleSheet.create({
    list: {
      backgroundColor: colors.surface.light,
      borderRadius: borderRadius.md,
    },
    listItem: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    listItemLast: {
      borderBottomWidth: 0,
    },
  });
}

export const useTextStyles = () => StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
});

export const useContainerStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 