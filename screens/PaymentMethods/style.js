import  { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        position: "relative"
    },
    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '71%',
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center",
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '700'
    },
    addCardBtn: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingHorizontal: 5,
        paddingVertical: 15,
        width: '92%',
        alignSelf: "center",
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    addCardText: {
        fontSize: 16,
        fontWeight: '600',

    },
    plussButton: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20
    },
    payButton: {
        height: 55,
        width: '90%',
        alignSelf: "center",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    payButtonText:{
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },
    payButtonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
    }
})
