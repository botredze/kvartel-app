import React, { useMemo } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import { apartament } from "../../constants/apartaments";

export default function Favorites() {
    const snapPoints = useMemo(() => ['95%'], []);
    const handleBack = () => {
        console.log('Handle back action');
    }

    const favorites = apartament.filter(item => item.favorites);

    return (
        <BottomSheet
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <BottomSheetSideBar handleClickBack={handleBack} title='Избранные'/>

            <BottomSheetFlatList
                data={favorites}
                renderItem={({ item }) => <ApartmentCard apartment={item} />}
                keyExtractor={item => item.id}
            />
        </BottomSheet>
    )
}
