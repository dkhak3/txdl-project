import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Dữ liệu ResultTable
  data: [],

  // Thống kê
  totalBeforeFilter: 0,
  totalAfterFilter: 0,
  totalMatched: 0,
  totalRemoved: 0,

  // Pagination
  currentPage: 1,
  pageSize: 20,
};

const resultSlice = createSlice({
  name: "result",

  initialState,

  reducers: {
    /**
     * Lưu kết quả Search
     */
    setResult(state, action) {
      const {
        result,
        totalBeforeFilter,
        totalAfterFilter,
        totalMatched,
        totalRemoved,
      } = action.payload;

      state.data = result;

      state.totalBeforeFilter = totalBeforeFilter;

      state.totalAfterFilter = totalAfterFilter;

      state.totalMatched = totalMatched;

      state.totalRemoved = totalRemoved;
    },

    /**
     * Đổi trang
     */
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    /**
     * Quay về trang đầu
     */
    resetCurrentPage(state) {
      state.currentPage = 1;
    },

    setPageSize(state, action) {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },

    /**
     * Reset toàn bộ Result
     */
    resetResult(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setResult,
  setCurrentPage,
  resetCurrentPage,
  setPageSize,
  resetResult,
} = resultSlice.actions;

export default resultSlice.reducer;

/* ======================================================
   SELECTORS
====================================================== */

export const selectResult = (state) => state.result;

export const selectResultData = (state) => state.result.data;

export const selectResultTotal = (state) => state.result.totalMatched;

export const selectCurrentPage = (state) => state.result.currentPage;

export const selectPageSize = (state) => state.result.pageSize;

/**
 * Tổng số trang
 */
export const selectTotalPages = (state) => {
  const { data, pageSize } = state.result;

  return Math.max(1, Math.ceil(data.length / pageSize));
};

/**
 * Dữ liệu của trang hiện tại
 */
export const selectCurrentPageData = (state) => {
  const { data, currentPage, pageSize } = state.result;

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
};

/**
 * Các thống kê
 */
export const selectTotalBeforeFilter = (state) =>
  state.result.totalBeforeFilter;

export const selectTotalAfterFilter = (state) => state.result.totalAfterFilter;

export const selectTotalMatched = (state) => state.result.totalMatched;

export const selectTotalRemoved = (state) => state.result.totalRemoved;
