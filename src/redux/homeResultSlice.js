import { createSlice, createSelector } from "@reduxjs/toolkit";

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
  name: "homeResult",

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

export const selectResult = (state) => state.homeResult;

export const selectResultData = (state) => state.homeResult.data;

export const selectResultTotal = (state) => state.homeResult.totalMatched;

export const selectCurrentPage = (state) => state.homeResult.currentPage;

export const selectPageSize = (state) => state.homeResult.pageSize;

/**
 * Tổng số trang
 */
export const selectTotalPages = createSelector(
  [(state) => state.homeResult.data, (state) => state.homeResult.pageSize],
  (data, pageSize) => Math.max(1, Math.ceil(data.length / pageSize)),
);
/**
 * Dữ liệu của trang hiện tại
 */
export const selectCurrentPageData = createSelector(
  [
    (state) => state.homeResult.data,
    (state) => state.homeResult.currentPage,
    (state) => state.homeResult.pageSize,
  ],
  (data, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  },
);

/**
 * Các thống kê
 */
export const selectTotalBeforeFilter = (state) =>
  state.homeResult.totalBeforeFilter;

export const selectTotalAfterFilter = (state) =>
  state.homeResult.totalAfterFilter;

export const selectTotalMatched = (state) => state.homeResult.totalMatched;

export const selectTotalRemoved = (state) => state.homeResult.totalRemoved;
