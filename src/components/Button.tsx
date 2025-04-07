import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean; // Add the disabled prop
}

export const Button: React.FC<ButtonProps> = ({ onPress, title, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]} // Add disabled styling if disabled is true
      onPress={onPress}
      disabled={disabled} // Disable the button functionality if disabled is true
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: colors.grey, // Add a gray background for disabled state
  },
  disabledText: {
    color: colors.lightgrey, // Add a lighter text color for the disabled state
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
