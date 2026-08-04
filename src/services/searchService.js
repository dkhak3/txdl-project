/**
 * Lọc Sheet1 theo khoảng ngày
 */
// export function filterByDate(sheet1 = [], startDate, endDate) {
//   if (!startDate && !endDate) {
//     return sheet1;
//   }

//   console.log(sheet1[0]);
//   console.log(sheet1[0].__DATE);

//   const start = startDate
//     ? new Date(startDate + "T00:00:00").getTime()
//     : Number.MIN_SAFE_INTEGER;

//   const end = endDate
//     ? new Date(endDate + "T23:59:59").getTime()
//     : Number.MAX_SAFE_INTEGER;

//   return sheet1.filter((row) => {
//     if (row.__DATE == null) {
//       return false;
//     }

//     return row.__DATE >= start && row.__DATE <= end;
//   });
// }

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
 * Sinh dữ liệu cho HomePage
 * Chỉ hiển thị dữ liệu của Sheet1
 */
export function buildResult(sheet1 = [], startDate, endDate) {
  const totalBeforeFilter = sheet1.length;

  const filteredSheet1 = filterByDate(sheet1, startDate, endDate);

  const result = filteredSheet1.map((row) => ({
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

    totalAfterFilter: filteredSheet1.length,

    totalMatched: result.length,

    totalRemoved: totalBeforeFilter - filteredSheet1.length,
  };
}
