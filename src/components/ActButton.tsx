import React from 'react'
import { View, Text, Pressable, StyleSheet, GestureResponderEvent, Image } from 'react-native'
import { icons } from '../constants/icons'
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import images from '../constants/images'

type ActButtonProps = {
    label: string
    icon: string
    onPress: (event: GestureResponderEvent) => void
}

const ActButton: React.FC<ActButtonProps> = ({ label, icon, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.buttonContainer}>
            <View style={styles.iconWrapper}>
                <Icon name={icon} size={24} color={colors.white} />
            </View>

            <View style={styles.textWrapper}>
                <Text style={styles.label}>{label}</Text>
            </View>

            <View style={styles.arrowWrapper}>
                <Image source={images.arrows} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#800080',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    iconWrapper: {
        backgroundColor: '#800080',
        padding: 12,
        borderRadius: 100,
        marginRight: 10,
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    arrowWrapper: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
    },
})

export default ActButton
