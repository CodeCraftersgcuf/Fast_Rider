
"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GradientBackground } from "../../components/BackgroundGradient";
import { ActionButton } from "../../components/ActionButton";
import { PromotionCard } from "../../components/PromotionCard";
import { LocationCard } from "../../components/LocationCard";
import { DeliveryCard } from "../../components/DeliveryCard";
import { colors } from "../../constants/colors";
import { theme } from "../../constants/theme";
import { formatCurrency } from "../../utils/Fomatters";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import { StatusToggle } from '../../components/StatusToggle';
import images from "../../constants/images";
type UserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "User"
>;

export default function User() {
  const navigation = useNavigation<UserScreenNavigationProp>();
  const [balance, setBalance] = useState(200000);
  const [location, setLocation] = useState("Lagos, Ng");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSearching, setIsSearching] = useState(true)

  const promotions = [
    {
      id: "1",
      title: "Your Number 1 trusted delivery service",
      description:
        "With Fast you get the best delivery service across the country",
      tag: "Fast Logistics",
      imageUrl: "",
    },
  ];

  const handleActionPress = (action: string) => {
    if (action === "Send Parcel") {
      navigation.navigate("Add" as never);
    } else {
      console.log(`${action} pressed`);
    }
  };

  const handleParcelPress = (action: string) => {
    if (action === "Schedule") {
      navigation.navigate("Add", { screen: "ScheduleParcel" })
    } else {
      console.log(`${action} pressed`)
    }
  }

  const handleLocationPress = (type: string) => {
    console.log(`${type} location pressed`);
    // Navigate to location selection
  };

  const handleDeliveryPress = (orderId: string) => {
    console.log(`Delivery ${orderId} pressed`);
    navigation.navigate("UserDetails");
  };

  const handleTopUp = () => {
    console.log("Top up pressed");
    // Navigate to top up screen
  };

  const handleWithdraw = () => {
    console.log("Withdraw pressed");
    // Navigate to withdraw screen
  };

  // useEffect(() => {
  //   // Simulate finding riders after 3 seconds
  //   const timer = setTimeout(() => {
  //     setIsSearching(false)
  //     navigation.navigate('Add', {
  //       screen: 'SearchRiders',
  //     })
  //   }, 3000)

  //   return () => clearTimeout(timer)
  // }, [navigation])
  return (
    <>
      <StatusToggle />
      <GradientBackground gradientType="half">
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Image
                  source={require("../../assets/images/user.png")}
                  style={styles.avatar}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.greeting}>Hi, Qamardeen</Text>
                  <TouchableOpacity style={styles.locationContainer}>
                    <Text style={styles.location}>{location}</Text>
                    <Icon name="chevron-down" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>

            </View>

            {/* Balance */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
              <View style={styles.balanceActions}>

                <TouchableOpacity
                  style={styles.balanceButton}
                  onPress={handleWithdraw}
                >
                  <Image source={images.left_down_arrow} style={{ width: 10, marginRight: 5, }} />
                  <Text style={styles.balanceButtonText}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <ActionButton
                icon="bicycle"
                label="Send Parcel"

                onPress={() => handleActionPress("Send Parcel")}
              />
              <ActionButton
                icon="support-agent"
                label="Support"
                image="support"
                onPress={() => handleActionPress("Track Parcel")}
              />
              <ActionButton
                icon="time"
                image="wallet"
                label="Wallet"
                onPress={() => handleParcelPress("Schedule")}
              />
            </View>

            {/* Promotions */}
            <View style={styles.promotionContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const slideIndex = Math.floor(
                    event.nativeEvent.contentOffset.x /
                    event.nativeEvent.layoutMeasurement.width
                  );
                  setActiveSlide(slideIndex);
                }}
              >
                {promotions.map((promo) => (
                  <View key={promo.id} style={styles.promotionSlide}>
                    <PromotionCard
                      title={promo.title}
                      description={promo.description}
                      tag={promo.tag}
                      imageUrl={promo.imageUrl}
                    />
                  </View>
                ))}
              </ScrollView>

            </View>
            <View
              style={{
                backgroundColor: '#FEEBCB',
                padding: 12,
                borderRadius: 8,
                marginBottom: 16,
                flexDirection: 'row',
                flexWrap: 'wrap',  // Allow the content to wrap instead of overflowing
                alignItems: 'center', // Optional: Ensures proper vertical alignment of items
                borderColor: '#FFA50033',
                borderWidth: 1,
              }}
            >
              <View style={{ flex: 1 }}>  {/* Ensure text takes available space */}
                <Text style={{ color: colors.black }}>
                  Your account is under review, you will be able to receive ride request once you have verified and you have paid for your tier.
                </Text>
              </View>
            </View>

            {/* Active Deliveries */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Active Deliveries</Text>
              <DeliveryCard
                orderId="ORD-12ESCJK3K"
                status="In Transit"
                fromAddress="No 1, abcd street..."
                toAddress="No 1, abcd street..."
                orderTime={new Date("2023-02-23T11:24:00")}
                estimatedDelivery={new Date("2023-02-23T13:22:00")}
                riderName="Maleek Oladimeji"
                riderRating={5}
                onPress={() => handleDeliveryPress("ORD-12ESCJK3K")}
                onChatPress={() => console.log("Chat with rider")}
                onCallPress={() => console.log("Call rider")}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 110,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  userDetails: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: theme.fontSizes.sm,
    color: colors.white,
    marginRight: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceContainer: {
    marginBottom: theme.spacing.sm,
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing.lg,
    justifyContent: 'space-between'
  },
  balanceAmount: {
    fontSize: 35,
    fontWeight: "900",
    color: colors.white,
    marginBottom: theme.spacing.md,
  },
  balanceActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  balanceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingVertical: -1,
    paddingHorizontal: 6,
    gap: 1,
    width: 80,
    height: 35,
  },
  balanceButtonText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: colors.text.primary,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  promotionContainer: {
    marginBottom: theme.spacing.sm,
  },
  promotionSlide: {
    width: 340,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightgrey,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  locationsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    gap: 6,
    padding: theme.spacing.sm,
    justifyContent: "space-between",
    width: "100%",
    height: 90,
  },
  locationsButton: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    boxShadow: "none",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "auto",
  },
});

