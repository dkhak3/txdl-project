import { configureStore } from "@reduxjs/toolkit";

import excelReducer from "./excelSlice";
import filterReducer from "./filterSlice";
import homeResultReducer from "./homeResultSlice";
import reportResultReducer from "./reportResultSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
    filter: filterReducer,
    homeResult: homeResultReducer,
    reportResult: reportResultReducer,
  },
});
