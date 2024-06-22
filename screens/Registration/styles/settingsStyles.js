import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        flex: 1,
        alignItems: 'flex-start',
    },
    closeButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    headerText: {
        flex: 2,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        color: 'gray',
        textTransform: 'uppercase',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 8,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: 'purple',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        margin: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
