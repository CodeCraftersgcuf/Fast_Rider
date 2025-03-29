

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal, ScrollView, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"
import images from "../../constants/images"
type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">
import { colors } from "../../constants/colors"

interface SettingOptionProps {
  icon: string
  title: string
  onPress: () => void
  iconColor?: string
  backgroundColor?: string
}

const SettingOption = ({
  icon,
  title,
  onPress,
  iconColor = "#800080",
  backgroundColor = "#F8E6FF",
}: SettingOptionProps) => (
  <TouchableOpacity style={styles.settingOption} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Image source={images[icon]} />
    </View>
    <Text style={styles.settingTitle}>{title}</Text>
  </TouchableOpacity>
)

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const userProfile = {
    name: "Qamardeen Malik",
    location: "Lagos, Ng",
    phone: "07033484845",
    email: "qamardeenmalik@gmail.com",
    avatar: require("../../assets/images/pp.png"),
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen")
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    // Implement logout logic here
    // navigation.navigate("Login")
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const handleSupport = () => {
    console.log("clicked support");
    navigation.navigate('SupportScreen')
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileLeftSection}>
          <Image source={userProfile.avatar} style={styles.profileAvatar} />
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileRightSection}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{userProfile.location}</Text>
            <View style={styles.triangleDown} />
          </View>

          {/* Contact Info Card */}
          <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{userProfile.phone}</Text>
            </View>


            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{userProfile.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{userProfile.phone}</Text>
        </View>
        <View style={styles.contactDivider} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{userProfile.email}</Text>
        </View>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* General Settings */}
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.settingsGrid}>
          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="wallet-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton} onPress={() => { navigation.navigate("WalletScreen") }}>
              <Text style={styles.settingButtonText}>Wallet</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="headset-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton} onPress={handleSupport}>
              <Text style={styles.settingButtonText}>Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Image source={images.tier} />
            </View>
            <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate('Tier')}>
              <Text style={styles.settingButtonText}>Tier(3)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Settings */}
        <Text style={styles.sectionTitle}>Other Settings</Text>
        <View style={styles.otherSettingsContainer}>
          <SettingOption icon="verify" title="Verification" onPress={() => { navigation.navigate('Verification'); console.log("it is clicked"); }} />
          <SettingOption icon="faq" title="FAQs" onPress={() => { navigation.navigate('FAQsScreen') }} />
          <SettingOption icon="notify" title="Notifications" onPress={() => { navigation.navigate("NotificationsScreen"); console.log("it is clicked"); }} />

        </View>

        {/* Logout and Delete Account */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton}>Tier
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.warningIconContainer}>
              <Icon name="alert-triangle" size={32} color="#FF9800" />
            </View>

            <Text style={styles.modalTitle}>Are you sure you want to logout</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelLogout}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.proceedButton]} onPress={confirmLogout}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",

  },
  profileHeader: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  profileLeftSection: {
    alignItems: "center",
    marginRight: 16,
  },
  profileRightSection: {
    flex: 1,

  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: colors.white,
    marginRight: 4,
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },
  editProfileButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  editProfileText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "500",
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 8,
    color: colors.white,
  },
  contactDivider: {
    width: 1,
    backgroundColor: colors.white,
    opacity: 0.3,
    marginHorizontal: 16,
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 16,
    marginBottom: 16,
  },
  settingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  settingCard: {
    width: "31%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
  },
  settingIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  settingButton: {
    backgroundColor: "#800080",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  settingButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  otherSettingsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 14,
    color: "#000000",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  deleteAccountButton: {
    alignItems: "center",
    marginBottom: 80,
  },
  deleteAccountText: {
    fontSize: 16,
    color: "#000000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  warningIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  proceedButton: {
    backgroundColor: "#800080",
    marginLeft: 8,
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

