import * as XLSX from "xlsx";
import { normalizeRow } from "../utils/excelUtils";

function readSheet1(workbook, sheetName) {
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) return [];

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    range: 1,
    raw: false,
  });

  return rows.map(normalizeRow);
}

function readSheet2(workbook, sheetName) {
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) return [];

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: false,
    // KHÔNG có range
  });

  return rows.map(normalizeRow);
}

/**
 * Đọc file Excel
 */
export async function readExcel(file) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
  });
  const sheetNames = workbook.SheetNames;

  if (sheetNames.length < 2) {
    throw new Error("File Excel phải có tối thiểu 2 Sheet.");
  }

  //   const sheet1 = readSheet(workbook, sheetNames[0]);
  const sheet1 = readSheet1(workbook, sheetNames[0]);

  //   const sheet2 = readSheet(workbook, sheetNames[1]);
  const sheet2 = readSheet2(workbook, sheetNames[1]);

  return {
    fileName: file.name,

    sheet1,

    sheet2,

    sheet1Total: sheet1.length,

    sheet2Total: sheet2.length,
  };
}
