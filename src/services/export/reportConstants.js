/**
 * ======================================================
 * TEMPLATE
 * ======================================================
 */

export const TEMPLATE_PATH = "/report-template/CITYBUS_BAO_CAO_TEMPLATE.xlsx";

export const REPORT_SHEET_NAME = "BCTH P.QLCL";

/**
 * ======================================================
 * HEADER
 * ======================================================
 */

/**
 * Hàng 1-2:
 * BÁO CÁO CÔNG VIỆC...
 * (Từ ngày ... đến ngày ...)
 */
export const PERIOD_CELL = "A2";

/**
 * Hàng 4:
 * Họ & Tên:
 */
export const EMPLOYEE_CELL = "A4";

/**
 * ======================================================
 * TABLE
 * ======================================================
 */

/**
 * Header table:
 * Row 6-7
 *
 * Data bắt đầu từ row 8
 */
export const FIRST_DATA_ROW = 8;

/**
 * Template có sẵn 5 dòng dữ liệu
 */
export const TEMPLATE_DATA_ROW = 8;

export const TEMPLATE_LAST_DATA_ROW = 8;

/**
 * Footer "TỔNG"
 */
export const TEMPLATE_SUMMARY_ROW = 9;

/**
 * ======================================================
 * COLUMN
 * ======================================================
 */

export const COLUMN = {
  STT: 1,

  CHI_NHANH: 2,

  TUYEN: 3,

  BKS: 4,

  NOI_DUNG: 5,

  NHAN_VIEN: 6,

  GIAI_TOA: 7,

  VI_PHAM: 8,
};

/**
 * ======================================================
 * FONT
 * ======================================================
 */

export const FONT = {
  name: "Times New Roman",

  size: 11,
};

/**
 * ======================================================
 * COLOR
 * ======================================================
 */

export const COLOR = {
  BLACK: "FF000000",

  RED: "FFFF0000",

  GREEN: "FF008000",

  ORANGE: "FFFFC000",

  WHITE: "FFFFFFFF",
};

/**
 * ======================================================
 * TEMPLATE INFO
 * ======================================================
 */

/**
 * Template có sẵn bao nhiêu dòng dữ liệu.
 * Chỉ cần sửa số này nếu sau này template thay đổi.
 */
// export const TEMPLATE_DATA_COUNT =
//   TEMPLATE_LAST_DATA_ROW - TEMPLATE_DATA_ROW + 1;
export const TEMPLATE_DATA_COUNT = 1;
