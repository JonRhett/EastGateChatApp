/**
 * ThemedView Component
 * A view component that automatically handles theming based on our theme system
 */

import { View, type ViewProps } from 'react-native';
import { colors } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  variant?: 'background' | 'surface';
  color?: 'light' | 'dark';
};

export function ThemedView({ 
  style, 
  variant = 'background',
  color = 'light',
  ...otherProps 
}: ThemedViewProps) {
  return (
    <View 
      style={[{ backgroundColor: colors[variant][color] }, style]} 
      {...otherProps} 
    />
  );
}
