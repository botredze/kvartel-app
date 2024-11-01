import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { styles } from './styles';
import isBetween from "dayjs/plugin/isBetween";
import {useSelector} from "react-redux";

dayjs.locale('ru');
dayjs.extend(isBetween);


export default function Calendar({ onDateSelect }) {
    const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
    const [dates, setDates] = useState(generateDates());
    const [visibleMonth, setVisibleMonth] = useState(dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1));

    const { apartmentDetail} = useSelector((state) => state.requestSlice);

    const inactiveRanges = apartmentDetail?.date_from.split(', ').map((fromDate, index) => ({
        from: dayjs(fromDate.trim()),
        to: dayjs(apartmentDetail?.date_to.split(', ')[index].trim()),
    }));

    function generateDates() {
        const today = dayjs();
        const days = [];
        for (let i = 0; i < 90; i++) {
            days.push(today.add(i, 'day'));
        }
        return days;
    }

    const handleDatePress = (date) => {
        const selectedDate = dayjs(date);
        let newDates = { ...selectedDates };

        if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
            newDates = { start: selectedDate, end: null };
        } else if (selectedDates.start && !selectedDates.end) {
            if (selectedDate.isBefore(newDates.start)) {
                newDates = { start: selectedDate, end: newDates.start };
            } else {
                newDates.end = selectedDate;
                if (hasInactiveDateBetween(newDates.start, newDates.end)) {
                    newDates = { start: null, end: null };
                }
            }
        }

        setSelectedDates(newDates);

        if (onDateSelect) {
            onDateSelect(newDates);
        }
    };
    const hasInactiveDateBetween = (start, end) => {
        let date = start.add(1, 'day');
        while (date.isBefore(end)) {
            if (isDateInactive(date)) {
                return true;
            }
            date = date.add(1, 'day');
        }
        return false;
    };

    const isDateInactive = (date) => {
        return inactiveRanges.some(range =>
            date.isBetween(range.from, range.to, null, '[]') ||
            date.isSame(range.from, 'day') ||
            date.isSame(range.to, 'day')
        );
    };

    const isDateSelected = (date) => {
        if (!selectedDates.start) return false;
        if (selectedDates.start && selectedDates.end) {
            return date.isSame(selectedDates.start, 'day') || date.isSame(selectedDates.end, 'day');
        }
        return date.isSame(selectedDates.start, 'day');
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const visibleIndex = Math.floor(scrollPosition / 67);
        const month = dates[visibleIndex]?.format('MMMM');
        if (month && month !== visibleMonth) {
            setVisibleMonth(month.charAt(0).toUpperCase() + month.slice(1));
        }
    };

    return (
        <View style={{ height: 125}}>
            <Text style={styles.monthText}>{visibleMonth}</Text>
            <ScrollView
                horizontal
                style={styles.calendarContainer}
                onScroll={handleScroll}
                scrollEventThrottle={10}
                showsHorizontalScrollIndicator={false}
            >
                {dates.map((date) => {
                    const isInactive = isDateInactive(date);
                    const isSelected = isDateSelected(date);
                    const isConnector = selectedDates.start && selectedDates.end &&
                        date.isAfter(selectedDates.start.subtract(1, 'day')) &&
                        date.isBefore(selectedDates.end);
                    const isBetween = selectedDates.start && selectedDates.end &&
                        date.isAfter(selectedDates.start) &&
                        date.isBefore(selectedDates.end);

                    return (
                        <View key={date.format('YYYY-MM-DD')} style={styles.dayContainer}>
                            <Text style={[
                                styles.weekDay,
                                isSelected && styles.weekDaySelected,
                                isBetween && styles.weekDaySelected,
                            ]}>
                                {date.format('dd').charAt(0).toUpperCase() + date.format('dd').slice(1)}
                            </Text>

                            {isConnector && (
                                <View style={styles.connector} />
                            )}

                            <TouchableOpacity
                                onPress={() => !isInactive && handleDatePress(date)}
                                style={[
                                    styles.dateContainer,
                                    isInactive && styles.inactiveDate,
                                    isSelected && styles.selectedDate,
                                    isBetween && styles.betweenDates,
                                ]}
                            >
                                <Text style={[
                                    styles.dateText,
                                    isSelected && styles.selectedDateText,
                                    isBetween && styles.selectedDateText,
                                ]}>
                                    {date.format('D')}
                                </Text>
                                {isInactive && <View style={styles.diagonalLine} />}
                            </TouchableOpacity>

                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
