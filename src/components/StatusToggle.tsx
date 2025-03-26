import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useNavigation } from "@react-navigation/native";
export const StatusToggle: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const navigation = useNavigation();
  const handleToggle = () => {
    setIsOnline(prev => !prev);
    navigation.navigate('Add', {
      screen: 'SearchRiders',
    })
  };

  return (
    <View style={styles.container}>
      {/* Notification Icon */}
      <TouchableOpacity style={styles.bellIcon}>
        <Ionicons name="notifications-outline" size={20} color={colors.black} />
      </TouchableOpacity>

      {/* Toggle Switch */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        style={[
          styles.toggleContainer,
          { backgroundColor: isOnline ? colors.primary : '#ddd' },
        ]}
      >
        <Animated.View
          style={[
            styles.toggleCircle,
            isOnline && { alignSelf: 'flex-end', backgroundColor: '#fff' },
          ]}
        />
        {/* Move the text based on online/offline state */}
        <Text
          style={[
            styles.toggleLabel,
            {
              color: isOnline ? '#fff' : '#555',
              textAlign: isOnline ? 'left' : 'right', // Align text accordingly
              marginLeft: isOnline ? 12 : 0, // Adjust position for online state
              marginRight: isOnline ? 0 : 12, // Adjust position for offline state
            },
          ]}
        >
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CIRCLE_SIZE = 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 35,
    paddingHorizontal: 20,
  },
  bellIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'space-between',
  },
  toggleCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#bbb',
  },
  toggleLabel: {
    position: 'absolute',
    right: 14,
    fontWeight: '500',
    fontSize: 13,
  },
});
