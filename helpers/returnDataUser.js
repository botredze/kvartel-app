import AsyncStorage from "@react-native-async-storage/async-storage";

export const returnDataUser = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId");
        const fio = await AsyncStorage.getItem("fio");
        const verificated = await AsyncStorage.getItem('verificated')
        const rejectRegistration = await AsyncStorage.getItem('rejectRegistration')

        if (userId !== null) {
            const data = {
                userId,
                fio,
                verificated,
                rejectRegistration
            };
            return data;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const getLocalDataUser = async ({ changeLocalData, dispatch }) => {
    const data = await returnDataUser();
    dispatch(changeLocalData(data));
};
