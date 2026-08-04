import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileName: "",

  sheet1: [],

  sheet2: [],

  sheet1Total: 0,

  sheet2Total: 0,

  loading: false,

  error: null,
};

const excelSlice = createSlice({
  name: "excel",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setExcelData(state, action) {
      const { fileName, sheet1, sheet2, sheet1Total, sheet2Total } =
        action.payload;

      state.fileName = fileName;

      state.sheet1 = sheet1;

      state.sheet2 = sheet2;

      state.sheet1Total = sheet1Total;

      state.sheet2Total = sheet2Total;

      state.error = null;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    resetExcel() {
      return initialState;
    },
  },
});

export const { setLoading, setExcelData, setError, resetExcel } =
  excelSlice.actions;

export default excelSlice.reducer;

/* ============================
   SELECTORS
============================ */

export const selectExcel = (state) => state.excel;

export const selectSheet1 = (state) => state.excel.sheet1;

export const selectSheet2 = (state) => state.excel.sheet2;

export const selectFileName = (state) => state.excel.fileName;

export const selectLoading = (state) => state.excel.loading;

export const selectError = (state) => state.excel.error;

export const selectSheet1Total = (state) => state.excel.sheet1Total;

export const selectSheet2Total = (state) => state.excel.sheet2Total;
