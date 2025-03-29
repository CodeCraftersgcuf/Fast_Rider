import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  FlatList,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from './../../constants/colors';
import images from '../../constants/images';
import ActButton from '../../components/ActButton';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const screens = [
  {
    id: 1,
    title: 'Become a rider\non Fast',
    description: 'Earn as your deliver goods on fast with amazing discounts and commissions',
    image: images.rider_onboarding,
  },
];

const Onboard = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const handleProceed = () => {
    if (currentScreen === screens.length - 1) {
      navigation.navigate('Login' as never); // TS-safe
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentScreen + 1,
        animated: true,
      });
    }
  };

  const renderItem = ({ item }: { item: typeof screens[0] }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <ActButton
          icon="bicycle"
          label="Get Started"
          onPress={handleProceed}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentScreen(newIndex);
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
    marginBottom: 150,
    opacity: 0.5,
  },
  paginationDotActive: {
    opacity: 1,
    width: 20,
    backgroundColor: colors.primary,
  },
  textContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 10,
    width: '100%',
    height: '35%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 35,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  proceedText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Onboard;