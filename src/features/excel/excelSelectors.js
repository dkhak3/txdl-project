// =========================
// SELECTOR: SHEET1 DATA
// =========================

// lấy toàn bộ dữ liệu từ sheet1
// dữ liệu phản ánh khách hàng
export const selectExcelData = (state) => state.excel.excelData;

// =========================
// SELECTOR: RESULTS
// =========================

// lấy dữ liệu sau khi filter
// dùng để hiển thị table kết quả
export const selectResults = (state) => state.excel.results;

// =========================
// SELECTOR: START DATE
// =========================

// lấy ngày bắt đầu filter
export const selectStartDate = (state) => state.excel.startDate;

// =========================
// SELECTOR: END DATE
// =========================

// lấy ngày kết thúc filter
export const selectEndDate = (state) => state.excel.endDate;

// =========================
// SELECTOR: EMPLOYEE INPUT
// =========================

// lấy input tên nhân viên
// hỗ trợ nhiều tên cách nhau bằng dấu ,
export const selectEmployeeInput = (state) => state.excel.employeeInput;
