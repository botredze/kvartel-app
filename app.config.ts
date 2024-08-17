import { ExpoConfig } from "@expo/config-types";
import { withAppDelegate, ConfigPlugin } from "expo/config-plugins";

const config: ExpoConfig = {
    name: "kvartel-app",
    slug: "kvartel-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    plugins: [
        '@config-plugins/react-native-blob-util',
        "@config-plugins/react-native-pdf",
        [
            "expo-camera",
            {
                cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
                microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
                recordAudioAndroid: true
            }
        ]
    ],
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        permissions: [
            "android.permission.CAMERA",
            "android.permission.RECORD_AUDIO"
        ],
        package: "com.baaliev.kvartelapp",
        googleServicesFile: "./android/app/google-services.json",
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    extra: {
        mapKitApiKey: "b2fe601a-73de-4f8b-ae9e-dee03b2f1e56",
        eas: {
            projectId: "6fd3f86b-7497-4ef8-9494-e25b591136b0"
        }
    }
};

const withYandexMaps: ConfigPlugin = (config) => {
    return withAppDelegate(config, async (config) => {
        const appDelegate = config.modResults;

        if (!config.extra?.mapKitApiKey) {
            throw new Error("Yandex Maps API key is missing in config.extra.mapKitApiKey");
        }

        if (!appDelegate.contents.includes("#import <YandexMapsMobile/YMKMapKitFactory.h>")) {
            appDelegate.contents = appDelegate.contents.replace(
                /#import "AppDelegate.h"/g,
                `#import "AppDelegate.h"\n#import <YandexMapsMobile/YMKMapKitFactory.h>`
            );
        }

        const mapKitMethodInvocations = `
            [YMKMapKit setApiKey:@"${config.extra.mapKitApiKey}"];
            [YMKMapKit setLocale:@"ru_RU"];
            [YMKMapKit mapKit];
        `;

        if (!appDelegate.contents.includes(mapKitMethodInvocations.trim())) {
            appDelegate.contents = appDelegate.contents.replace(
                /\s+return YES;/g,
                `\n${mapKitMethodInvocations}\nreturn YES;`
            );
        }

        return config;
    });
};

export default withYandexMaps(config);
