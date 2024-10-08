import {StyleSheet} from "react-native";
import {colors} from "../../../constants/constants";

 export const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#FFFFFF',
         padding: 5,
     },
     topBar: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginVertical: 20,
     },
     closeButton: {
         width: 35,
         height: 35,
         borderRadius: 20,
         backgroundColor: '#D3D3D3',
         justifyContent: 'center',
         alignItems: 'center',
     },
     headerContainer: {
         marginTop: 50,
         alignItems: 'center',
         width: '80%',
         display: 'flex',
     },
     headerText: {
         fontSize: 32,
         fontWeight: '500',
         textAlign: "center"
     },
     phoneInputContainer: {
         flexDirection: 'row',
         marginTop: 20,
         justifyContent: 'center',
         width: '80%',
     },
     countryCodeContainer: {
         flexDirection: 'row',
         alignItems: 'center',
     },
     countryCode: {
         fontSize: 24,
     },
     underline: {
         height: 1,
         backgroundColor: '#fff',
         flex: 1,
         marginLeft: 8,
         marginBottom: 4,
     },
     phoneInput: {
         borderBottomWidth: 1,
         borderBottomColor: '#fff',
         fontSize: 24,
     },
     mainContainer: {
         display: "flex",
         height: "40%",
         padding: 15,
         marginTop: 20,
         gap: 50,
         alignItems: "center",
     },

     sendCodeButton: {
         backgroundColor: colors.mainPurple,
         width: '100%',
         padding: 16,
         borderRadius: 12,
         alignItems: 'center',
     },
     sendCodeButtonText: {
         color: '#fff',
         fontSize: 18,
     },
     sendCodeButtonContainer: {
         position: 'absolute',
         bottom: 10,
         left: 20,
         right: 20,
     }


 });
