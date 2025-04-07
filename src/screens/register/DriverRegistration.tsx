import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from './../../components/BackgroundGradient';
import { FormInput } from './../../components/FormInput';
import { Button } from './../../components/Button';
import { colors } from './../../constants/colors';
import { StepIndicator } from '../../components/StepIndicator';
import { SelectInput } from '../../components/SelectInput';
import { UploadInput } from "../../components/UploadInput";
import images from '../../constants/images';
import * as ImagePicker from 'expo-image-picker';


//Code related to the integration
import { riderVerification1, riderVerification2, riderVerification3 } from './../../utils/mutations/authMutations';
import { useMutation } from '@tanstack/react-query';
import Toast from "react-native-toast-message";
import { getFromStorage } from "../../utils/storage";


const TOTAL_STEPS = 3;

const DriverRegistration = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState<string | null>(null); // State to hold the token

    const [step, setStep] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [nin, setNin] = useState('');


    const [vehicleType, setVehicleType] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [permitNumber, setPermitNumber] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');


    const [passportUri, setPassportUri] = useState('');
    const [permitUri, setPermitUri] = useState('');
    const [vehicleVideoUri, setVehicleVideoUri] = useState('');

    // Fetch the token and user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };

        fetchUserData();
    }, []);

    const handleNext = () => {
        if (step === 0) {
            submitStep1({
                first_name: firstName,
                last_name: lastName,
                email_address: email,
                phone,
                address,
                nin_number: nin,
            });
        } else if (step === 1) {
            submitStep2({
                vehicle_type: vehicleType,
                plate_number: plateNumber,
                riders_permit_number: permitNumber,
                color: vehicleColor,
            });
        } else if (step === 2) {
            // Convert URIs to File objects for upload
            const uriToFile = (uri: string, name: string, type: string): any => {
                return {
                    uri,
                    name,
                    type,
                };
            };

            submitStep3({
                passport_photo: passportUri ? uriToFile(passportUri, "passport.jpg", "image/jpeg") : null,
                rider_permit_upload: permitUri ? uriToFile(permitUri, "permit.jpg", "image/jpeg") : null,
                vehicle_video: vehicleVideoUri ? uriToFile(vehicleVideoUri, "video.mp4", "video/mp4") : null,
            });
        }
    };

    const pickDocument = async (
        type: 'image' | 'video',
        setter: (uri: string) => void
    ) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:
                type === 'image'
                    ? ImagePicker.MediaTypeOptions.Images
                    : ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setter(result.assets[0].uri);
        }
    };

    //Code related to the Mutation
    // Step 1: Personal Info
    const { mutate: submitStep1, isPending: isSubmittingStep1 } = useMutation({
        mutationFn: (data: any) => riderVerification1({ data, token }),
        onSuccess: (response) => {
            console.log("✅ Step 1 Response:", response);
            Toast.show({
                type: "success",
                text1: "Step 1 Completed",
            });
            setStep(1);
        },
        onError: () => {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: "Please check your details and try again",
            });
        },
    });

    // Step 2: Vehicle Info
    const { mutate: submitStep2, isPending: isSubmittingStep2 } = useMutation({
        mutationFn: (data: any) => riderVerification2({ data, token }),
        onSuccess: (response) => {
            console.log("✅ Step 2 Response:", response);
            Toast.show({
                type: "success",
                text1: "Step 2 Completed",
            });
            setStep(2);
        },
        onError: () => {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: "Please check your vehicle info and try again",
            });
        },
    });

    // Step 3: Upload Documents
    const { mutate: submitStep3, isPending: isSubmittingStep3 } = useMutation({
        mutationFn: (files: any) => riderVerification3({ files, token }),
        onSuccess: (response) => {
            console.log("✅ Step 3 Response:", response);
            Toast.show({
                type: "success",
                text1: "Documents Submitted",
            });
            navigation.navigate("HelpCenter" as never);
        },
        onError: () => {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: "Error uploading documents",
            });
        },
    });

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Personal Information</Text>
                            <TouchableOpacity>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <FormInput
                            label="First Name"
                            placeholder="Enter first name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <FormInput
                            label="Last Name"
                            placeholder="Enter last name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <FormInput
                            label="Email Address"
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <FormInput
                            label="Phone Number"
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <FormInput
                            label="Address"
                            placeholder="Enter residential address"
                            value={address}
                            onChangeText={setAddress}
                        />

                        <FormInput
                            label="NIN Number"
                            placeholder="Enter NIN number"
                            keyboardType="numeric"
                            value={nin}
                            onChangeText={setNin}
                        />
                        <Button
                            title={
                                step === 0
                                    ? isSubmittingStep1
                                        ? "Submitting..."
                                        : "Save and Continue"
                                    : step === 1
                                        ? isSubmittingStep2
                                            ? "Submitting..."
                                            : "Save and Continue"
                                        : isSubmittingStep3
                                            ? "Uploading..."
                                            : "Finish Registration"
                            }
                            onPress={handleNext}
                            disabled={
                                (step === 0 && isSubmittingStep1) ||
                                (step === 1 && isSubmittingStep2) ||
                                (step === 2 && isSubmittingStep3)
                            }
                        />

                    </View>
                );
            case 1:
                return (
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Vehicle Information</Text>
                            <TouchableOpacity>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                backgroundColor: '#FEEBCB',
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 16,
                                flexDirection: 'row',
                                flexWrap: 'wrap',  // Allow the content to wrap instead of overflowing
                                alignItems: 'center' // Optional: Ensures proper vertical alignment of items
                            }}
                        >
                            <View style={{ marginRight: 12 }}>
                                <Image source={images.rider_note} />
                            </View>
                            <View style={{ flex: 1 }}>  {/* Ensure text takes available space */}
                                <Text style={{ color: colors.black }}>
                                    Kindly note that only two-wheeled vehicles are accepted for now. Of those, we only accept motorcycles, with support for others coming soon.
                                </Text>
                            </View>
                        </View>

                        <SelectInput
                            label="Vehicle Type"
                            title="Vehicle Type"
                            selectedValue={vehicleType}
                            placeholder="Choose vehicle type"
                            data={['Motorcycle']}
                            onSelect={setVehicleType}
                            showColor={false}
                        />

                        <FormInput
                            label="Plate number"
                            placeholder="Enter plate number"
                            value={plateNumber}
                            onChangeText={setPlateNumber}
                        />

                        <FormInput
                            label="Riders Permit Number"
                            placeholder="Enter riders permit number"
                            value={permitNumber}
                            onChangeText={setPermitNumber}
                        />

                        <SelectInput
                            label="Color"
                            title="Vehicle Color"
                            selectedValue={vehicleColor}
                            placeholder="Choose vehicle color"
                            data={['Black', 'White', 'Red', 'Blue', 'Gray']}
                            onSelect={setVehicleColor}
                            showColor={true}

                        />

                        <Button title="Save and Continue" onPress={handleNext} />
                    </View>
                );

            case 2:
                return (
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Documents Upload</Text>
                            <TouchableOpacity>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <UploadInput
                            label="Passport Upload"
                            placeholder="Upload a clear photo of yourself"
                            value={passportUri}
                            onPress={() => pickDocument('image', setPassportUri)}
                        />

                        <UploadInput
                            label="Riders Permit Upload"
                            placeholder="Upload a clear photo of your riders permit"
                            value={permitUri}
                            onPress={() => pickDocument('image', setPermitUri)}
                        />

                        <UploadInput
                            label="Vehicle Video Upload"
                            placeholder="Upload at most a 1 minute video of you recording every part of your vehicle"
                            value={vehicleVideoUri}
                            onPress={() => pickDocument('video', setVehicleVideoUri)}
                        />

                        <Button title="Save and Continue" onPress={handleNext} />
                    </View>
                );

            default:
                return (
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Personal Information</Text>
                            <TouchableOpacity>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <FormInput
                            label="First Name"
                            placeholder="Enter first name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <FormInput
                            label="Last Name"
                            placeholder="Enter last name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <FormInput
                            label="Email Address"
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <FormInput
                            label="Phone Number"
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <FormInput
                            label="Address"
                            placeholder="Enter residential address"
                            value={address}
                            onChangeText={setAddress}
                        />

                        <FormInput
                            label="NIN Number"
                            placeholder="Enter NIN number"
                            keyboardType="numeric"
                            value={nin}
                            onChangeText={setNin}
                        />

                        <Button
                            title={step === TOTAL_STEPS - 1 ? 'Finish Registration' : 'Save and Continue'}
                            onPress={handleNext}
                        />
                    </View>
                );
        }
    };

    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Driver Registration</Text>

                        <StepIndicator totalSteps={TOTAL_STEPS} currentStep={step} />

                        {renderStepContent()}
                    </View>
                    <Toast />
                </ScrollView>
            </SafeAreaView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 30,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 30,
        textAlign: 'left',
    },
    formCard: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.black,
    },
    skipText: {
        fontSize: 14,
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});

export default DriverRegistration;
