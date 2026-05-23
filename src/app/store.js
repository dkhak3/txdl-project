import { configureStore } from "@reduxjs/toolkit";

import excelReducer from "../features/excel/excelSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
});
