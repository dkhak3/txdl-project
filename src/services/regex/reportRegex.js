/**
 * Chuẩn hóa khoảng trắng
 */
export function normalizeText(text = "") {
  return String(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lấy Chi nhánh
 *
 * Ví dụ:
 *
 * 1/ Chi nhánh/Đơn vị:
 * CN Bình Tân
 *
 * =>
 * CN Bình Tân
 */
export function extractChiNhanh(content = "") {
  if (!content) return "";

  const text = normalizeText(content);

  if (!text) return "";

  // FORM MỚI

  if (text.includes("1/ Nguồn tiếp nhận:")) {
    const match = text.match(
      /2\/[\s\S]*?:\s*([\s\S]*?)(?=3\/|4\/|5\/|6\/|7\/|$)/i,
    );

    return match ? match[1].trim() : "";
  }

  // FORM CŨ

  const match = text.match(
    /1\/[\s\S]*?:\s*([\s\S]*?)(?=2\/|3\/|4\/|5\/|6\/|$)/i,
  );

  return match ? match[1].trim() : "";
}

/**
 * Lấy Nội dung phản ánh
 *
 * Ví dụ:
 *
 * 5/ Nội dung tiếp nhận PA/KN:
 * Xe chạy ẩu...
 * 6/ Thông tin KH
 *
 * =>
 * Xe chạy ẩu...
 */
export function extractNoiDung(content = "") {
  if (!content) return "";

  const text = normalizeText(content);
  if (!text) return "";

  // FORM MỚI
  if (text.includes("1/ Nguồn tiếp nhận:")) {
    const match = text.match(/6\/[\s\S]*?:\s*([\s\S]*?)(?=\s*7\/[\s\S]*?:|$)/i);

    return match ? match[1].trim() : "";
  }

  // FORM CŨ
  const match = text.match(/5\/[\s\S]*?:\s*([\s\S]*?)(?=\s*6\/[\s\S]*?:|$)/i);

  return match ? match[1].trim() : "";
}
