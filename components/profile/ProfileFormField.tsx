/**
 * ProfileFormField Component
 * Reusable form field component for profile forms
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

interface ProfileFormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  icon?: string;
  error?: string;
}

export const ProfileFormField = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  editable = true,
  icon,
  error,
}: ProfileFormFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <ThemedText style={styles.label}>
          {label}
          {required && <ThemedText style={styles.required}> *</ThemedText>}
        </ThemedText>
      </View>
      
      <View style={[
        styles.inputWrapper,
        multiline && styles.multilineInput,
        error ? styles.inputError : null,
        !editable && styles.disabledInput,
      ]}>
        {icon && (
          <Feather
            name={icon as any}
            size={18}
            color="#8B8982"
            style={styles.inputIcon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            multiline && { textAlignVertical: 'top' }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8B8982"
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          editable={editable}
        />
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={14} color="#6B2737" />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    color: '#8D7361',
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    color: '#6B2737',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4DAD0',
    paddingHorizontal: 12,
  },
  multilineInput: {
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
  },
  inputError: {
    borderColor: '#6B2737',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    opacity: 0.8,
  },
  inputIcon: {
    marginRight: 8,
    marginTop: multiline ? 8 : 0,
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#362517',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    color: '#6B2737',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ProfileFormField;