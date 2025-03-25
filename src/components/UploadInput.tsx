import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface UploadInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onPress: () => void;
}

export const UploadInput: React.FC<UploadInputProps> = ({
  label,
  placeholder,
  value,
  onPress,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
        {value ? (
          <Image source={{ uri: value }} style={styles.preview} />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={28} color={colors.grey} />
            <Text style={styles.placeholder}>{placeholder}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.text.secondary,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lightgrey,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    backgroundColor: colors.white,
  },
  placeholder: {
    color: colors.grey,
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
  },
  preview: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
