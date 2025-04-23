import 'dotenv/config';

export default {
  expo: {
    name: "Logistics Rider",
    slug: "logistics-rider",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#9C27B0"
    },
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.deliveryapp"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#9C27B0"
      },
      package: "com.yourcompany.deliveryapp",
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    extra: {
      eas: {
        projectId: "ffa72faa-9974-4972-927e-ba54ff78ae8c"
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  }
};
