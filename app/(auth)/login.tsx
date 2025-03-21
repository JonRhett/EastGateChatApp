/**
 * Login screen component.
 */

import { View, Text } from 'react-native';
import { useThemedTextStyles, useThemedContainerStyles } from '@/hooks/useThemeStyles';

export default function LoginScreen() {
  const textStyles = useThemedTextStyles();
  const containerStyles = useThemedContainerStyles();

  return (
    <View style={[containerStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={textStyles.h1}>Login Screen</Text>
    </View>
  );
} 