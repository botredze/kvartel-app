import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    recommendationList: {
        marginTop: 10,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        gap: 8,
    },

    recommendationText: {
        fontSize: 16,
        color: '#333',
    },
    underlineView: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '89%',
        paddingBottom: 10
    }

})
