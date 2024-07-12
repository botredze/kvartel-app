import AsyncStorage from "@react-native-async-storage/async-storage";

export const returnDataUser = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId");
        const fio = await AsyncStorage.getItem("fio");
        console.log(userId, userId !== null, 'userId !== null')
        if (userId !== null) {
            const data = {
                userId,
                fio,
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
