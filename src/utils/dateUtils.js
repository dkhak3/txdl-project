import * as XLSX from "xlsx";

export const parseDate = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  if (!isNaN(value)) {
    const excelDate = XLSX.SSF.parse_date_code(value);

    if (!excelDate) return null;

    return new Date(excelDate.y, excelDate.m - 1, excelDate.d);
  }

  const str = value.toString().trim();

  if (str.includes("/")) {
    const onlyDate = str.split(" ")[0];

    const parts = onlyDate.split("/");

    if (parts.length !== 3) return null;

    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  return new Date(str);
};

export const formatDate = (value) => {
  const date = parseDate(value);

  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
