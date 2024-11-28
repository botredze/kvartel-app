import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import ActiveBookItem from "../../components/ActiveBookItem/ActiveBookItem";
import BottomSheetSideBar from "../../components/BottomSheetSideBar/BottomSheetSideBar";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getApartamentDetails, getMyActiveBooking } from "../../store/reducers/requestSlice";
import { changeSelectedBooking } from "../../store/reducers/stateSlice";

export default function MyBookingList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data } = useSelector((state) => state.saveDataSlice);
  const { activeBooking, preloader } = useSelector((state) => state.requestSlice); // Fetch preloader state

  useEffect(() => {
    if (data?.userId) {
      dispatch(getMyActiveBooking({ codeid: data.codeid }));
    }
  }, [data, dispatch]);

  const handleClickBack = () => {
    navigation.navigate("HomePage");
  };

  const handleClickItem = (item) => {
    dispatch(changeSelectedBooking(item))
    navigation.navigate("MyBooking", { item, paymentFinished: false });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <BottomSheetSideBar
          handleClickBack={handleClickBack}
          title="Мои брони"
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeBooking && activeBooking.length > 0 ? (
          activeBooking.map((booking, index) => (
            <ActiveBookItem
              key={index}
              item={booking}
              index={index}
              handleClickItem={() => handleClickItem(booking)}
            />
          ))
        ) : (
          <View>
            <Text>Данные не найдены</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
