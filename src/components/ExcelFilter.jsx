import { useDispatch, useSelector } from "react-redux";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import FilterForm from "./FilterForm";

import ResultTable from "./ResultTable";

import { parseDate, formatDate } from "../utils/dateUtils";

import { normalizeText } from "../utils/textUtils";

import {
  setExcelData,
  setResults,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} from "../features/excel/excelSlice";

import {
  selectExcelData,
  selectResults,
  selectStartDate,
  selectEndDate,
  selectEmployeeInput,
} from "../features/excel/excelSelectors";

export default function ExcelFilter() {
  const dispatch = useDispatch();

  const excelData = useSelector(selectExcelData);

  const results = useSelector(selectResults);

  const startDate = useSelector(selectStartDate);

  const endDate = useSelector(selectEndDate);

  const employeeInput = useSelector(selectEmployeeInput);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const worksheet = workbook.Sheets["BP.DVKH gửi nội dung Phản ánh"];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
        range: 1,
      });

      dispatch(setExcelData(jsonData));

      alert("Upload Excel thành công!");
    };

    reader.readAsBinaryString(file);
  };

  const handleFilter = () => {
    const start = new Date(startDate);

    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const employeeArray = employeeInput
      .split(",")
      .map((x) => normalizeText(x))
      .filter(Boolean);

    const filtered = excelData.filter((row) => {
      const employeeKey = Object.keys(row).find((k) =>
        normalizeText(k).includes(normalizeText("Tên nhân viên QLCL-DV")),
      );

      const dateKey = Object.keys(row).find((k) =>
        normalizeText(k).includes(normalizeText("Ngày phản hồi")),
      );

      const contentKey = Object.keys(row).find((k) =>
        normalizeText(k).includes(normalizeText("Nội dung tiếp nhận Phản ánh")),
      );

      if (!employeeKey || !dateKey || !contentKey) return false;

      const excelEmployee = normalizeText(row[employeeKey]);

      const excelDate = parseDate(row[dateKey]);

      if (!excelDate) return false;

      const isEmployeeMatch = employeeArray.some((name) =>
        excelEmployee.includes(name),
      );

      const isDateMatch = excelDate >= start && excelDate <= end;
      console.log({
        employeeArray,
        excelEmployee,
        excelDate,
      });
      return isEmployeeMatch && isDateMatch;
    });

    dispatch(setResults(filtered));
  };

  const handleExportExcel = () => {
    const exportData = results.map((row, index) => ({
      STT: index + 1,

      "Ngày phản hồi": formatDate(row["Ngày phản hồi"]),

      "Tên nhân viên QLCL-DV": row["Tên nhân viên QLCL-DV"],

      "Nội dung tiếp nhận Phản ánh": row["Nội dung tiếp nhận Phản ánh"],
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "KetQua");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `KetQua_${Date.now()}.xlsx`);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Tra cứu phản ánh</h1>
      </div>

      <FilterForm
        startDate={startDate}
        endDate={endDate}
        employeeInput={employeeInput}
        dispatch={dispatch}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setEmployeeInput={setEmployeeInput}
        handleFileUpload={handleFileUpload}
        handleFilter={handleFilter}
        handleExportExcel={handleExportExcel}
      />

      <ResultTable results={results} />
    </div>
  );
}
