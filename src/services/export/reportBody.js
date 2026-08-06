import { COLUMN, FONT, COLOR, FIRST_DATA_ROW } from "./reportConstants";

import { prepareDataRows, mergeSupportCustomer } from "./reportTemplateHelper";

/* ======================================================
   STYLE
====================================================== */

function applyDefaultStyle(row) {
  for (let col = COLUMN.STT; col <= COLUMN.NHAN_VIEN; col++) {
    const cell = row.getCell(col);

    cell.font = {
      ...FONT,
      bold: false,
      color: {
        argb: COLOR.BLACK,
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  }
}

/* ======================================================
   GHI 1 DÒNG
====================================================== */

function fillRow(sheet, rowNumber, item, index) {
  const row = sheet.getRow(rowNumber);

  applyDefaultStyle(row);

  /**
   * STT
   */

  row.getCell(COLUMN.STT).value = index + 1;

  /**
   * Chi nhánh
   */

  row.getCell(COLUMN.CHI_NHANH).value = item.CHI_NHANH || "";

  /**
   * Tuyến
   */

  row.getCell(COLUMN.TUYEN).value = item.TUYEN || "";

  /**
   * BKS
   */

  row.getCell(COLUMN.BKS).value = item.BIEN_KIEM_SOAT || "";

  /**
   * Nội dung
   */

  row.getCell(COLUMN.NOI_DUNG).value = item.DIEN_GIAI_CHI_TIET_NOI_DUNG || "";

  /**
   * Nhân viên
   */

  row.getCell(COLUMN.NHAN_VIEN).value = item.HO_TEN_NHAN_VIEN_BI_PHAN_ANH || "";

  /**
   * =============================
   * HỖ TRỢ KHÁCH HÀNG
   * =============================
   */

  if (item.HO_TRO_KHACH_HANG) {
    mergeSupportCustomer(sheet, rowNumber);
  } else {
    row.getCell(COLUMN.GIAI_TOA).value = item.KHONG_VI_PHAM || "";

    row.getCell(COLUMN.VI_PHAM).value = item.VI_PHAM || "";
  }

  /**
   * =============================
   * ALIGN
   * =============================
   */

  row.getCell(COLUMN.NOI_DUNG).alignment = {
    horizontal: "left",
    vertical: "middle",
    wrapText: true,
  };

  row.getCell(COLUMN.NHAN_VIEN).alignment = {
    horizontal: "left",
    vertical: "middle",
    wrapText: true,
  };
  row.getCell(COLUMN.STT).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  row.getCell(COLUMN.CHI_NHANH).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  row.getCell(COLUMN.TUYEN).alignment = {
    horizontal: "left",
    vertical: "middle",
    wrapText: true,
  };

  row.getCell(COLUMN.BKS).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  row.getCell(COLUMN.GIAI_TOA).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  row.getCell(COLUMN.VI_PHAM).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  /**
   * Giải tỏa / Vi phạm
   */

  row.getCell(COLUMN.GIAI_TOA).font = {
    ...FONT,
    bold: false,
    color: {
      argb: COLOR.BLACK,
    },
  };

  row.getCell(COLUMN.VI_PHAM).font = {
    ...FONT,
    bold: false,
    color: {
      argb: COLOR.BLACK,
    },
  };

  row.commit();
}

/* ======================================================
   BODY
====================================================== */

export function fillBody(sheet, reportData = []) {
  if (!Array.isArray(reportData)) {
    return;
  }

  /**
   * Chuẩn bị đủ số dòng
   */

  prepareDataRows(sheet, reportData.length);

  /**
   * Ghi dữ liệu
   */

  reportData.forEach((item, index) => {
    fillRow(sheet, FIRST_DATA_ROW + index, item, index);
  });
}
