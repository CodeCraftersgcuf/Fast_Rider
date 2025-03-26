
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageStyle,
  Platform,
  Animated,
  Easing,
  Modal,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "../../../constants/icons";
import imageSource from '../../../assets/images/pp.png';
import { colors } from "../../../constants/colors";
import ActButton from "../../../components/ActButton";
import images from "../../../constants/images";
import { useNavigation } from '@react-navigation/native';
import ConfirmationModals from "../../../components/ConfirmationModals";
import { ContactReceiverPopup } from "../../../components/ContactReceiverPopup";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  rider?: any;
  amount?: string;
};
export default function RideDetails() {
  const navigation = useNavigation();

  const route = useRoute();
  const { rider, amount } = route.params as RouteParams ?? {};

  console.log("Rider:", rider);
  console.log("Amount:", amount);

  const routeCoordinates = [
    { latitude: 40.7359, longitude: -73.9911 },
    { latitude: 40.742, longitude: -73.9885 },
    { latitude: 40.7484, longitude: -73.9857 },
    { latitude: 40.755, longitude: -73.981 },
    { latitude: 40.7616, longitude: -73.9773 },
  ];
  const [deliveryStatus, setDeliveryStatus] = useState<"In Transit" | "Delivered">("In Transit")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")

  const cursorOpacity = useState(new Animated.Value(1))[0]

  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [codeConfirmation, setCodeConfirmation] = useState(false)

  const [customerDetailModal, setCustomerDetailModal] = useState(false);

  const [showRequestButton, setShowRequestButton] = useState(false);
  const [showActButton, setShowActButton] = useState(true);
  const [actButtonLabel, setActButtonLabel] = useState("I have arrived for pickup");
  const [requestButtonDisabled, setRequestButtonDisabled] = useState(true);

  const handleProceed = () => {
    console.log("It clicked");
    setShowConfirmationModal(true);
  }

  const onChatPress = () => {
    console.log("It clicked")
    navigation.navigate("Add", {
      screen: "Chat",
      params: { id: "2" },
    })
  }

  useEffect(() => {
    const blinkCursor = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    )

    if (showConfirmationModal) {
      blinkCursor.start()
    } else {
      blinkCursor.stop()
    }

    return () => {
      blinkCursor.stop()
    }
  }, [showConfirmationModal, cursorOpacity])

  const handleConfirmCode = () => {
    setShowConfirmationModal(false)
    setShowPaymentConfirmation(true)

    if (actButtonLabel === "I have arrived for pickup") {
      setActButtonLabel("Complete Delivery");
      setShowRequestButton(true);
    } else {
      setShowActButton(false);
      setRequestButtonDisabled(false);
    }

    setCodeConfirmation(true);
  }

  const handleConfirmationClose = () => {
    setShowPaymentConfirmation(false)
  }

  const handleDummy = () => {
    console.log("Clicked");
  }

  const handleRetype = () => {
    console.log("It cliced/");
    setShowPaymentConfirmation(false)
    setCodeConfirmation(false);
    setShowConfirmationModal(true)
  }
  const handleNextScreen = () => {
    console.log("Moving to the next Screen");
    navigation.navigate('BankTransferPayment')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name={icons.back} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 40.7484,
                longitude: -73.9857,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#9C27B0"
                strokeWidth={4}
                lineDashPattern={[1]}
              />
              <Marker coordinate={routeCoordinates[0]}>
                <Image
                  source={icons.senderLocation}
                  style={styles.markerIcon as ImageStyle}
                />
              </Marker>
              <Marker
                coordinate={routeCoordinates[routeCoordinates.length - 1]}
              >
                <Image
                  source={icons.receiverLocation}
                  style={styles.markerIcon as ImageStyle}
                />
              </Marker>
            </MapView>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Transit</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            {/* Order ID Section */}
            <View style={{ alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles.sectionTitle}>Order id</Text>
              <Text style={styles.orderId}>ORD-12ESCJK3K</Text>
            </View>

            {/* Address Details */}
            <View style={styles.locationContainer}>
              <View style={styles.locationItem}>
                <Text style={styles.locationLabel}>From</Text>
                <Text style={styles.locationText} numberOfLines={1}>
                  {rider?.senderAddress ?? "N/A"}
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeLabel}>Time of Order</Text>
                  <Text style={styles.timeValue}>11:24 AM</Text>
                </View>
              </View>

              <View style={styles.locationItem}>
                <Text style={styles.locationLabel}>To</Text>
                <Text style={styles.locationText} numberOfLines={1}>
                  {rider?.receiverAddress ?? "N/A"}
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeLabel}>Estimated Delivery</Text>
                  <Text style={styles.timeValue}>{rider?.deliveryTime ?? "N/A"}</Text>
                </View>
              </View>
            </View>

            {/* Payment Details */}
            <View style={styles.paymentContainer}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Sub total</Text>
                <Text style={styles.paymentValue}>₦ {amount ?? "0"}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Payment method</Text>
                <Text style={styles.paymentValue}>{rider?.paymentMethod ?? "N/A"}</Text>
              </View>
            </View>

            {/* View History & Customer Details */}
            <View style={styles.historyCustomerContainer}>
              <TouchableOpacity>
                <Text style={styles.historyButtonText}>View full history</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.customerDetailsText}>Customer details</Text>
              </TouchableOpacity>
            </View>

            {/* Order Progress Timeline */}
            <View style={styles.timeline}>
              {["Order", "Picked up", "In transit", "Delivered"].map((step, index) => (
                <View key={step} style={styles.timelineItem}>
                  <View style={[styles.timelineDot, index <= 2 ? styles.activeDot : styles.inactiveDot]} />
                  <Text style={[styles.timelineText, index <= 2 ? styles.activeText : styles.inactiveText]}>
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          </View>


        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={imageSource}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.riderName}>Maleek Oladimeji</Text>
              <View>
                <Text style={styles.userPrice}>N 22,500</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionButtons} >
            <TouchableOpacity style={styles.actionButton} onPress={onChatPress}>
              <Image
                source={icons.chats}
                style={styles.actionIcon as ImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setCustomerDetailModal(true)}>
              <Image
                source={icons.phoneb}
                style={styles.actionIcon as ImageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {showActButton && (
        <View style={{ paddingHorizontal: 20 }}>
          <ActButton
            icon="bicycle"
            label={actButtonLabel}
            onPress={handleProceed}
          />
        </View>
      )}

      {showRequestButton && (
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              requestButtonDisabled && styles.disabledButton
            ]}
            onPress={handleNextScreen}
            disabled={requestButtonDisabled}
          >
            <Text style={styles.continueButtonText}>Request payment</Text>
          </TouchableOpacity>
        </View>
      )}
      <ContactReceiverPopup
        visible={customerDetailModal}
        onClose={() => setCustomerDetailModal(false)}
        name="Adebisi Lateefat"
        phone="070312345678"
        address="No 2, adcfdgt street, isdf, frgty"
        onCall={() => console.log("Calling the Customer...")}
      />

      <ConfirmationModals
        showConfirmationModal={showConfirmationModal}
        setShowConfirmationModal={setShowConfirmationModal}
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        handleConfirmCode={handleConfirmCode}
        cursorOpacity={cursorOpacity}
        showPaymentConfirmation={showPaymentConfirmation}
        handleConfirmationClose={handleConfirmationClose}
        codeConfirmation={codeConfirmation}
        handleDummy={handleDummy}
        handleRetype={handleRetype}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    overflow: "hidden",
  },
  mapContainer: {
    height: 200,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#9C27B0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  orderDetails: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  locationItem: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
  },
  timeLabel: {
    fontSize: 13,
    color: "#666",
  },
  timeValue: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  paymentItem: {
    flex: 1,
    gap: 3,
  },
  paymentLabel: {
    fontSize: 13,
    color: "#666",
  },
  paymentValue: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
  },
  historyCustomerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 20
  },
  historyButtonText: {
    color: "#9C27B0",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: 'underline',
  },
  customerDetailsText: {
    color: "#9C27B0",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: 'underline',

  },
  customerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  customerInfo: {
    flexDirection: "column",
  },
  customerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  customerPrice: {
    fontSize: 13,
    color: "#666",
  },
  userPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  timelineItem: {
    alignItems: "center",
    gap: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },


  activeDot: {
    backgroundColor: "#9C27B0",
  },
  inactiveDot: {
    backgroundColor: "#EEE",
  },
  timelineText: {
    fontSize: 12,
  },
  activeText: {
    color: "#9C27B0",
    fontWeight: "500",
  },
  inactiveText: {
    color: "#666",
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.grey,
    padding: 16,
    margin: 16,
    borderRadius: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  riderName: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: "#800080",
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 16,
    marginTop: 0,
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(165, 17, 128, 0.1)",
  },
  bikeButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#800080",
  },
  trackButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  trackButtonText: {
    color: "#800080",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  chevronIcon: {
    width: 30,
    height: 24,
    tintColor: "#800080",
  },
  continueButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: '#800080', // example disabled button color
    opacity: 0.5, // slightly transparent
  },
});
