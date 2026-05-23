import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  excelData: [],

  results: [],

  startDate: "",

  endDate: "",

  employeeInput: "",
};

const excelSlice = createSlice({
  name: "excel",

  initialState,

  reducers: {
    setExcelData: (state, action) => {
      state.excelData = action.payload;
    },

    setResults: (state, action) => {
      state.results = action.payload;
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    setEmployeeInput: (state, action) => {
      state.employeeInput = action.payload;
    },
  },
});

export const {
  setExcelData,
  setResults,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} = excelSlice.actions;

export default excelSlice.reducer;
