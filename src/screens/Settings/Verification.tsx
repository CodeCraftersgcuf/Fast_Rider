import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Verification = () => {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1);

  const faqs = [
    {
      question: 'Why do I need to pay this fee',
      answer:
        'This fee serves as an insurance policy, as you will only be able to take deliveries of goods worth your tier system',
    },
    {
      question: 'Is it Compulsory',
      answer:
        'This fee serves as an insurance policy, as you will only be able to take deliveries of goods worth your tier system',
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
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
          <Text style={styles.headerTitle}>Verification</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.tierButton}>
            <Text style={styles.tierText}>Tier System</Text>
          </TouchableOpacity>

          <View style={styles.verificationCard}>
            <Text style={styles.verificationText}>
              You are yet complete your verification, in order to start taking ride
              requests
            </Text>
            <TouchableOpacity style={styles.verifyButton} onPress={()=> navigation.navigate("Add", { screen: "VerificationForm" })}>
              <Text style={styles.verifyButtonText}>Complete Verification</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.faqHeader}>FAQs</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.faqItem, expandedIndex === index && styles.faqItemExpanded]}
              activeOpacity={0.8}
              onPress={() => toggleFaq(index)}>
              <View style={styles.faqHeaderRow}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedIndex === index ? 'remove' : 'add'}
                  size={20}
                  color={colors.grey}
                />
              </View>
              {expandedIndex === index && faq.answer && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
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
  scrollContent: {
    paddingVertical: 22,
    paddingBottom: 40,
    marginTop:20,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  tierButton: {
    backgroundColor: '#D09BDF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  tierText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  verificationCard: {
    backgroundColor: '#F3D7F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  verificationText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  faqHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
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
});

export default Verification;
