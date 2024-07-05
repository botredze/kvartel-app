import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo} from "react";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import FaqCard from "../FaqCards/FaqCards";
import {faqData} from "../../constants/faqData";
import { StyleSheet } from "react-native";


export default function FaqBottomSheet({faq}) {
    const snapPoints = useMemo(() => ['95%'], []);
    const handleBack = () => {
        faq.current?.close()
    }

    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.7}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            ></BottomSheetBackdrop>
        ),
        []
    );

    return (
        <BottomSheet
            ref={faq}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
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
