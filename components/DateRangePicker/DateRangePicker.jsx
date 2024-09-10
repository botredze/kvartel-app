import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};
LocaleConfig.defaultLocale = 'ru';

const DateRangePicker = ({ onDatesChange, selectedDatesFilters, isOpenFilters, setIsOpenFilters }) => {
    const [selectedDates, setSelectedDates] = useState({
        startDate: selectedDatesFilters.startDate,
        endDate: selectedDatesFilters.endDate,
    });

    const markedDates = {
        '2024-09-01': { disabled: true, disabledTextColor: 'green', selectedColor: 'red' },
        '2024-09-15': { disabled: true, disabledTextColor: 'green' },
        ...(selectedDates.startDate && selectedDates.endDate
            ? getDatesInRange(selectedDates.startDate, selectedDates.endDate).reduce((obj, date) => {
                obj[date] = { selected: true, marked: true, color: '#613DDC'};
                return obj;
            }, {})
            : {}),
    };

    console.log(markedDates, 'markedDates')

    console.log(selectedDates, 'selectedDates')
    const onDayPress = (day) => {
        const newSelectedDates = { ...selectedDates };
        if (selectedDates.startDate && !selectedDates.endDate) {
            newSelectedDates.endDate = day.dateString;
        } else {
            newSelectedDates.startDate = day.dateString;
            newSelectedDates.endDate = undefined;
        }
        setSelectedDates(newSelectedDates);
        onDatesChange(newSelectedDates);
    };

    const handleClose = () => {
        setIsOpenFilters(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenFilters}
            onRequestClose={handleClose}
        >
            <View style={styles.modalContainer}>
                <Calendar
                    markingType={'period'}
                    current={new Date()}
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    disableAllTouchEventsForDisabledDays
                />
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>Закрыть</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    console.log(start, end)
    while (start <= end) {
        dates.push(start.toISOString().slice(0, 10));
        start.setDate(start.getDate() + 1);
    }

    return dates;
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.56)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#613DDC',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DateRangePicker;
