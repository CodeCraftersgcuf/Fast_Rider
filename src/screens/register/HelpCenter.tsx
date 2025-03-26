import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../constants/colors';
import { Button } from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

import { useAuth } from '../../contexts/AuthContext';

const HelpCenter = () => {
    const { login } = useAuth();

    const navigation = useNavigation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(1); // open 2nd by default
    const faqs = [
        {
            question: 'Why do I need to pay this fee?',
            answer: 'Because, unfortunately, money doesn’t grow on trees... but it does grow on fees! 🌳💸',
        },
        {
            question: 'Is it Compulsory?',
            answer:
                'Well, imagine a party where you can’t get in unless you have the VIP pass. This fee is your VIP pass, but for deliveries. 🕺💃',
        },
    ];


    const toggleFaq = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-back" size={24} color="#000000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help Center</Text>
                    <View style={styles.headerRight} />
                </View>
                <View style={styles.content}>
                    {/* Banner */}
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>
                            Your application has been submitted and is under review, review takes 1-2 days. Kindly
                            note that upon approval you will be required to pay a one time tier fee. More details below
                        </Text>
                    </View>

                    {/* Video Placeholder */}
                    <View style={styles.videoCard}>
                        <Image
                            source={{ uri: 'https://m.atcdn.co.uk/vms/media/w980/363c3efd17d34f60a7a9dfde34f80ddc.jpg' }}
                            style={styles.videoThumbnail}
                        />
                        <View style={styles.playIcon}>
                            <Ionicons name="play-circle" size={50} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.videoCaption}>
                        Kindly watch this video to learn everything about being a rider on fast logistics
                    </Text>

                    {/* FAQ Section */}
                    <Text style={styles.faqHeader}>FAQs</Text>
                    {faqs.map((faq, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.faqItem, expandedIndex === index && styles.faqItemExpanded]}
                            activeOpacity={0.8}
                            onPress={() => toggleFaq(index)}
                        >
                            <View style={styles.faqHeaderRow}>
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                <Ionicons
                                    name={expandedIndex === index ? 'remove' : 'add'}
                                    size={20}
                                    color={colors.grey}
                                />
                            </View>
                            {expandedIndex === index && faq.answer ? (
                                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Button at the bottom */}
            <View style={styles.buttonContainer}>
                <Button title="Continue" onPress={() => login()
                } />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    scrollContent: {
        paddingVertical: 22,
        paddingBottom: 80, // Add enough space at the bottom to avoid overlap with the button
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.white,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
    },
    banner: {
        backgroundColor: '#FEEBCB',
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
    },
    bannerText: {
        color: colors.black,
        fontSize: 14,
    },
    videoCard: {
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 10,
    },
    videoThumbnail: {
        width: '100%',
        height: 180,
        borderRadius: 12,
    },
    playIcon: {
        position: 'absolute',
        top: '40%',
        left: '42%',
    },
    videoCaption: {
        fontSize: 14,
        marginBottom: 24,
        color: colors.text.secondary,
    },
    faqHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: colors.black,
    },
    faqItem: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        elevation: 1,
    },
    faqItemExpanded: {
        borderColor: colors.primary,
        borderWidth: 1,
    },
    faqHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontWeight: '500',
        fontSize: 14,
        color: colors.black,
        flex: 1,
        marginRight: 10,
    },
    faqAnswer: {
        marginTop: 10,
        color: colors.text.secondary,
        fontSize: 13,
        lineHeight: 18,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20, // Position button 20 units from the bottom
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
});

export default HelpCenter;
