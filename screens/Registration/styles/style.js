import {StyleSheet} from "react-native";

 export const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#FFFFFF',
         padding: 16,
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
         fontWeight: 'bold',
         textAlign: "center"
     },
     phoneInputContainer: {
         flexDirection: 'row',
         marginTop: 20,
         alignItems: 'center',
         justifyContent: 'center',
         width: '80%',
     },
     countryCode: {
         fontSize: 24,
         marginRight: 8,
         textDecorationLine: 'underline',
         textDecorationColor: 'purple',
     },

     phoneInput: {
         borderBottomWidth: 1,
         borderBottomColor: '#000',
         fontSize: 24,
         flex: 1,
         textAlign: 'center',
     },
     mainContainer: {
         display: "flex",
         height: "40%",
         padding: 15,
         marginTop: 50,
         gap: 50,
         alignItems: "center",
     }

 });
