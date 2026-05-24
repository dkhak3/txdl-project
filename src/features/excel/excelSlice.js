import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  excelData: [], // sheet1

  secondSheetData: [], // sheet2

  results: [], // kết quả filter sheet1

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

    setSecondSheetData: (state, action) => {
      state.secondSheetData = action.payload;
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
  setSecondSheetData,
  setResults,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} = excelSlice.actions;

export default excelSlice.reducer;
