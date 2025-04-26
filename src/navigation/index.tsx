"use client"

import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { useAuth } from "../contexts/AuthContext"


// Registration Screens
import Onboard from "../screens/register/Onboard"
import Login from "../screens/register/Login"
import SignUp from "../screens/register/SignUp"
import Verify from "../screens/register/Verify"
import ChangePassword from "../screens/register/ChangePassword"
import DriverRegistration from "../screens/register/DriverRegistration"
import HelpCenter from "../screens/register/HelpCenter"


//Setting Screen
import SettingsScreen from "../screens/Settings"
import SupportScreen from "../screens/Settings/Support"
import NotificationsScreen from "../screens/Settings/Notification"
import EditProfileScreen from "../screens/Settings/EditProfile"
import FAQsScreen from "../screens/Settings/FAQs"
import WalletScreen from "../screens/Settings/Wallet"
import Verification from "../screens/Settings/Verification"
import VerificationForm from "../screens/Settings/VerificationForm"
import Tier from "../screens/Settings/Tier"

// Home Screens
import User from "../screens/Home/User"
import ActiveDeliveries from "../screens/Home/ActiveDeliveries"
import UserDetails from "../screens/Home/UserDetails"

// Ride Details Screens
import RideSummary from "../screens/SendParcel/RideDetails/RiderSummary"
import DeliveryDetails from "../screens/SendParcel/RideDetails/DeliveryDetails"
import RideDetailsMap from "../screens/SendParcel/RideDetails/RideDetailsMap"
import RidesDetails from "../screens/SendParcel/RideDetails/RidesDetails"

//Delvieries Activity;
import ParcelPaymentProcess from '../screens/Deliveries/Scheduled'

// Delivery Screens
import DeliveredHistory from "../screens/Deliveries/index"



// Send Parcel Screens
import LocationSelect from "../screens/SendParcel/LocationSelect"
import AddressSelect from "../screens/SendParcel/AddressSelect"
import MapSelect from "../screens/SendParcel/MapSelect"
import ScheduleParcel from "../screens/SendParcel/ScheduleParcel"
import SendParcel from "../screens/SendParcel/SendParcel" // Add this import
import SenderReceiverDetails from "../screens/SendParcel/SenderReceiverDetails"
import ParcelDetails from "../screens/SendParcel/ParcelDetails"
import PaymentDetails from "../screens/SendParcel/PaymentDetails"
import DeliverySummary from "../screens/SendParcel/DeliverySummary"
import SearchRidersScreen from "../screens/SendParcel/SearchRider"
import RideConfirmationScreen from "../screens/SendParcel/RideConfirmation"
import RiderBids from "../screens/SendParcel/RiderBid"
import RidesSummary from "../screens/SendParcel/RideSummary"
import RideHistory from "../screens/SendParcel/RideHistory"
import SearchRider from "../screens/SendParcel/SearchRider"
import BankTransfer from "../screens/SendParcel/BT/BankDetails"
import BankTransferPayment from '../screens/SendParcel/BT/Transfer'
// Track Parcel and Delivered

import DeliveredSummary from "../screens/SendParcel/DeliveredSummary"

// Tab Screens
import DeliveriesScreen from "../screens/Deliveries"
import ChatScreen from "../screens/Chat"
import ChatRoomScreen from "../screens/Chat/ChatRoomScreen"


import { TabBar } from "../components/TabBar"
import type { RootStackParamList, TabNavigatorParamList, SendParcelStackParamList } from "../types"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const SendParcelStack = createNativeStackNavigator<SendParcelStackParamList>()
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

