import AsyncStorage from "@react-native-async-storage/async-storage";

export const returnDataUser = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId");
        const name = await AsyncStorage.getItem("name");
        const fio = await AsyncStorage.getItem("fio");
        if (userId !== null && name !== null && fio !== null) {
            const data = {
                userId,
                name,
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
