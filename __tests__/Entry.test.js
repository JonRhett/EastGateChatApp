/**
 * Tests for the app entry point and routing
 */

import React from 'react';
import renderer from 'react-test-renderer';

// Mock expo-router
jest.mock('expo-router', () => {
  const mockRedirect = jest.fn();
  return {
    Redirect: mockRedirect,
  };
});

// Test index file (entry point)
describe('App Entry Point', () => {
  it('should redirect to hello-world screen', () => {
    // Reset modules to ensure fresh import
    jest.resetModules();
    
    // Mock the Redirect component implementation for this test
    const mockRedirectImpl = jest.fn(({ href }) => {
      return `Redirecting to ${href}`;
    });
    
    require('expo-router').Redirect.mockImplementation(mockRedirectImpl);
    
    // Import the index component
    const { default: Index } = require('../app/index');
    
    // Render it
    renderer.create(<Index />);
    
    // Verify that Redirect was called with correct href
    expect(mockRedirectImpl).toHaveBeenCalled();
    expect(mockRedirectImpl.mock.calls[0][0].href).toBe('/hello-world');
  });
}); 