import {BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./styles";
import {Text} from "react-native";
import React from "react";
import Dates from "./Dates";

const DateSelector = ({ dates, selectedDates, handleDatePress }) => {
    return (
        <BottomSheetView style={styles.selectDateContainer}>
            <Text style={styles.nameText}>Июль</Text>
            <BottomSheetScrollView
                style={styles.selectDates}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {dates.map((data, index) => (
                    <Dates
                        itemDate={data}
                        key={data?.id}
                        isSelected={selectedDates.includes(data?.id)}
                        onPress={() => handleDatePress(data?.id)}
                        isNextSelected={selectedDates.includes(dates[index + 1]?.id)}
                    />
                ))}
            </BottomSheetScrollView>
        </BottomSheetView>
    );
};

export default DateSelector;
