import React, {useCallback, useMemo} from "react";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import { apartament } from "../../constants/apartaments";
import {useSelector} from "react-redux";

export default function Favorites({favorites,detailsRef }) {
    const snapPoints = useMemo(() => ['95%'], []);

    const handleBack = () => {
        favorites.current?.close()
    }

    const {favoritesList} = useSelector((state) => state.stateSlice)

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
            ref={favorites}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >
            <BottomSheetSideBar handleClickBack={handleBack} title='Избранные'/>

            <BottomSheetFlatList
                data={favoritesList}
                renderItem={({ item }) => <ApartmentCard apartment={item} detailsRef={detailsRef} />}
                keyExtractor={item => item.guid}
            />
        </BottomSheet>
    )
}
