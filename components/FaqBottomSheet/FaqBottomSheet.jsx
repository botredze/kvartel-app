import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {useMemo} from "react";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import FaqCard from "../FaqCards/FaqCards";
import {faqData} from "../../constants/faqData";
import { StyleSheet } from "react-native";


export default function FaqBottomSheet() {
    const snapPoints = useMemo(() => ['95%'], []);
    const handleBack = () => {
        console.log('ХУЙХУЙ')
    }

    return (
        <BottomSheet
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <BottomSheetSideBar handleClickBack={handleBack} title='Частые вопросы'/>

            <BottomSheetFlatList
                style={styles.container}
                data={faqData}
                renderItem={({ item }) => <FaqCard item={item} />}
                keyExtractor={item => item.id}
            />
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})
