import React, { useState, useRef } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import  {styles} from './styles'
import {CameraView, useCameraPermissions} from "expo-camera";
import {useNavigation} from "@react-navigation/native";
import front from '../../assets/front.png'
import selfie from '../../assets/selfie.png'
import back from '../../assets/back.png'

export default function LoadPassportPhotos() {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [photos, setPhotos] = useState({ front: null, back: null, selfie: null });
    const [currentStep, setCurrentStep] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const cameraRef = useRef(null);

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('HomePage')
    };


    const handleOpenCamera = (step) => {
        if(!hasPermission.granted) {
            requestPermission()
        }
        setCurrentStep(step);
        setIsCameraVisible(true);
    };

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotos((prevPhotos) => ({ ...prevPhotos, [currentStep]: photo.uri }));
            setIsCameraVisible(false);
        }
    };

    const handleSwitchCamera = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const handleResetPhoto = (step) => {
        setPhotos((prevPhotos) => ({ ...prevPhotos, [step]: null }));
    };

    const isStepCompleted = (step) => photos[step] !== null;

    const canCompleteVerification = Object.values(photos).every((photo) => photo !== null);


    const handleComppleteVerification = () => {
        setModalVisible(true)
    };

    const handleSkippRegister = () => {
        navigation.replace('HomePage')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Загрузите фотографии паспорта</Text>
            <ScrollView style={styles.photoContainer}>
                {['front', 'back', 'selfie'].map((step, index) => (
                    <View key={step} style={{...styles.photoWrapper, marginTop: step ==='front' ? 0 : 20}}>
                        <Text style={styles.photoLabel}>
                            {step === 'front'
                                ? 'Лицевая часть паспорта'
                                : step === 'back'
                                    ? 'Обратная часть паспорта'
                                    : 'Селфи с паспортом'}
                        </Text>
                        {photos[step] ? (
                            <Image source={{ uri: photos[step] }} style={styles.photo} />
                        ) : ( step === 'front' ?
                            <View style={styles.photoPlaceholder}>
                               <Image source={front} style={styles.photoPlaceGolder}/>
                            </View>
                                : step === 'back' ?
                                    <View style={styles.photoPlaceholder}>
                                        <Image source={back} style={styles.photoPlaceGolder}/>
                                    </View> :
                                    <View style={styles.photoPlaceholder}>
                                        <Image source={selfie} style={styles.photoPlaceGolder}/>
                                    </View>
                        )}
                        <TouchableOpacity
                            onPress={() => handleOpenCamera(step)}
                            style={[
                                styles.cameraButton,
                                isStepCompleted(step) ||
                                index === 0 ||
                                isStepCompleted(['front', 'back'][index - 1])
                                    ? {}
                                    : styles.disabledButton,
                            ]}
                            disabled={!isStepCompleted(step) && index !== 0 && !isStepCompleted(['front', 'back'][index - 1])}
                        >
                            <Feather name="camera" size={22} color="white"/>
                            <Text style={styles.cameraButtonText}>Включить камеру</Text>
                        </TouchableOpacity>
                        {photos[step] && (
                            <TouchableOpacity onPress={() => handleResetPhoto(step)} style={styles.resetButton}>
                                <Ionicons name="refresh" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButtonActive, canCompleteVerification ? {} : styles.disabledButton]}
                        disabled={!canCompleteVerification}
                        onPress={() => {handleComppleteVerification()}}
                    >
                        <Text style={styles.actionButtonText}>Завершить верификацию</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSkippRegister()}
                    >
                        <Text style={styles.actionButtonText}>Пропустить</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {isCameraVisible && (
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.cameraControls}>
                        <TouchableOpacity onPress={handleSwitchCamera} style={styles.switchCameraButton}>
                            <Ionicons name="camera-reverse" size={36} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTakePhoto} style={styles.takePhotoButton}>
                            <Ionicons name="camera" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextTitle}>
                            Ваши данные успешно сохранены
                        </Text>
                        <Text style={styles.modalText}>
                            {'Мы получили ваши данные, наши администраторы проверят в скором времени и верифицируют вас.\n\nПо завершению верификации вы получите уведомление об этом и доступ в приложение и всем его функциям,'},
                        </Text>
                        <TouchableOpacity style={styles.closeButtonModal} onPress={handleModalClose}>
                            <Text style={styles.closeButtonText}>ПОНЯТНО</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


