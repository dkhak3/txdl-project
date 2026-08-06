import { FONT, PERIOD_CELL, EMPLOYEE_CELL } from "./reportConstants";

/* ======================================================
   FORMAT DATE
====================================================== */

function formatDate(date) {
  if (!date) return "";

  // Đã là dd/MM/yyyy
  if (typeof date === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date;
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "";
  }

  const day = String(d.getDate()).padStart(2, "0");

  const month = String(d.getMonth() + 1).padStart(2, "0");

  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

/* ======================================================
   PERIOD
====================================================== */

export function fillPeriod(sheet, startDate, endDate) {
  const cell = sheet.getCell(PERIOD_CELL);

  cell.value = `BÁO CÁO CÔNG VIỆC BỘ PHẬN QUẢN LÝ CLDV CITYBUS
(Từ ngày ${formatDate(startDate)} đến ngày ${formatDate(endDate)})`;

  cell.font = {
    ...FONT,
    bold: true,
    // italic: true,
    size: 14,
  };

  cell.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
}

/* ======================================================
   EMPLOYEE
====================================================== */

export function fillEmployee(sheet, employeeName = "") {
  const cell = sheet.getCell(EMPLOYEE_CELL);

  cell.value = `Họ & Tên: ${employeeName?.trim() || ""}`;

  cell.font = {
    ...FONT,
    bold: true,
  };

  cell.alignment = {
    horizontal: "left",
    vertical: "middle",
    wrapText: true,
  };
}

/* ======================================================
   HEADER
====================================================== */

export function fillHeader(sheet, { startDate, endDate, employeeName }) {
  fillPeriod(sheet, startDate, endDate);

  fillEmployee(sheet, employeeName);
}
