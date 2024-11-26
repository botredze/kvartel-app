import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    apartmentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    dates: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    days: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#3b82f6',
    },
    statusExpired: {
        color: '#dc2626', // Красный цвет для просроченного статуса
    },
});
