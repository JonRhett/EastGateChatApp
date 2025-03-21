/**
 * Basic test for the Hello World component
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

// Import the Hello World component
const { default: HelloWorldScreen } = require('../app/hello-world');

// Test the Hello World component
test('HelloWorldScreen renders correctly', () => {
  const component = renderer.create(<HelloWorldScreen />);
  const tree = component.toJSON();
  expect(tree).toBeDefined();
  
  // Verify the text is present
  const textElement = component.root.findByType(Text);
  expect(textElement.props.children).toBe('Hello World!');
}); 