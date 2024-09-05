import {Text, TouchableOpacity, View} from "react-native";
import {styles} from './style'
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect} from "react";
import {getMyActiveBooking} from "../../store/reducers/requestSlice";
import {useDispatch, useSelector} from "react-redux";

export default function MyBooking (){
    const navigation = useNavigation();
    const {data} = useSelector((state) => state.saveDataSlice)
    const dispatch = useDispatch();

    const {activeBooking} = useSelector((state) => state.requestSlice);

    console.log(activeBooking, 'activeBooking')
    const handleBack = () => {
        navigation.navigate('HomePage')
    }

    useEffect(()=> {
        console.log(data.userId, 'data.codeid')
        if(data.userId) {
            dispatch(getMyActiveBooking({codeid: data.codeid}))
        }
    }, [data])


    return (
        <View style={styles.container}>
            <View style={styles.sidebarContainer}>
                <Text style={styles.sidebarTitle}>Моя активная бронь</Text>

                <TouchableOpacity onPress={() => {handleBack()}} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white"/>
                </TouchableOpacity>
            </View>


            <View style={styles.mainContentContainer}>
                <View>
                    <Text>Название: {activeBooking?.apartament_name}</Text>
                    <Text>Адрес: {activeBooking?.address}</Text>
                </View>

                <View>
                    <Text>Дата начало: {activeBooking?.date_from}</Text>
                    <Text>Дата окончания: {activeBooking?.date_to}</Text>
                </View>
                <View>
                    <Text>Оплата</Text>

                    <Text>Оплачено: {activeBooking?.amount} сом</Text>
                </View>

                <View>
                    <Text>Код от замка: </Text>
                    <Text>{activeBooking?.code_lock}#</Text>
                </View>

                <View>
                    <Text>Инструкция</Text>
                    <Text>
                        {`Инструкция по входу в квартиру через кодовый замок
1. Получите код доступа После подтверждения бронирования, вы получите уникальный 6-значный код, который действует в течение всего срока вашего проживания. Этот код будет отправлен вам на электронную почту или в SMS-сообщении. Так же вы сможете его увидеть в приложении в разделе моя Активная бронь

2. Прибытие в квартиру
Когда вы приедете к арендованному жилью, выполните следующие действия:

Найдите входную дверь квартиры, на которой установлен цифровой замок.
Убедитесь, что дверь закрыта.

3. Введите код на замке
Нажмите на активирующую кнопку на замке (любая цифра или специальная кнопка).
Введите свой 6-значный код, полученный ранее. Убедитесь, что вы вводите код без ошибок.
После ввода кода замок автоматически разблокируется, и вы сможете открыть дверь, потянув за ручку.

4. Закрытие двери
Когда вам нужно выйти из квартиры:
Закройте дверь.
Замок автоматически заблокируется после закрытия, либо вам нужно нажать на определенную кнопку на замке для его блокировки (в зависимости от модели замка).

5. Доступ к квартире во время проживания
Вы можете использовать тот же код для повторного входа в квартиру в течение всего срока аренды. Если у вас возникли проблемы с доступом, обратитесь в нашу службу поддержки.`
                        }</Text>
                </View>
            </View>
        </View>
    )
}
