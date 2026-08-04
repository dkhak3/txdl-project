import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  employeeInput: "",
};

const filterSlice = createSlice({
  name: "filter",

  initialState,

  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload;
    },

    setEndDate(state, action) {
      state.endDate = action.payload;
    },

    setEmployeeInput(state, action) {
      state.employeeInput = action.payload;
    },

    resetFilter(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setStartDate, setEndDate, setEmployeeInput, resetFilter } =
  filterSlice.actions;

export default filterSlice.reducer;

/* ============================
   SELECTORS
============================ */

export const selectStartDate = (state) => state.filter.startDate;

export const selectEndDate = (state) => state.filter.endDate;

export const selectEmployeeInput = (state) => state.filter.employeeInput;
