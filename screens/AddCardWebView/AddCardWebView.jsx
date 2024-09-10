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
import {useDispatch, useSelector} from "react-redux";
import {checkPaymentStatus} from "../../store/reducers/requestSlice";


export default function AddCardWebView({route}) {
    const {url} = route.params
    const dispatch = useDispatch();

    const webViewRef = useRef(null);
    const navigation = useNavigation();

    const {paymentStatusData, paymentStatus, bookingData} = useSelector((state) => state.stateSlice)

    useEffect(() => {
        if (paymentStatusData && Object.keys(paymentStatusData).length > 0){
            const interval = setInterval(() => {
                console.log(!paymentStatus, '!paymentStatus');
                if (!paymentStatus) {
                    dispatch(checkPaymentStatus({ ...paymentStatusData, bookingData }));
                } else {
                    clearInterval(interval);
                }
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [paymentStatus, paymentStatusData]);


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
        navigation.navigate('HomePage')
    }

    const handleGoHomeage = () => {
        navigation.navigate('HomePage')
    };
    return (
        <View style={styles.container}>
            <View style={styles.sidebarContainer}>
                <TouchableOpacity style={styles.stepBackButton} onPress={() => {handleBack()}}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>

                <Text style={styles.sidebarTitle}>Проведение платежа</Text>
            </View>

            <WebViewWrapper>
                <WebView
                    ref={webViewRef}
                    source={{ uri: url }}
                    scalesPageToFit={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    useWebKit={true}
                    allowsBackForwardNavigationGestures={false}
                    originWhitelist={["https://*"]}
                    mixedContentMode='always'
                />
            </WebViewWrapper>

            {paymentStatus && (
            <TouchableOpacity style={styles.getBackkButton}
            onPress={() => {handleGoHomeage()}}>
                <Text style={styles.btnBackTitle}>Вернуться в приложение</Text>
            </TouchableOpacity>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        //backgroundColor: '#fff',
        padding: 0,
        margin: 0
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '600',
    },

    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '74%',
        alignItems: "center",
        justifyContent: "center",
    },
    appView: {
        flex: 1,
    },
    getBackkButton: {
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        bottom: 20,
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        width: '90%',
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#5B21FF'
    },
    btnBackTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: '#fff'
    }

})
