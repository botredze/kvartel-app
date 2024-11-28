import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filtersVisible: false,
  filteredApartamentsVisible: false,
  previewBottomSheetVisible: false,
  detailsVisible: false,
  bookingVisible: false
};

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    toggleFiltersVisibility(state, action) {
      state.filtersVisible = action.payload
    },
    toggleFilteredApartamentsVisibility(state, action) {
      state.filteredApartamentsVisible = action.payload
    },
    togglePreviewBottomSheetVisibility(state, action) {
      state.previewBottomSheetVisible = action.payload
    },
    toggleDetailsVisibility(state, action) {
      state.detailsVisible = action.payload
    },
    toggleBookingVisibility(state, action) {
      state.bookingVisible = action.payload
    }
  }
});

export const {
  toggleFiltersVisibility,
  toggleFilteredApartamentsVisibility,
  togglePreviewBottomSheetVisibility,
  toggleDetailsVisibility,
  toggleBookingVisibility
} = visibilitySlice.actions;

export default visibilitySlice.reducer;
