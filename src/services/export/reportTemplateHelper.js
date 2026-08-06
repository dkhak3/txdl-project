import ExcelJS from "exceljs";

import {
  TEMPLATE_PATH,
  REPORT_SHEET_NAME,
  TEMPLATE_DATA_ROW,
  TEMPLATE_LAST_DATA_ROW,
  TEMPLATE_SUMMARY_ROW,
  TEMPLATE_DATA_COUNT,
} from "./reportConstants";

/* ========================= */

export async function loadTemplateWorkbook() {
  const response = await fetch(TEMPLATE_PATH);

  const buffer = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.load(buffer);

  return workbook;
}

/* ========================= */

export function getReportSheet(workbook) {
  return workbook.getWorksheet(REPORT_SHEET_NAME);
}

/* ========================= */

function clone(value) {
  if (value == null) return value;

  return JSON.parse(JSON.stringify(value));
}

/* ========================= */

export function copyCellStyle(source, target) {
  target.style = clone(source.style);

  target.font = clone(source.font);

  target.border = clone(source.border);

  target.fill = clone(source.fill);

  target.alignment = clone(source.alignment);

  target.numFmt = source.numFmt;

  target.protection = clone(source.protection);
}

/* ========================= */

export function copyRowStyle(sheet, fromRow, toRow) {
  const source = sheet.getRow(fromRow);

  const target = sheet.getRow(toRow);

  target.height = source.height;

  source.eachCell(
    {
      includeEmpty: true,
    },
    (cell, col) => {
      copyCellStyle(cell, target.getCell(col));
    },
  );
}

/* ========================= */

export function prepareDataRows(sheet, totalRows) {
  if (totalRows <= TEMPLATE_DATA_COUNT) {
    return;
  }

  const insertCount = totalRows - TEMPLATE_DATA_COUNT;

  /**
   * Chèn trước dòng TỔNG
   */

  sheet.spliceRows(
    TEMPLATE_SUMMARY_ROW,
    0,
    ...Array.from(
      {
        length: insertCount,
      },
      () => [],
    ),
  );

  /**
   * Copy style dòng 8
   */

  for (let i = 0; i < insertCount; i++) {
    copyRowStyle(sheet, TEMPLATE_DATA_ROW, TEMPLATE_DATA_ROW + 1 + i);
  }
}

/* ========================= */

export function getSummaryRow(totalRows) {
  return TEMPLATE_SUMMARY_ROW + Math.max(0, totalRows - 1);
}

/* ========================= */

export function mergeSupportCustomer(sheet, rowNumber) {
  sheet.mergeCells(rowNumber, 7, rowNumber, 8);

  const cell = sheet.getCell(rowNumber, 7);

  cell.value = "HỖ TRỢ KHÁCH HÀNG";

  cell.font = {
    name: "Times New Roman",
    size: 11,
    bold: true,
    color: {
      argb: "FFFF0000",
    },
  };

  cell.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
}

/* ========================= */

export async function downloadWorkbook(workbook, fileName) {
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = fileName;

  a.click();

  URL.revokeObjectURL(url);
}
