export function normalizeDate(value) {
  if (!value) return "";

  // Đã đúng định dạng dd/MM/yyyy
  if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value;
  }

  // Date object
  if (value instanceof Date) {
    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const year = value.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // String có thể parse
  const date = new Date(value);

  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return String(value).trim();
}

export function parseDate(dateString) {
  if (!dateString) return null;

  const [day, month, year] = dateString.split("/");

  if (!day || !month || !year) {
    return null;
  }

  return new Date(year, month - 1, day).getTime();
}
