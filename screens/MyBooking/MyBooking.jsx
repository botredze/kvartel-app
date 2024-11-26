import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { styles } from './style';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useCallback, useEffect } from "react";
import ExtendTheLease from "../../components/ExtendTheLease/ExtendTheLease";
import { useDispatch, useSelector } from "react-redux";
import { finishBooking, getApartamentDetails } from "../../store/reducers/requestSlice";

export default function MyBooking({ route }) {
    const { selectedBooking: item } = useSelector((state) => state.stateSlice);

    const { paymentFinished } = route.params; // Получение переданного item
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [showModal, setShowModal] = useState(false); // Состояние модального окна
    const extend = useRef(null);
    const {data} = useSelector((state) => state.saveDataSlice)
    const { activeBooking } = useSelector((state) => state.requestSlice); // Здесь мы получаем актуальные данные о бронированиях


    useEffect(() => {
        if (paymentFinished) {
            extend.current?.close();
            setShowBottomSheet(false);
        }
    }, [paymentFinished]);

    useEffect(() => {
        if (item?.codeid_apartment) {
            dispatch(getApartamentDetails(item.codeid_apartment));
        }
    }, [item]);

    const handleBack = () => {
        extend.current?.close();
        navigation.navigate('MyBookingList');
    };

    const handleCloseBottomSheet = () => {
        extend.current?.close();
        setShowBottomSheet(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - 6);

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const showBottomSheetExtend = useCallback((index) => {
        setShowBottomSheet(true);
        extend.current?.snapToIndex(index);
    }, []);

    const handleFinish = () => {
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false); 
    };


    const handleConfirmFinish = () => {
        dispatch(finishBooking({codeid_client: data.userId, codeid_apartment: item.codeid_apartment, navigation}))
        .then(() => {
            if (activeBooking.length > 0) {
              navigation.replace('MyBookingList');
            } else {
              navigation.replace('HomePage');
            }
          })

        setShowModal(false);
    }
    
    
    const handlePressViewOnMap = () => {
        navigation.navigate('MapForBooking', {
            destinationCoords: {
                latitude: activeBooking.dolgota,
                longitude: activeBooking.shirota
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.sidebarContainer}>
                <Text style={styles.sidebarTitle}>Моя активная бронь</Text>

                <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContentContainer}>
                <View>
                    <Text style={styles.titleText}>Название: {item?.apartament_name}</Text>
                    <Text style={styles.titleText}>Адрес: {item?.address}</Text>
                </View>

                <View>
                    <Text style={styles.titleText}>Дата начала: {item?.date_from ? formatDate(item.date_from) : ''}</Text>
                    <Text style={styles.titleText}>Дата окончания: {item?.date_to ? formatDate(item.date_to) : ''}</Text>
                </View>

                <View>
                    <Text style={styles.titleText}>Оплачено: {item?.amount} сом</Text>
                </View>

                <View>
                    <Text style={styles.titleText}>Код от замка:</Text>
                    <Text style={styles.activeLookCode}>{item?.code_lock}#</Text>
                </View>

                <View style={{ gap: 10 }}>
                    <Text style={styles.titleText}>Инструкция</Text>
                    <Text style={styles.instrunctionText}>
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
Вы можете использовать тот же код для повторного входа в квартиру в течение всего срока аренды. Если у вас возникли проблемы с доступом, обратитесь в нашу службу поддержки.`}
                    </Text>
                </View>

                <View style={styles.buttonGroupsContainer}>
                    <View style={styles.buttonGroups}>
                        <TouchableOpacity
                            style={styles.goMapButton}
                            onPress={() => showBottomSheetExtend(0)}
                        >
                            <Text style={styles.goMapButtonText}>Продлить аренду</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.finishLeaseButton}
                            onPress={handleFinish} // Открыть модальное окно
                        >
                            <Text style={styles.goMapButtonText}>Завершить аренду</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonGroups}>
                        <TouchableOpacity
                            style={styles.goMapButton2}
                            onPress={handlePressViewOnMap}
                        >
                            <Text style={styles.goMapButtonText}>Посмотреть на карте</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {showBottomSheet && (
                <ExtendTheLease extend={extend} formatDate={formatDate} handleBack={handleCloseBottomSheet} />
            )}

            <Modal
                transparent={true}
                visible={showModal}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Подтверждение завершения аренды</Text>
                        <Text style={styles.modalText}>
                            Вы уверены, что хотите завершить аренду?
                        </Text>

                        <Text style={styles.modalText}>
                        Это действие необратимо! Средства не будут возвращены.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={closeModal}
                            >
                                <Text style={styles.modalCancelButtonText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalConfirmButton}
                                onPress={() => {
                                    handleConfirmFinish(); 
                                }}
                            >
                                <Text style={styles.modalConfirmButtonText}>Завершить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
