// services/homeSearchService.js

/**
 * Lọc Sheet1 theo khoảng ngày
 */
export function filterByDate(sheet1 = [], startDate, endDate) {
  if (!startDate || !endDate) {
    return sheet1;
  }

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return sheet1.filter((row) => {
    if (!row.__DATE) return false;

    return row.__DATE >= start && row.__DATE <= end;
  });
}

/**
 * Tạo dữ liệu cho HomePage
 */
export function buildHomeResult(sheet1 = [], startDate, endDate) {
  const totalBeforeFilter = sheet1.length;

  const filtered = filterByDate(sheet1, startDate, endDate);

  const result = filtered.map((row) => ({
    STT: row.STT,
    NGAY_PHAN_HOI: row.NGAY_PHAN_HOI,
    NGAY_TIEP_NHAN: row.NGAY_TIEP_NHAN,
    TEN_NHAN_VIEN_DVKH: row.TEN_NHAN_VIEN_DVKH,
    TEN_NHAN_VIEN_QLCL: row.TEN_NHAN_VIEN_QLCL,
    NOI_DUNG_TIEP_NHAN_PHAN_ANH: row.NOI_DUNG_TIEP_NHAN_PHAN_ANH,
  }));

  return {
    result,

    totalBeforeFilter,

    totalAfterFilter: filtered.length,

    totalMatched: filtered.length,

    totalRemoved: totalBeforeFilter - filtered.length,
  };
}
