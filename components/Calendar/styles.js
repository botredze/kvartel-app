import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    calendarContainer: {
        flexDirection: 'row',
        height: 100
    },
    monthContainer: {
        width: 300,
        padding: 10,
        flexDirection: 'row',
        gap: 20
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayContainer: {
        width: 50,
        height: 90,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    dateContainer: {
        width: 45,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 17,
        borderColor: "#9C9C9C"
    },
    weekDay: {
        fontSize: 16,
        color: 'gray',
    },

    weekDaySelected: {
        fontSize: 16,
        color: '#6B57F5',
    },
    dateText: {
        fontSize: 16,
    },
    inactiveDate: {
        opacity: 0.3,
    },
    selectedDate: {
        backgroundColor: '#6B57F5',
        borderColor: '#6B57F5',
    },

    diagonalLine: {
        position: 'absolute',
        width: '80%',
        height: 2,
        backgroundColor: '#9C9C9C',
        transform: [{ rotate: '45deg' }],
        top: '50%',
    },

    selectedDateText: {
        color: 'white',
    },

    betweenDates: {
        borderWidth: 0,
        borderColor: '#B6A1FE',
    },
    connector: {
        position: 'absolute',
        top: 36,
        left: 17,
        height: 50,
        borderRadius: 17,
        width: 100,
        backgroundColor: '#B6A1FE',
    },
    placeholder: {
        width: 40,
        height: 60,
        margin: 5,
    },
    monthText: {
        fontSize: 18,
        fontWeight: '600'
    }
});
