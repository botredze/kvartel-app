import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import {useSelector} from "react-redux";

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

    const getDisabledDatesInRange = (startDate, endDate) => {
        const parseDate = (dateString) => new Date(dateString);

        const isValidDate = (date) => {
            return !isNaN(date.getTime());
        };

        const start = parseDate(startDate);
        const end = parseDate(endDate);

        if (!isValidDate(start) || !isValidDate(end)) {
            console.error("Invalid date format. Expected format is ISO.");
            return [];
        }

        const today = new Date().toDateString();
        const dateArray = [];
        let currentDate = start;

        if (start.getTime() === end.getTime() && start.toDateString() === today) {
            return dateArray;
        }

        while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            dateArray.push(formattedDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    };


    const { apartmentDetail} = useSelector((state) => state.requestSlice);

    const getDisabledDatesBeforeToday = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const start = new Date('1970-01-01');
        const disabledDates = {};

        let currentDate = start;
        while (currentDate <= today) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            disabledDates[formattedDate] = { disabled: true, disabledTextColor: 'gray' };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return disabledDates;
    };

    const parseMultipleDateRanges = (dateRangeStr) => {
        const dateRanges = dateRangeStr.split(',').map(date => date.trim());
        return {
            startDate: dateRanges[0],
            endDate: dateRanges[1]
        };
    };

    const markedDates = {
        disableTouchEvent: true,
        ...getDisabledDatesBeforeToday(),

        ...(apartmentDetail.date_from && apartmentDetail.date_to
            ? apartmentDetail.date_from.split(',').map(date => date.trim()).reduce((obj, dateFrom, index) => {
                const dateTo = apartmentDetail.date_to.split(',').map(date => date.trim())[index];

                if (dateFrom && dateTo && dateFrom !== dateTo) {
                    return {
                        ...obj,
                        ...getDisabledDatesInRange(dateFrom, dateTo).reduce((disabledObj, date) => {
                            disabledObj[date] = { disabled: true, disabledTextColor: 'gray' };
                            return disabledObj;
                        }, {})
                    };
                }

                return obj;
            }, {})
            : {}),

        ...(selectedDates.startDate && selectedDates.endDate
            ? getDatesInRange(selectedDates.startDate, selectedDates.endDate).reduce((obj, date) => {
                obj[date] = { selected: true, marked: true, color: '#613DDC' };
                return obj;
            }, {})
            : {}),
    };


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
                    disableAllTouchEventsForInactiveDays={true}
                    onDayPress={onDayPress}
                    markedDates={markedDates}
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
