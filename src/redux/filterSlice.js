import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /**
   * Khoảng thời gian
   */
  startDate: "",
  endDate: "",

  /**
   * Nhân viên QLCL
   */
  employeeInput: "",
};

const filterSlice = createSlice({
  name: "filter",

  initialState,

  reducers: {
    /**
     * Ngày bắt đầu
     */
    setStartDate(state, action) {
      state.startDate = action.payload;
    },

    /**
     * Ngày kết thúc
     */
    setEndDate(state, action) {
      state.endDate = action.payload;
    },

    /**
     * Nhân viên QLCL
     */
    setEmployeeInput(state, action) {
      state.employeeInput = action.payload;
    },

    /**
     * Reset toàn bộ Filter
     */
    resetFilter(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setStartDate, setEndDate, setEmployeeInput, resetFilter } =
  filterSlice.actions;

export default filterSlice.reducer;

/* ======================================================
   SELECTORS
====================================================== */

/**
 * Toàn bộ Filter
 */
export const selectFilter = (state) => state.filter;

/**
 * Ngày bắt đầu
 */
export const selectStartDate = (state) => state.filter.startDate;

/**
 * Ngày kết thúc
 */
export const selectEndDate = (state) => state.filter.endDate;

/**
 * Nhân viên QLCL
 */
export const selectEmployeeInput = (state) => state.filter.employeeInput;
