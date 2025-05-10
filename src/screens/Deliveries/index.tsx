

"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"

// Import the tab screens
import ScheduledDeliveries from "./Scheduled"
import ActiveDeliveries from "./Active"
import DeliveredDeliveries from "./Delivered"
import Loader from "../../components/Loader"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { DeliveriesStackParamList } from "../../types/navigation"

type DeliveryHistoryNavigationProp = NativeStackNavigationProp<DeliveriesStackParamList, "DeliveryMain">


//Code Realted to the integration
import { useQuery } from "@tanstack/react-query"
import { getFromStorage } from "../../utils/storage"
import { getRiderDeiliveryHistory } from "../../utils/queries/accountQueries"


interface DeliveryItem {
  id: number | string;
  status: "Delivered" | "In transit" | "Picked up" | "Order" | "ordered";
  fromAddress: string;
  toAddress: string;
  orderTime: string;
  deliveryTime: string;
  amount: number;
  paymentMethod: string;
  senderAddress: string;
  receiverAddress: string;
  rider: {
    name: string;
    avatar: any;
    rating: number;
  };
}


const DeliveryHistory = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation<DeliveryHistoryNavigationProp>()

  const [activeTab, setActiveTab] = useState<"Active" | "Delivered">("Active")

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };
    fetchToken();
  }, []);

  const { data: historyData, isLoading } = useQuery({
    queryKey: ["riderHistory", token],
    queryFn: () => getRiderDeiliveryHistory(token!),
    enabled: !!token,
  });

  const dummyRider = {
    name: "Maleek Oladimeji",
    avatar: require("../../assets/images/pp.png"),
    rating: 5,
  };

  const deliveriesData: DeliveryItem[] = historyData?.data?.active?.map((item: any) => ({
    id: item.id,
    status: item.status === "ordered" ? "Order" : item.status,
    fromAddress: item.sender_address,
    toAddress: item.receiver_address,
    senderAddress: item.sender_address,
    receiverAddress: item.receiver_address,
    orderTime: new Date(item.ordered_at || item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    deliveryTime: item.deliveryTime || "Unknown",
    amount: parseFloat(item.amount),
    paymentMethod: item.payment_method,
    rider: dummyRider,
  })) || [];

  const deliveredData: DeliveryItem[] = historyData?.data?.delivered?.map((item: any) => ({
    id: item.id,
    status: "Delivered",
    fromAddress: item.sender_address,
    toAddress: item.receiver_address,
    senderAddress: item.sender_address,
    receiverAddress: item.receiver_address,
    orderTime: new Date(item.ordered_at || item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    deliveryTime: item.deliveryTime || "Unknown",
    amount: parseFloat(item.amount),
    paymentMethod: item.payment_method,
    rider: dummyRider,
  })) || [];


  const renderTabContent = () => {
    if (isLoading) return <Loader />;

    if (activeTab === "Active") {
      if (deliveriesData.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active deliveries found.</Text>
          </View>
        );
      }
      return <ActiveDeliveries deliveries={deliveriesData} />;
    }

    if (activeTab === "Delivered") {
      if (deliveredData.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No delivered orders found.</Text>
          </View>
        );
      }
      return <DeliveredDeliveries deliveries={deliveredData} />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Text style={[styles.tabText, activeTab === "Active" && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Delivered" && styles.activeTab]}
          onPress={() => setActiveTab("Delivered")}
        >
          <Text style={[styles.tabText, activeTab === "Delivered" && styles.activeTabText]}>Delivered</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom: 90,
    zIndex: 999
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
})

export default DeliveryHistory

