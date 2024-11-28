import React, {useCallback, useMemo} from "react";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import {useDispatch, useSelector} from "react-redux";
import { toggleFilteredApartamentsVisibility } from "../../store/reducers/visibilitySlice";

export default function FilteredApartaments({filtered, detailsRef}) {
    const snapPoints = useMemo(() => ['80%'], []);

    const dispatch = useDispatch()

    const handleBack = () => {
        dispatch(toggleFilteredApartamentsVisibility(false))
        filtered.current?.close()
    }

    const { filtredApartaments } = useSelector((state )=> state.requestSlice)

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
            ref={filtered}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >
            <BottomSheetFlatList
                data={filtredApartaments}
                renderItem={({ item }) => <ApartmentCard apartment={item} detailsRef={detailsRef} />}
                keyExtractor={item => item.id}
            />
        </BottomSheet>
    )
}
