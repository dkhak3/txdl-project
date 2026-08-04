import { extractChiNhanh, extractNoiDung } from "./regex/reportRegex";

/**
 * Tạo Map Sheet2 theo STT
 */
export function buildSheet2Map(sheet2 = []) {
  const map = new Map();
  let skipped = 0;
  sheet2.forEach((row) => {
    if (!row.STT) return;
    const stt = String(row.STT || "").trim();

    if (Number.isNaN(Number(stt))) {
      // VD: "504 T04", "", "ABC"
      skipped++;
      return;
    }

    map.set(String(row.STT).trim(), row);
  });

  return map;
}

/**
 * Lọc Sheet1 theo ngày
 */
export function filterByDate(sheet1 = [], startDate, endDate) {
  if (!startDate && !endDate) return sheet1;

  const start = startDate
    ? (() => {
        const [y, m, d] = startDate.split("-").map(Number);
        return new Date(y, m - 1, d).getTime();
      })()
    : Number.MIN_SAFE_INTEGER;

  const end = endDate
    ? (() => {
        const [y, m, d] = endDate.split("-").map(Number);
        return new Date(y, m - 1, d).getTime() + 24 * 60 * 60 * 1000 - 1;
      })()
    : Number.MAX_SAFE_INTEGER;

  return sheet1.filter((row, index) => {
    return row.__DATE >= start && row.__DATE <= end;
  });
}

/**
 * Sort STT tăng dần
 */
export function sortBySTT(data = []) {
  return [...data].sort((a, b) => Number(a.STT) - Number(b.STT));
}

/**
 * Sinh dữ liệu Report
 */
export function buildReport(sheet1 = [], sheet2 = [], startDate, endDate) {
  const totalBeforeFilter = sheet1.length;

  const filteredSheet1 = filterByDate(sheet1, startDate, endDate);

  console.log("filteredSheet1 length:", filteredSheet1.length);
  console.log(filteredSheet1.slice(0, 5));

  const totalAfterFilter = filteredSheet1.length;

  const sheet2Map = buildSheet2Map(sheet2);

  const result = [];

  let totalViPham = 0;
  let totalKhongViPham = 0;
  let totalHoTroKhachHang = 0;

  const removedRows = [];

  filteredSheet1.forEach((row) => {
    console.log("Searching STT:", row.STT);

    const matchedRow = sheet2Map.get(String(row.STT).trim());

    console.log("Matched:", matchedRow);

    if (!matchedRow) {
      removedRows.push({
        STT: row.STT,
        NGAY_PHAN_HOI: row.NGAY_PHAN_HOI,
        NGAY_TIEP_NHAN: row.NGAY_TIEP_NHAN,
        TEN_NHAN_VIEN_DVKH: row.TEN_NHAN_VIEN_DVKH,
        TEN_NHAN_VIEN_QLCL: row.TEN_NHAN_VIEN_QLCL,
        NOI_DUNG_TIEP_NHAN_PHAN_ANH: row.NOI_DUNG_TIEP_NHAN_PHAN_ANH,

        LY_DO: `Không tìm thấy STT ${row.STT} của Sheet1 trong Sheet2`,
      });

      return;
    }

    const type = matchedRow.__VI_PHAM_TYPE;

    switch (type) {
      case "YES":
        totalViPham++;
        break;

      case "NO":
        totalKhongViPham++;
        break;

      case "SUPPORT":
        totalHoTroKhachHang++;
        break;

      default:
        break;
    }

    result.push({
      STT: row.STT,

      CHI_NHANH: extractChiNhanh(row.NOI_DUNG_TIEP_NHAN_PHAN_ANH),

      TUYEN: matchedRow.TUYEN ?? "",

      BIEN_KIEM_SOAT: matchedRow.BIEN_KIEM_SOAT ?? "",

      DIEN_GIAI_CHI_TIET_NOI_DUNG: extractNoiDung(
        row.NOI_DUNG_TIEP_NHAN_PHAN_ANH,
      ),

      HO_TEN_NHAN_VIEN_BI_PHAN_ANH:
        matchedRow.HO_TEN_NHAN_VIEN_BI_PHAN_ANH ?? "",

      KHONG_VI_PHAM: type === "NO" ? 1 : "",

      VI_PHAM: type === "YES" ? 1 : "",

      HO_TRO_KHACH_HANG: type === "SUPPORT",
    });
  });

  const sortedResult = sortBySTT(result);

  return {
    result: sortedResult,

    totalBeforeFilter,

    totalAfterFilter,

    totalMatched: sortedResult.length,

    totalRemoved: totalAfterFilter - sortedResult.length,

    totalViPham,

    totalKhongViPham,

    totalHoTroKhachHang,

    totalRemovedRow: removedRows.length,

    removedRows,
  };
}
