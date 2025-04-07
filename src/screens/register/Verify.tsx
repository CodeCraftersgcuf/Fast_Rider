import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GradientBackground } from "./../../components/BackgroundGradient";
import { CodeInput } from "./../../components/CodeInput";
import { Button } from "./../../components/Button";
import { colors } from "./../../constants/colors";

import { verifyEmailOTP, resendOtp } from "./../../utils/mutations/authMutations";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native"; // 👈 to get params

const Verify = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email: string }; // 👈 get email from route

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // ✅ Mutation for Email Verification
  const { mutate: mutateVerify, isPending } = useMutation({
    mutationFn: (data: { otp: string; email: string }) => verifyEmailOTP(data),

    onSuccess: (response) => {
      console.log("✅ OTP Verified:", response);

      Toast.show({
        type: "success",
        text1: "Verification Successful",
        text2: "Welcome! Let's finish registration.",
      });

    navigation.navigate("DriverRegistration" as never);
    },

    onError: (error) => {
      console.error("❌ OTP Verification Failed:", error);

      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: "Invalid code or expired OTP.",
      });
    },
  });

  // ✅ Handle code entry
  const handleCodeComplete = (code: string) => {
    console.log("Code entered:", code);

    mutateVerify({ otp: code, email }); // 👈 pass OTP and email
  };

  const { mutate: mutateResendOtp, isPending: isResending } = useMutation({
    mutationFn: () => resendOtp({ data: { email } }),


    onSuccess: (response) => {
      console.log("✅ OTP Resent:", response);
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: "A new verification code has been sent to your email.",
      });
      setTimeLeft(59); // ⏳ Restart timer
    },

    onError: () => {
      Toast.show({
        type: "error",
        text1: "Resend Failed",
        text2: "Something went wrong. Try again shortly.",
      });
    },
  });

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Verify</Text>
          <Text style={styles.subtitle}>
            Verify your phone number by entering the 6-digit code
          </Text>

          <View style={styles.form}>
            <View style={styles.headerRow}>
              <Text style={styles.enterCodeText}>Enter Code</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>
            </View>

            <CodeInput
              length={6}
              onCodeComplete={handleCodeComplete}
              allowBackspace={true}
            />

            <Button
              title={isPending ? "Verifying..." : "Proceed"}
              onPress={() => { }} // 👈 do nothing, auto proceed after verify
              disabled={isPending}
            />

            {timeLeft > 0 ? (
              <Text style={styles.timerText}>
                Code will be resent in{" "}
                <Text style={styles.timer}>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </Text>{" "}
                sec
              </Text>
            ) : (
              <TouchableOpacity onPress={() => mutateResendOtp()} disabled={isResending}>
                <Text style={[styles.timerText, { color: "#007bff" }]}>
                  {isResending ? "Resending..." : "Didn't get code? Tap to resend"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Toast />
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
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightgrey,
    opacity: 0.8,
    marginBottom: 20,
  },
  form: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
    height: "80%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  enterCodeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },

  goBack: {
    alignSelf: "flex-end",
  },
  goBackText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  timerText: {
    textAlign: "center",
    color: colors.text.secondary,
  },
  timer: {
    color: colors.primary,
  },
});

export default Verify;
