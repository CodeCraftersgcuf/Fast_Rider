"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import images from "../../constants/images"




export default function Tier() {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(25000)


    const handleWithdraw = () => {
        console.log("Clicked");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Icon name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Icon name="notifications" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>₦ {balance.toLocaleString()}</Text>
            </View>

            <View style={styles.actionsContainer}>

                <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
                    <Image source={images.pause} />
                    <Text style={styles.actionText}>Pause Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
                    <Image source={images.down_arrow} />
                    <Text style={styles.actionText}>Withdraw</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                    You should only request withdrawal if you intend to close your account. Note that once you
                    withdraw, you will not be able to take ride requests until you choose a tier again.
                </Text>
            </View>

            <Text style={styles.chooseTierText}>Choose a tier</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tierScroll}
            >
                {[1, 2, 3].map((tier, index) => (
                    <View key={index} style={styles.tierCard}>
                        <View style={styles.tierHeader}>
                            <Text style={styles.tierTitle}>TIER {tier}</Text>
                            <Text style={styles.tierPrice}>
                                {tier === 1 ? "₦ 50,000" : tier === 2 ? "₦100,000" : "₦150,000"}
                            </Text>
                        </View>

                        <View style={styles.benefitList}>
                            {["Benefit 1", "Benefit 2", "Benefit 3"].map((benefit, i) => (
                                <View key={i} style={styles.benefitItem}>
                                    <Icon name="checkmark-circle" size={16} color="white" />
                                    <Text style={styles.benefitText}>{benefit}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={() =>
                                navigation.navigate("Add", {
                                    screen: "BankTransferPayment",
                                    params: {
                                        tier: {
                                            id: 1,
                                            title: `TIER ${tier}`,
                                            amount: tier === 1 ? 50000 : tier === 2 ? 100000 : 150000,
                                        },
                                    },
                                })
                            }
                        >
                            <Text style={styles.payButtonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: "#800080",
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerRight: {
        flexDirection: "row",
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
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: "#800080",
        alignItems: "center",
    },
    balanceLabel: {
        fontSize: 16,
        color: "#FFFFFF",
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    actionsContainer: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: -20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    actionText: {
        fontSize: 16,
        color: "#800080",
        fontWeight: "500",
        marginLeft: 8,
    },
    warningBox: {
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: "#FCE8E8",
        borderColor: "#FF4D4F",
        borderWidth: 1,
        padding: 14,
        borderRadius: 12,
    },
    warningText: {
        color: "#000",
        fontSize: 13,
        lineHeight: 18,
    },
    chooseTierText: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 24,
        marginBottom: 10,
        marginLeft: 16,
    },
    tierScroll: {
        paddingHorizontal: 16,
    },
    tierCard: {
        backgroundColor: "#800080",
        borderRadius: 14,
        padding: 14,
        width: 200,
        height: 250,
        marginRight: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tierHeader: {
        backgroundColor: "white",
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10,
    },
    tierTitle: {
        color: "#800080",
        fontWeight: "700",
        fontSize: 14,
        textAlign: "center",
    },
    tierPrice: {
        color: "#000",
        fontWeight: "700",
        fontSize: 15,
        textAlign: "center",
        marginTop: 6,
    },
    benefitList: {
        paddingHorizontal: 6,
    },
    benefitItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    benefitText: {
        color: "white",
        marginLeft: 8,
        fontSize: 13,
    },
    payButton: {
        marginTop: 12,
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderRadius: 8,
    },
    payButtonText: {
        textAlign: "center",
        color: "#800080",
        fontWeight: "600",
        fontSize: 14,
    },

})