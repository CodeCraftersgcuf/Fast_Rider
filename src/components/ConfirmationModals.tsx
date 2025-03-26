import React from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Animated,
    StyleSheet
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"

interface ConfirmationModalsProps {
    showConfirmationModal: boolean
    setShowConfirmationModal: (val: boolean) => void
    confirmationCode: string
    setConfirmationCode: (code: string) => void
    handleConfirmCode: () => void
    cursorOpacity: Animated.Value
    showPaymentConfirmation: boolean
    handleConfirmationClose: () => void
    codeConfirmation: boolean
    handleDummy: () => void
    handleRetype: () => void
}

const ConfirmationModals: React.FC<ConfirmationModalsProps> = ({
    showConfirmationModal,
    setShowConfirmationModal,
    confirmationCode,
    setConfirmationCode,
    handleConfirmCode,
    cursorOpacity,
    showPaymentConfirmation,
    handleConfirmationClose,
    codeConfirmation,
    handleDummy,
    handleRetype,
}) => {
    return (
        <>
            {/* Confirmation Code Modal */}
            <Modal visible={showConfirmationModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmationModal}>
                        <View style={styles.confirmationModalHeader}>
                            <Text style={styles.confirmationModalTitle}>Confirmation Code</Text>
                            <TouchableOpacity onPress={() => setShowConfirmationModal(false)} style={styles.closeModalButton}>
                                <Icon name="close" size={24} color="#000000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.codeInputContainer}>
                            <TextInput
                                style={styles.codeInput}
                                value={confirmationCode}
                                onChangeText={setConfirmationCode}
                                keyboardType="number-pad"
                                maxLength={4}
                                autoFocus
                                caretHidden={confirmationCode.length > 0}
                            />
                            {confirmationCode.length === 0 && (
                                <Animated.View style={[styles.codeCursor, { opacity: cursorOpacity }]} />
                            )}
                        </View>

                        <Text style={styles.codeInputLabel}>Input code from Rider</Text>

                        <TouchableOpacity
                            style={[styles.continueButton, confirmationCode.length === 0 && styles.disabledButton]}
                            onPress={handleConfirmCode}
                            disabled={confirmationCode.length === 0}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Payment Confirmation Modal */}
            <Modal
                visible={showPaymentConfirmation}
                transparent={true}
                animationType="fade"
                onRequestClose={handleConfirmationClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmationModal}>
                        <TouchableOpacity
                            style={styles.confirmationCloseButton}
                            onPress={handleConfirmationClose}
                        >
                            <Icon name="close" size={24} color="#000000" />
                        </TouchableOpacity>

                        <Text style={styles.confirmationTitle}>Code Confirmation</Text>

                        <View style={styles.confirmationIconContainer}>
                            <View style={[
                                styles.confirmationIconOuter,
                                codeConfirmation ? styles.successIconOuter : styles.errorIconOuter
                            ]}>
                                <View style={[
                                    styles.confirmationIconInner,
                                    codeConfirmation ? styles.successIconInner : styles.errorIconInner
                                ]}>
                                    <Icon
                                        name={codeConfirmation ? "checkmark" : "close"}
                                        size={40}
                                        color="#FFFFFF"
                                    />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.confirmationText}>
                            {codeConfirmation ? "Code accepted successfully" : "Code does not match"}
                        </Text>

                        {!codeConfirmation && (
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ width: "48%" }}>
                                    <TouchableOpacity
                                        style={[styles.supportButton, confirmationCode.length === 0 && styles.disabledButton]}
                                        onPress={handleDummy}
                                    >
                                        <Text style={styles.supportButtonText}>Support</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: "48%", marginLeft: 12 }}>
                                    <TouchableOpacity
                                        style={[styles.continueButton, confirmationCode.length === 0 && styles.disabledButton]}
                                        onPress={handleRetype}
                                    >
                                        <Text style={styles.continueButtonText}>Retype Code</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 200, // Add space at the bottom for the keyboard
    },
    confirmationModal: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginTop: 200,
        zIndex: 1000

    },
    confirmationModalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    confirmationModalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
    },
    closeModalButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    codeInputContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        height: 60,
        flexDirection: "row",
    },
    codeInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    codeInput: {
        fontSize: 36,
        fontWeight: "600",
        color: "#000000",
        textAlign: "center",
        minWidth: 40,
        padding: 0,
    },
    codeCursor: {
        width: 2,
        height: 36,
        backgroundColor: "#000000",
        position: "absolute",
        left: "50%",
    },
    codeInputLabel: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        marginBottom: 24,
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
    supportButton: {
        backgroundColor: colors.grey,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
    },
   
    supportButtonText: {
        color: colors.black,
        backgroundColor: colors.grey
    },
    disabledButton: {
        backgroundColor: "#CCCCCC",
    },

    deliveryFeeModal: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
    },
    deliveryFeeContent: {
        alignItems: "center",
        paddingVertical: 24,
    },
    logoContainer: {
        marginBottom: 16,
    },
    logoCircleOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#F8E6FF",
        alignItems: "center",
        justifyContent: "center",
    },
    logoCircleInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
    },
    deliveryFeeDescription: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    deliveryFeeAmount: {
        fontSize: 36,
        fontWeight: "700",
        color: "#000000",
    },
    deliveryFeeActions: {
        flexDirection: "row",
        marginTop: 24,
    },
    deliverNowButton: {
        flex: 1,
        backgroundColor: "#800080",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginRight: 8,
    },
    deliverNowButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
    scheduleButton: {
        width: 56,
        height: 56,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
    },
    bankDetailsContainer: {
        flex: 1,
        padding: 16,
    },
    bankDetailsCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    bankDetailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    bankDetailLabel: {
        fontSize: 14,
        color: "#666666",
    },
    bankDetailValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
    },
    accountNumberContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF8E1",
        padding: 12,
        borderRadius: 8,
    },
    warningText: {
        fontSize: 12,
        color: "#FF9800",
        marginLeft: 8,
    },
    paymentMadeButton: {
        backgroundColor: "#800080",
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        height: 56,
    },
    paymentMadeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    confirmationCloseButton: {
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1,
    },
    confirmationTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
        marginBottom: 24,
        alignItems: 'center',
        alignSelf: 'center',
    },
    confirmationIconContainer: {
        marginVertical: 24,
        alignItems: 'center',

    },
    confirmationIconOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    successIconOuter: {
        backgroundColor: "#E6F7E9",
    },
    errorIconOuter: {
        backgroundColor: "#FFEBEE",
    },
    confirmationIconInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    successIconInner: {
        backgroundColor: "#00A651",

    },
    errorIconInner: {
        backgroundColor: "#FF0000",
    },
    confirmationText: {
        fontSize: 14,
        color: "#333333",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 16,
        fontWeight: 'bold',
    },
});
export default ConfirmationModals
