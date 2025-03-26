import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import Icon from "react-native-vector-icons/Ionicons"
import images from '../constants/images'

interface RiderRequestPopupProps {
    name: string
    avatar: string
    rating: number
    price: string
    senderAddress: string
    receiverAddress: string
    eta: string
    deliveryTime: string
    onSendBid: () => void
    onAccept: () => void
}

export const RiderRequestPopup: React.FC<RiderRequestPopupProps> = ({
    name,
    avatar,
    rating,
    price,
    senderAddress,
    receiverAddress,
    eta,
    deliveryTime,
    onSendBid,
    onAccept,
}) => {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.profileInfo}>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.stars}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Ionicons
                                    key={i}
                                    name={i < rating ? 'star' : 'star-outline'}
                                    size={16}
                                    color={colors.primary}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₦ {price}</Text>
                </View>
            </View>

            {/* Address */}
            <View style={styles.addressCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, }}>
                    <Image source={images.send_bid} />
                    <Text style={styles.addressLabel}>Sender Address</Text>
                </View>
                <Text style={styles.addressText}>{senderAddress}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5, }}>
                    <Image source={images.receive_bid} />
                    <Text style={styles.addressLabel}>Receiver Address</Text>
                </View>
                <Text style={styles.addressText}>{receiverAddress}</Text>
            </View>

            {/* Meta Info */}
            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={18} color={colors.black} />
                    <Text style={styles.metaText}>{eta} away</Text>
                </View>
                <View style={styles.metaItem}>
                    <Ionicons name="bicycle-outline" size={18} color={colors.black} />
                    <Text style={styles.metaText}>{deliveryTime} delivery</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.sendBidBtn} onPress={onSendBid}>
                    <Text style={styles.sendBidText}>Send Bid</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
                    <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 2,
    },
    stars: {
        flexDirection: 'row',
    },
    priceContainer: {
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    price: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    addressCard: {
        borderRadius: 12,
        padding: 12,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'dotted', // This will work on Android only
    }
    ,
    addressLabel: {
        fontSize: 12,
        color: 'gray',
    },
    addressText: {
        fontSize: 14,
        color: colors.black,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
        color: colors.black,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    sendBidBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    sendBidText: {
        color: colors.primary,
        fontWeight: '500',
    },
    acceptBtn: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    acceptText: {
        color: colors.white,
        fontWeight: '500',
    },
});
