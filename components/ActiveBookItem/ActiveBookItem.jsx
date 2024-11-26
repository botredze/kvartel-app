import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import moment from 'moment';

const getDaysText = (days) => {
    if (days % 10 === 1 && days % 100 !== 11) return `${days} день`;
    if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return `${days} дня`;
    return `${days} дней`;
};

const ActiveBookitem = ({ item, index, handleClickItem}) => {
    const today = moment().startOf('day'); 
    const startDate = moment(item?.date_from);

    const status =
        startDate.isSame(today, 'day')
            ? 'Начало: Сегодня'
            : startDate.isAfter(today)
            ? 'Активная бронь'
            : 'Просрочено';


    return (
        <TouchableOpacity style={styles.container} onPress={handleClickItem}>
            <View>
                <Text style={styles.index}>№ {index + 1}</Text>

                <Text style={styles.apartmentName}>{item?.apartament_name}</Text>

                <Text style={styles.address}>Адрес: {item?.address}</Text>

                <Text style={styles.dates}>
                    Даты: с {moment(item?.date_from).format('DD.MM.YYYY')} до {moment(item?.date_to).format('DD.MM.YYYY')}
                </Text>

                <Text style={styles.days}>Количество дней: {getDaysText(item?.days)}</Text>

                <Text style={[styles.status, status === 'Просрочено' ? styles.statusExpired : null]}>
                    Статус: {status}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ActiveBookitem;
