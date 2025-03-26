import type React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../constants/colors";

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradientType?: "half" | "full"; // Added prop to control gradient style
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  gradientType = "full", // Default to "full" if not provided
}) => {
  return (
    <View
      style={[
        styles.container,
        gradientType === "half" && styles.containerHalf, // Apply the conditional styles for half gradient
        style,
      ]}
    >
      {/* Gradient Background Using SVG */}
      <Svg
        height={gradientType === "half" ? "70%" : "100%"} // Switch based on gradientType prop
        width="100%"
        style={styles.svg}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={colors.gradient.start} />
            <Stop offset="100%" stopColor={colors.gradient.end} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      {/* Child Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHalf: {
    marginTop: 5,
    overflow: "hidden",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
});
