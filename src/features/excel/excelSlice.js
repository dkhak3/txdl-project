import { createSlice } from "@reduxjs/toolkit";

// =========================
// INITIAL STATE
// =========================

const initialState = {
  // DỮ LIỆU SHEET1
  // chứa toàn bộ dữ liệu phản ánh
  // đọc từ sheet đầu tiên trong file excel
  excelData: [], // sheet1

  // DỮ LIỆU SHEET2
  // chứa dữ liệu trích xuất
  // dùng để so sánh và build báo cáo
  secondSheetData: [], // sheet2

  // KẾT QUẢ FILTER
  // dữ liệu sau khi lọc theo:
  // - ngày bắt đầu
  // - ngày kết thúc
  // - tên nhân viên
  results: [], // kết quả filter sheet1

  // NGÀY BẮT ĐẦU FILTER
  startDate: "",

  // NGÀY KẾT THÚC FILTER
  endDate: "",

  // INPUT TÊN NHÂN VIÊN
  // hỗ trợ nhập nhiều tên:
  // A,B,C

  employeeInput: "",
};

// =========================
// SLICE
// =========================
const excelSlice = createSlice({
  // TÊN STORE
  name: "excel",

  // INITIAL STATE
  initialState,

  // REDUCERS
  reducers: {
    // =========================
    // SET SHEET1 DATA
    // =========================

    // lưu dữ liệu sheet1 vào redux
    setExcelData: (state, action) => {
      state.excelData = action.payload;
    },

    // =========================
    // SET SHEET2 DATA
    // =========================

    // lưu dữ liệu sheet2 vào redux
    setSecondSheetData: (state, action) => {
      state.secondSheetData = action.payload;
    },

    // =========================
    // SET RESULTS
    // =========================

    // lưu kết quả sau khi filter
    setResults: (state, action) => {
      state.results = action.payload;
    },

    // =========================
    // SET START DATE
    // =========================

    // cập nhật ngày bắt đầu
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    // =========================
    // SET END DATE
    // =========================

    // cập nhật ngày kết thúc
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    // =========================
    // SET EMPLOYEE INPUT
    // =========================

    // cập nhật input nhân viên
    setEmployeeInput: (state, action) => {
      state.employeeInput = action.payload;
    },
  },
});

// =========================
// EXPORT ACTIONS
// =========================
export const {
  setExcelData,
  setSecondSheetData,
  setResults,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} = excelSlice.actions;

// =========================
// EXPORT REDUCER
// =========================
export default excelSlice.reducer;
