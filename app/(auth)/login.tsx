import { View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function LoginScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <ThemedText style={{ fontSize: 24, textAlign: 'center' }}>
        Welcome to EastGate
      </ThemedText>
      {/* Auth form will be added here */}
    </ThemedView>
  );
} 