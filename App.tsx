/**
 * Main App Component
 * 
 * The root component of the EastGate Church app.
 * Handles the initial splash screen and main app navigation.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SplashScreen } from './components/ui/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to EastGate Church</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#2C3E50',
    fontFamily: 'Inter-Regular',
  },
}); 