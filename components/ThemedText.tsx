/**
 * ThemedText Component
 * A text component that automatically handles theming based on our theme system
 */

import { Text, type TextProps, StyleSheet } from 'react-native';
import { colors, typography } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  variant?: keyof typeof typography.textStyles;
  color?: keyof typeof colors.text;
};

export function ThemedText({
  style,
  variant = 'body',
  color = 'light',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        typography.textStyles[variant],
        { color: colors.text[color] },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
