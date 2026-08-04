import { normalizeDate, parseDate } from "./dateUtils";

/**
 * Chuẩn hóa dữ liệu đọc từ Excel
 */
export function normalizeHeader(header = "") {
  return String(header).trim().replace(/\s+/g, " ").toUpperCase();
}

export const HEADER_MAP = {
  STT: "STT",

  "NGÀY TIẾP NHẬN": "NGAY_TIEP_NHAN",
  "NGÀY PHẢN HỒI": "NGAY_PHAN_HOI",

  "TÊN NHÂN VIÊN DVKH": "TEN_NHAN_VIEN_DVKH",
  "TÊN NHÂN VIÊN QLCL-DV": "TEN_NHAN_VIEN_QLCL",

  "NỘI DUNG TIẾP NHẬN PHẢN ÁNH": "NOI_DUNG_TIEP_NHAN_PHAN_ANH",
  "HỌ TÊN NHÂN VIÊN BỊ PHẢN ÁNH": "HO_TEN_NHAN_VIEN_BI_PHAN_ANH",
  "DIỄN GIẢI CHI TIẾT NỘI DUNG": "DIEN_GIAI_CHI_TIET_NOI_DUNG",

  "CHI NHÁNH": "CHI_NHANH",

  TUYẾN: "TUYEN",

  "BIỂN KIỂM SOÁT": "BIEN_KIEM_SOAT",

  "NHÂN VIÊN BỊ PHẢN ÁNH": "NHAN_VIEN",

  "XÁC ĐỊNH TÍNH VI PHẠM": "VI_PHAM",
};

export function normalizeRow(row = {}) {
  const result = {};

  Object.entries(row).forEach(([key, value]) => {
    const normalizedKey = normalizeHeader(key);

    const finalKey = HEADER_MAP[normalizedKey] || normalizedKey;

    // Chuẩn hóa giá trị rỗng
    if (value === undefined || value === null) {
      value = "";
    }

    // Chuẩn hóa String
    if (typeof value === "string") {
      value = value.trim();
    }

    result[finalKey] = value;
  });

  // ============================
  // Chuẩn hóa STT
  // ============================

  if ("STT" in result) {
    result.STT = String(result.STT).trim();

    // Excel đôi khi đọc 1 thành 1.0
    if (/^\d+\.0+$/.test(result.STT)) {
      result.STT = result.STT.replace(/\.0+$/, "");
    }
  }

  // ============================
  // Chuẩn hóa NGÀY PHẢN HỒI
  // ============================

  if ("NGAY_PHAN_HOI" in result) {
    result.NGAY_PHAN_HOI = normalizeDate(result.NGAY_PHAN_HOI);

    // Internal field chỉ phục vụ tìm kiếm
    result.__DATE = parseDate(result.NGAY_PHAN_HOI);
  }

  // ============================
  // Chuẩn hóa NGÀY TIẾP NHẬN
  // ============================

  if ("NGAY_TIEP_NHAN" in result) {
    result.NGAY_TIEP_NHAN = normalizeDate(result.NGAY_TIEP_NHAN);

    // Internal field chỉ phục vụ tìm kiếm
    result.__NGAY_TIEP_NHAN = parseDate(result.NGAY_TIEP_NHAN);
  }

  // ============================
  // Chuẩn hóa VI PHẠM
  // ============================

  const value = String(result.VI_PHAM).trim().toUpperCase();

  if (value.includes("HỖ TRỢ KHÁCH HÀNG")) {
    result.__VI_PHAM_TYPE = "SUPPORT";
  } else if (value.includes("KHÔNG VI PHẠM")) {
    result.__VI_PHAM_TYPE = "NO";
  } else if (value.includes("CÓ VI PHẠM")) {
    result.__VI_PHAM_TYPE = "YES";
  } else {
    result.__VI_PHAM_TYPE = "";
  }
  return result;
}
