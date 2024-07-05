import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, SafeAreaView, Image, Button, Modal } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import SideBar from '../../components/SideBar/SideBar';
import { styles } from './styles/chatStyles';
import { Camera } from 'expo-camera/legacy';
import {useNavigation} from "@react-navigation/native";

const steps = [
    [
        { id: 1, text: 'Здравствуйте. Я помогу зарегистрироваться в приложении.', from: 'system' },
        { id: 2, text: 'Для начала подтвердите, что вам уже исполнилось 18 лет.', from: 'system' },
    ],
    [
        {
            id: 3,
            text: 'Ознакомьтесь с документами ниже и подтвердите свое согласие с условиями использования сервиса.',
            from: 'system'
        },
        { id: 4, text: 'Пользовательское соглашение', from: 'system', link: 'https://example.com/user-agreement.pdf' },
    ],
    [
        {
            id: 5,
            text: 'Согласие на обработку персональных данных',
            from: 'system',
            link: 'https://example.com/data-processing-consent.pdf'
        },
    ],
    [
        { id: 6, text: 'Политика конфиденциальности', from: 'system', link: 'https://example.com/privacy-policy.pdf' },
    ],
    [
        {
            id: 7,
            text: "Для начало регистрации укажите, являетесь ли Гражданином КР или иностранным гражданином",
            from: 'system'
        },
        { id: 8, text: 'Отлично, сфотографируйте лицевую сторону паспорта с фотографией', from: 'system' },
    ],
    [
        { id: 9, text: 'Отлично, теперь сфотографируйте обратную сторону паспорта', from: 'system' },
    ],
    [
        {
            id: 10,
            text: 'Теперь найдите хорошо освещенное место и сделайте селфи с лицевой стороной паспорта',
            from: 'system'
        },
    ],
];

const userResponses = [
    'Подтверждаю',
    'Прочитано. Подтверждаю.',
    'Прочитано. Подтверждаю.',
    'Прочитано. Даю согласие.',
];

export default function ChatScreen() {
    const [chatMessages, setChatMessages] = useState(steps[0]);
    const [currentStep, setCurrentStep] = useState(1);
    const [hasCameraPermission, setHasCameraPermission] = useState(true);
    const [camera, setCamera] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();
    const handleOpenLink = (link) => {
        Linking.openURL(link);
    };

    const handleSendMessage = async () => {
        if (currentStep < steps.length + 1) {
            const userMessage = {
                id: `${chatMessages.length + 1}_${Date.now()}`,
                text: userResponses[currentStep - 1],
                from: 'user'
            };
            setChatMessages([...chatMessages, userMessage, ...steps[currentStep].map(msg => ({
                ...msg,
                id: `${msg.id}_${Date.now()}`
            }))]);

            console.log(currentStep, 'currentStep')
            if(currentStep === 7) {
                navigation.navigate('HomePage');
            }

            setCurrentStep(currentStep + 1);

            if (+currentStep > 4 && +currentStep < 8) {
                setIsCameraActive(true);
            } else {
                setIsCameraActive(false);
            }
        }
    }

    const handleCapturePhoto = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPhotoUri(photo.uri);
            setIsCameraActive(false);
        }
    };

    const handleConfirmPhoto = () => {
        setChatMessages([...chatMessages, {
            id: `${chatMessages.length + 1}_${Date.now()}`,
            text: 'Фотография',
            from: 'user',
            image: photoUri
        }]);
        setPhotoUri(null);
        setCurrentStep(currentStep + 1);
        console.log(currentStep)
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Вам нужно дать разрешение на камеру</Text>
                <Button onPress={requestPermission} title="Разрешить" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <SideBar title="Регистрация"/>
            <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                {chatMessages.map((message) => (
                    <View key={message.id}
                          style={[styles.message, message.from === 'user' ? styles.userMessage : styles.systemMessage]}>
                        {message.link ? (
                            <TouchableOpacity style={styles.fileLink} onPress={() => handleOpenLink(message.link)}>
                                <View style={styles.fileIcon}>
                                    <Feather name="paperclip" size={22} color="white"/>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.linkText}>{message.text}</Text>
                                    <Text style={styles.fileSizeText}>Открыть в pdf, 2мб</Text>
                                </View>
                            </TouchableOpacity>
                        ) : message.image ? (
                            <Image source={{uri: message.image}} style={styles.image}/>
                        ) : (
                            <Text
                                style={[styles.messageText, message.from === 'user' ? {color: 'white'} : {color: 'black'}]}>{message.text}</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
            {isCameraActive && permission ? (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isCameraActive}
                    onRequestClose={() => setIsCameraActive(false)}
                >
                    <Camera style={styles.camera} ref={ref => setCamera(ref)}>
                        <View style={styles.cameraButtonContainer}>
                            <TouchableOpacity style={styles.cameraButton} onPress={handleCapturePhoto}>
                                <Feather name="camera" size={28} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </Modal>
            ) : photoUri ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photoUri }} style={styles.previewImage} />
                    <Button title="Загрузить" onPress={handleConfirmPhoto} />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.responseButton} onPress={handleSendMessage}>
                        {currentStep >= 5 && currentStep < 8 ? (
                            <Feather name="camera" size={28} color="white"/>
                        ) : null}
                        <Text style={styles.responseButtonText}>
                            {currentStep <= userResponses.length ? userResponses[currentStep - 1] : 'Включить камеру'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipButton} onPress={() => {
                    }}>
                        <Text style={styles.skipButtonText}>Завершить верификацию позже</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
