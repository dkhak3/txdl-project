import { COLUMN, FONT, COLOR, FIRST_DATA_ROW } from "./reportConstants";

export function fillSummary(sheet, report) {
  const reportData = report.data || [];

  const summaryRowNumber = FIRST_DATA_ROW + reportData.length;

  const row = sheet.getRow(summaryRowNumber);

  try {
    sheet.unMergeCells(`A${summaryRowNumber}:F${summaryRowNumber}`);
  } catch {}

  sheet.mergeCells(`A${summaryRowNumber}:F${summaryRowNumber}`);

  const totalCell = row.getCell(COLUMN.STT);

  totalCell.value = "TỔNG";

  totalCell.font = {
    ...FONT,
    bold: true,
    color: {
      argb: COLOR.RED,
    },
  };

  totalCell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  row.getCell(COLUMN.GIAI_TOA).value = report.totalKhongViPham || 0;

  row.getCell(COLUMN.GIAI_TOA).font = {
    ...FONT,
    bold: true,
  };

  row.getCell(COLUMN.VI_PHAM).value = report.totalViPham || 0;

  row.getCell(COLUMN.VI_PHAM).font = {
    ...FONT,
    bold: true,
    color: {
      argb: COLOR.RED,
    },
  };
}
