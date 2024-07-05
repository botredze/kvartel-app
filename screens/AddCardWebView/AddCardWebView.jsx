import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    BackHandler,
    Platform,
    SafeAreaView as SafeAreaViewIOS,
} from "react-native";
import { WebView } from 'react-native-webview';
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context'
import {useNavigation} from "@react-navigation/native";

const COVER = 'http://bekem.kg/'

export default function AddCardWebView() {
    const webViewRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (webViewRef.current) {
                webViewRef.current.goBack();
                return true;
            }
            return false;
        });

        return () => backHandler.remove();
    }, []);

    const WebViewWrapper = ({children}) => {
        const isIOS = Platform.OS === 'ios';
        const SafeAreaView = isIOS ? SafeAreaViewIOS : SafeAreaViewAndroid;

        return (
            <SafeAreaView style={[styles.appView]}>
                {children}
            </SafeAreaView>
        )
    }

    function handleBack() {
        console.log('ХУЙХЙУ')
        navigation.navigate('PaymentMethods')
    }

    return (
        <View style={styles.container}>
            <View style={styles.sidebarContainer}>
                <TouchableOpacity style={styles.stepBackButton} onPress={() => {handleBack()}}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>

                <Text style={styles.sidebarTitle}>Добавление карты</Text>
            </View>

            <WebViewWrapper>
                <WebView
                    ref={webViewRef}
                    source={{ uri: COVER }}
                    scalesPageToFit={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    useWebKit={true}
                    allowsBackForwardNavigationGestures={false}
                    originWhitelist={["https://*"]}
                    mixedContentMode='always'
                />
            </WebViewWrapper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        //backgroundColor: '#fff',
        backgroundColor: "blue ",
        padding: 0,
        margin: 0
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '600'
    },

    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '74%',
        paddingHorizontal: 18,
        alignItems: "center",
        justifyContent: "space-between",
    },
    appView: {
        flex: 1,
    }

})
