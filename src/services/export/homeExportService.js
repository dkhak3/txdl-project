import {
  createWorkbook,
  createWorksheet,
  appendWorksheet,
  autoFitColumns,
  freezeHeader,
  enableFilter,
  styleHeader,
  styleBody,
  downloadWorkbook,
  generateFileName,
} from "./exportUtils";

/**
 * Export dữ liệu HomePage
 */
export function exportHomeExcel(data = [], employeeInput = "") {
  if (!data.length) {
    throw new Error("Không có dữ liệu để xuất.");
  }

  const exportData = data.map((row, index) => ({
    "STT JOB": row.STT,

    "Ngày tiếp nhận DVKH": row.NGAY_TIEP_NHAN,
    "Tên nhân viên DVKH": row.TEN_NHAN_VIEN_DVKH,

    "Ngày phản hồi QLCL-DV": row.NGAY_PHAN_HOI,
    "Tên nhân viên QLCL-DV": row.TEN_NHAN_VIEN_QLCL,

    "Nội dung tiếp nhận Phản ánh": row.NOI_DUNG_TIEP_NHAN_PHAN_ANH,
  }));

  // Workbook
  const workbook = createWorkbook();

  // Worksheet
  const worksheet = createWorksheet(exportData);

  // Format
  autoFitColumns(worksheet, exportData);

  freezeHeader(worksheet);

  // bộ lộc
  //   enableFilter(worksheet);

  styleHeader(worksheet);

  styleBody(worksheet, exportData);

  // Thêm sheet
  appendWorksheet(workbook, worksheet, "Kết quả tra cứu");

  // Tên file
  const prefix = employeeInput?.trim()
    ? `HOME_${employeeInput.trim()}`
    : "HOME_REPORT";

  downloadWorkbook(workbook, generateFileName(prefix));
}
