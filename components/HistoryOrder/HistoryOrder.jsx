import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo} from "react";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import {styles} from './style'
import {faqData} from "../../constants/faqData";
import FaqCard from "../FaqCards/FaqCards";
import {Text} from 'react-native'
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import {useSelector} from "react-redux";

export default function HistoryOrder({history, detailsRef}) {
    const snapPoints = useMemo(() => ['96%'], []);

    const handleBack = () => {
        history.current?.close()
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

    const {favoritesList} = useSelector((state) => state.stateSlice)


    return (
        <BottomSheet
            ref={history}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >
            <BottomSheetSideBar handleClickBack={handleBack} title='История аренды'/>
            <BottomSheetFlatList
                data={favoritesList}
                renderItem={({ item }) => <ApartmentCard apartment={item} detailsRef={detailsRef} />}
                keyExtractor={item => item.guid}
            />
        </BottomSheet>
    )
}
