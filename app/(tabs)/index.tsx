/**
 * Home screen component.
 */

import { View, Text } from 'react-native';
import { useTextStyles, useContainerStyles } from '@/hooks/useThemeStyles';

export default function HomeScreen() {
  const textStyles = useTextStyles();
  const containerStyles = useContainerStyles();

  return (
    <View style={[containerStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={textStyles.h1}>Home Screen</Text>
    </View>
  );
}
