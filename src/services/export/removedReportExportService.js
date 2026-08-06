import {
  createWorkbook,
  createWorksheet,
  appendWorksheet,
  autoFitColumns,
  freezeHeader,
  styleHeader,
  styleBody,
  downloadWorkbook,
  generateFileName,
} from "./exportUtils";

export function exportRemovedReportExcel(removedRows = [], employeeInput = "") {
  if (!removedRows.length) {
    throw new Error("Không có dữ liệu để xuất.");
  }

  const exportData = removedRows.map((row) => ({
    "STT JOB": row.STT,

    "Ngày tiếp nhận DVKH": row.NGAY_TIEP_NHAN,

    "Tên nhân viên DVKH": row.TEN_NHAN_VIEN_DVKH,

    "Ngày phản hồi QLCL-DV": row.NGAY_PHAN_HOI,

    "Tên nhân viên QLCL-DV": row.TEN_NHAN_VIEN_QLCL,

    "Nội dung tiếp nhận Phản ánh": row.NOI_DUNG_TIEP_NHAN_PHAN_ANH,

    "Lý do loại": row.LY_DO,
  }));

  const workbook = createWorkbook();

  const worksheet = createWorksheet(exportData);

  autoFitColumns(worksheet, exportData);

  freezeHeader(worksheet);

  styleHeader(worksheet);

  styleBody(worksheet, exportData);

  appendWorksheet(workbook, worksheet, "Phản ánh bị loại");

  const prefix = employeeInput?.trim()
    ? `REMOVED_${employeeInput.trim()}`
    : "REMOVED_REPORT";

  downloadWorkbook(workbook, generateFileName(prefix));
}
