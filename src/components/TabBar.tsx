import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"
import { useNavigation } from "@react-navigation/native"

import images from "../constants/images"

type TabBarProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
};

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation();

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Deliveries", icon: "delivery" },
    { name: "Chat", icon: "chat" },
    { name: "Settings", icon: "settings" },
  ];

  const handlePress = (tabName: string) => {
    onTabPress(tabName);

    navigation.navigate("MainApp" as never, {
      screen: tabName as never,
    } as never);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, activeTab === tab.name && styles.activeTab]}
          onPress={() => handlePress(tab.name)}
        >
          {/* Icon with active color logic */}
          <Image
            source={images[tab.icon] as ImageSourcePropType}
            style={[
              styles.icon,
              activeTab === tab.name && { tintColor: colors.primary }, // Change icon color when active
            ]}
          />
          <Text style={[styles.tabLabel, activeTab === tab.name && styles.activeTabLabel]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.lg,
    margin: "auto",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "91%",
    marginBottom: theme.spacing.sm
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xs,
  },
  activeTab: {
    // marginTop: -30,
  },
  mainTab: {
    justifyContent: "center",
  },
  mainTabButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabLabel: {
    fontSize: theme.fontSizes.xs,
    color: colors.text.secondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
