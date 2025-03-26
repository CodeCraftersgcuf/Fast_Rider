import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import images from '../../constants/images';
import { StepIndicator } from '../../components/StepIndicator';
import { SelectInput } from '../../components/SelectInput';
import { UploadInput } from "../../components/UploadInput";
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';


const TOTAL_STEPS = 3;

const VerificationForm = () => {
    const navigation = useNavigation();

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

    const handleNext = () => {
        if (step < TOTAL_STEPS - 1) {
            setStep(prev => prev + 1);
        } else {
            navigation.navigate('Add', {screen: 'Verification'});
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
                            title={step === TOTAL_STEPS - 1 ? 'Finish Registration' : 'Save and Continue'}
                            onPress={handleNext}
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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Driver Verification Form</Text>
                    <View style={styles.headerRight} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Driver Registration</Text>

                    <StepIndicator totalSteps={TOTAL_STEPS} currentStep={step} />

                    {renderStepContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    content: {
        flex: 1,
        marginHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 22,
        paddingBottom: 40,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.white,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    headerRight: {
        width: 40,
    },
    formCard: {
        padding: 10,
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

export default VerificationForm;
