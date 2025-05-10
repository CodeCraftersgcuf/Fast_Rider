

"use client"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"
import { RiderRequestPopup } from '../../components/RiderRequestPopup'
import { DeliveryFeeModal } from "../../components/Delivery/DeliveryFeeModal"

type SearchRidersNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "SearchRiders">

export default function SearchRidersScreen() {
  const navigation = useNavigation<SearchRidersNavigationProp>()
  const [isSearching, setIsSearching] = useState(true)
  const [showFeeModal, setShowFeeModal] = useState(false)
  const [amount, setAmount] = useState('');

  const rider = {
    name: "Maleek Oladimeji",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    price: "2,500",
    senderAddress: "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo",
    receiverAddress: "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo",
    eta: "5 min",
    deliveryTime: "20 min",

    // 👇 Newly added fields for details section
    senderName: "Qamardeen Malik",
    senderPhone: "07030123456",
    receiverName: "Adebisi Lateefat",
    receiverPhone: "07031234567",
    parcelName: "Samsung Phone",
    parcelCategory: "Electronics",
    parcelValue: "100,000 - 200,000",
    description: "Nil",
    payer: "Sender - Qamardeen Malik",
    paymentMethod: "Wallet",
    payOnDelivery: "No",
    payOnDeliveryAmount: "NA",
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incoming Rider Request</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.searchAnimation}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
          <View style={styles.searchIconContainer}>
          </View>
        </View>

      </View>
      <RiderRequestPopup
        name={rider.name}
        avatar={rider.image}
        rating={rider.rating}
        price={rider.price}
        senderAddress={rider.senderAddress}
        receiverAddress={rider.receiverAddress}
        eta={rider.eta}
        deliveryTime={rider.deliveryTime}
        onSendBid={() => setShowFeeModal(true)}
        onAccept={() => navigation.navigate("Add", {
          screen: "RidesSummary", // ✅ Must match this exactly!
          params: {
            rider,
            amount: rider.price,
          },
        })}
      />
      
      <DeliveryFeeModal
        visible={showFeeModal}
        amount={amount}
        onAmountChange={(val) => setAmount(val)}
        onClose={() => setShowFeeModal(false)}
        onConfirm={() => {
          setShowFeeModal(false)
          navigation.navigate("Add", {
            screen: "RidesSummary", // ✅ Must match this exactly!
            params: {
              rider,
              amount,
            },
          })
        }}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
    paddingTop: 30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  searchAnimation: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  circle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  circle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  searchIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchingText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
})


