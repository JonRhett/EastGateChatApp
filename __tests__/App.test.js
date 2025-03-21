/**
 * Basic app tests to verify rendering functionality
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';

// Mock expo-router as it causes issues in Jest environment
jest.mock('expo-router', () => {
  const mockView = 'mockView';
  return {
    Stack: jest.fn(() => mockView),
    Redirect: jest.fn(({ href }) => mockView),
  };
});

// Mock theme hooks to avoid errors
jest.mock('@/hooks/useThemeStyles', () => ({
  useThemedTextStyles: jest.fn(() => ({ h1: { color: 'black' } })),
  useThemedContainerStyles: jest.fn(() => ({ container: { backgroundColor: 'white' } })),
}));

// Basic snapshot test for a simple component
test('renders a basic React component', () => {
  const component = renderer.create(
    <View>
      <Text>Hello World</Text>
    </View>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// Import the test screen for testing
const { default: TestScreen } = require('../app/test-screen');

// Test the test screen component
test('TestScreen renders correctly', () => {
  const component = renderer.create(<TestScreen />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
  // Verify the text is present
  const textElement = component.root.findByType(Text);
  expect(textElement.props.children).toBe('Test 1: Basic Rendering ✓');
});

// Import the login screen for testing
const { default: LoginScreen } = require('../app/(auth)/login');

// Test the login screen component
test('LoginScreen renders correctly', () => {
  const component = renderer.create(<LoginScreen />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
  // Verify the text is present
  const textElement = component.root.findByType(Text);
  expect(textElement.props.children).toBe('Login Screen');
}); 