function SendParcelNavigator() {

  return (
    <SendParcelStack.Navigator screenOptions={{ headerShown: false }}>
      <SendParcelStack.Screen name="SendParcel" component={SendParcel} />
      <SendParcelStack.Screen name="LocationSelect" component={LocationSelect} />
      <SendParcelStack.Screen name="AddressSelect" component={AddressSelect} />
      <SendParcelStack.Screen name="MapSelect" component={MapSelect} />
      <SendParcelStack.Screen name="ScheduleParcel" component={ScheduleParcel} />
      <SendParcelStack.Screen name="SenderReceiverDetails" component={SenderReceiverDetails} />
      <SendParcelStack.Screen name="ParcelDetails" component={ParcelDetails} />
      <SendParcelStack.Screen name="PaymentDetails" component={PaymentDetails} />
      <SendParcelStack.Screen name="DeliverySummary" component={DeliverySummary} />
      <SendParcelStack.Screen name="SearchRiders" component={SearchRidersScreen} />
      <SendParcelStack.Screen name="SearchRider" component={SearchRider} />
      <SendParcelStack.Screen name="BankTransfer" component={BankTransfer} />
      <SendParcelStack.Screen name="BankTransferPayment" component={BankTransferPayment} />
      <SendParcelStack.Screen name="RideConfirmation" component={RideConfirmationScreen} />
      <SendParcelStack.Screen name="RiderBid" component={RiderBids} />
      <SendParcelStack.Screen name="RidesSummary" component={RidesSummary} />
      <SendParcelStack.Screen name="RideHistory" component={RideHistory} />
      <SendParcelStack.Screen name="RidesDetails" component={RidesDetails} />
      <SendParcelStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen name="DeliveredSummary" component={DeliveredSummary} />
      <SendParcelStack.Screen name="Chat" component={ChatScreen} />
      <SendParcelStack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="RideSummary" component={RideSummary} />
      <Stack.Screen name="ParcelPaymentProcess" component={DeliveredHistory} />
      <Stack.Screen name="RideDetailsMap" component={RideDetailsMap} />



      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="VerificationForm" component={VerificationForm} />
      <Stack.Screen name="Tier" component={Tier} />
    </SendParcelStack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="ActiveDeliveries" component={ActiveDeliveries} />
      <Stack.Screen name="RideSummary" component={RideSummary} />
      <Stack.Screen name="DeliveryDetails"
        component={DeliveryDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })} />
    </Stack.Navigator>
  )
}
function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="VerificationForm" component={VerificationForm} />
      <Stack.Screen name="Tier" component={Tier} />
    </SettingsStack.Navigator>
  )
}
function TabNavigator({ currentRoute }: { currentRoute: string }) {
  const [activeTab, setActiveTab] = React.useState("Home")
  const [isSendParcelVisible, setIsSendParcelVisible] = React.useState(false)
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabNavigatorParamList>>()

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
    if (tabName === "Add") {
      setIsSendParcelVisible(true)
    }
  }

  React.useEffect(() => {
    if (activeTab !== "Add") {
      setIsSendParcelVisible(false)
    }
  }, [activeTab])

  const hideTabBarRoutes = [
    "EditProfileScreen",
    "Verification",
    "VerificationForm",
    "Tier",
    "SupportScreen",
    "NotificationsScreen",
    "FAQsScreen",
    "WalletScreen",
    "DeliveryDetails",
    "RidesDetails",
    "RideSummary",
    "RideDetailsMap",
    "ParcelPaymentProcess",
    "ChatRoom"
  ]

  const shouldShowTabBar = !hideTabBarRoutes.includes(currentRoute)

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // Hide default tab bar
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Deliveries" component={DeliveredHistory} />
        <Tab.Screen
          name="Add"
          component={SendParcelNavigator}
          listeners={{
            focus: () => setIsSendParcelVisible(true),
            blur: () => setIsSendParcelVisible(false),
          }}
        />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="ChatRoom" component={ChatRoomScreen} />

        <Tab.Screen name="Settings" component={SettingsNavigator} options={{ tabBarButton: () => null }} />
      </Tab.Navigator>

      {shouldShowTabBar && !isSendParcelVisible && (
        <View style={styles.tabBarContainer}>
          <TabBar
            activeTab={activeTab}
            onTabPress={handleTabPress}
            navigation={tabNavigation}
          />
        </View>
      )}
    </>
  )
}



function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={Onboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />


    </Stack.Navigator>
  )
}

export function Navigation() {
  const { isAuthenticated } = useAuth()
  const [currentRoute, setCurrentRoute] = React.useState("")

  return (
    <NavigationContainer
      onStateChange={(state) => {
        function getActiveRouteName(state: any): string {
          const route = state.routes[state.index || 0];
          if (route.state) {
            return getActiveRouteName(route.state);
          }
          return route.name;
        }

        const routeName = getActiveRouteName(state);
        setCurrentRoute(routeName);
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp">
            {() => <TabNavigator currentRoute={currentRoute} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
})