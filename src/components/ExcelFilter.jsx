import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import toast from "react-hot-toast";

// COMPONENTS

import FilterForm from "./FilterForm";

import ResultTable from "./ResultTable";

// REDUX ACTIONS

import {
  setExcelData,
  setSecondSheetData,
  setResults,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} from "../features/excel/excelSlice";

// REDUX SELECTORS

import {
  selectExcelData,
  selectResults,
  selectStartDate,
  selectEndDate,
  selectEmployeeInput,
} from "../features/excel/excelSelectors";

// UTILS

import { parseDate, formatDate } from "../utils/dateUtils";

import { normalizeText } from "../utils/textUtils";

export default function ExcelFilter({ setCurrentPage }) {
  // =========================
  // REDUX
  // =========================

  const dispatch = useDispatch();

  // DATA SHEET1

  const excelData = useSelector(selectExcelData);

  // RESULT FILTER

  const results = useSelector(selectResults);

  // DATE START

  const startDate = useSelector(selectStartDate);

  // DATE END

  const endDate = useSelector(selectEndDate);

  // EMPLOYEE INPUT

  const employeeInput = useSelector(selectEmployeeInput);

  // =========================
  // CHECK REQUIRED
  // =========================

  // KIỂM TRA ĐÃ NHẬP ĐỦ
  // THÔNG TIN HAY CHƯA

  const hasRequiredData =
    startDate && endDate && employeeInput && excelData.length > 0;

  // =========================
  // PAGINATION
  // =========================

  // PAGE HIỆN TẠI

  const [currentPage, setPage] = useState(1);

  // SỐ DÒNG / TRANG

  const [rowsPerPage, setRowsPerPage] = useState(20);

  // INDEX DÒNG CUỐI

  const indexOfLastRow = currentPage * rowsPerPage;

  // INDEX DÒNG ĐẦU

  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // DATA CURRENT PAGE

  const currentRows = results.slice(indexOfFirstRow, indexOfLastRow);

  // TOTAL PAGE

  const totalPages = Math.ceil(results.length / rowsPerPage);

  // =========================
  // UPLOAD EXCEL
  // =========================

  const handleFileUpload = (e) => {
    // FILE USER CHỌN

    const file = e.target.files[0];

    if (!file) return;

    // CHỈ CHO PHÉP
    // FILE EXCEL

    const allowedExtensions = [".xlsx", ".xls"];

    const fileName = file.name.toLowerCase();

    const isExcelFile = allowedExtensions.some((ext) => fileName.endsWith(ext));

    // INVALID FILE

    if (!isExcelFile) {
      toast.error("Chỉ cho phép file Excel");

      e.target.value = "";

      return;
    }

    // FILE READER

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        // FILE DATA

        const data = evt.target.result;

        // READ WORKBOOK

        const workbook = XLSX.read(data, {
          type: "binary",
        });

        // =========================
        // SHEET 1
        // =========================

        // SHEET PHẢN ÁNH

        const firstSheetName = workbook.SheetNames[0];

        const firstWorksheet = workbook.Sheets[firstSheetName];

        // =========================
        // SHEET 2
        // =========================

        // SHEET TRÍCH XUẤT

        const secondSheetName = workbook.SheetNames[1];

        const secondWorksheet = workbook.Sheets[secondSheetName];

        // =========================
        // SHEET1 DATA
        // =========================

        // CONVERT JSON

        const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, {
          raw: true,

          defval: "",

          range: 1,
        });

        // =========================
        // SHEET2 DATA
        // =========================

        // ARRAY FORMAT

        const secondSheetRaw = XLSX.utils.sheet_to_json(secondWorksheet, {
          header: 1,

          raw: true,

          defval: "",
        });

        // REMOVE HEADER

        const secondSheetData = secondSheetRaw.slice(1);

        // =========================
        // SAVE REDUX
        // =========================

        dispatch(setExcelData(jsonData));

        dispatch(setSecondSheetData(secondSheetData));

        // SUCCESS

        toast.success(`Upload thành công ${jsonData.length} dòng`);
      } catch (error) {
        console.error(error);

        toast.error("File Excel không hợp lệ");
      }
    };

    // READ FILE

    reader.readAsBinaryString(file);
  };

  // =========================
  // FILTER DATA
  // =========================

  const handleFilter = () => {
    // START DATE

    const start = new Date(startDate);

    start.setHours(0, 0, 0, 0);

    // END DATE

    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    // =========================
    // EMPLOYEE ARRAY
    // =========================

    // SPLIT:
    // A,B,C -> [A,B,C]

    const employeeArray = employeeInput
      .split(",")
      .map((item) => normalizeText(item))
      .filter(Boolean);

    // =========================
    // FILTER SHEET1
    // =========================

    const filtered = excelData.filter((row) => {
      // EMPLOYEE

      const excelEmployee = normalizeText(row["Tên nhân viên QLCL-DV"]);

      // DATE

      const excelDate = parseDate(row["Ngày phản hồi"]);

      // INVALID DATE

      if (!excelDate) return false;

      // EMPLOYEE MATCH

      const isEmployeeMatch = employeeArray.some((name) =>
        excelEmployee.includes(name),
      );

      // DATE MATCH

      const isDateMatch = excelDate >= start && excelDate <= end;

      return isEmployeeMatch && isDateMatch;
    });

    // SAVE RESULT

    dispatch(setResults(filtered));

    console.log("FILTERED:", filtered);

    // NO DATA

    if (filtered.length === 0) {
      toast.error("Không tìm thấy dữ liệu");

      return;
    }

    // SUCCESS

    toast.success(`Tìm thấy ${filtered.length} kết quả`);
  };

  // =========================
  // EXPORT EXCEL
  // =========================

  const handleExportExcel = () => {
    // CHECK EMPTY

    if (results.length === 0) {
      toast.error("Không có dữ liệu");

      return;
    }

    // FORMAT DATA

    const exportData = results.map((row) => ({
      STT: row["STT"],

      "Ngày phản hồi": formatDate(row["Ngày phản hồi"]),

      "Tên nhân viên QLCL-DV": row["Tên nhân viên QLCL-DV"],

      "Nội dung tiếp nhận Phản ánh": row["Nội dung tiếp nhận Phản ánh"],
    }));

    // CREATE SHEET

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // CREATE WORKBOOK

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "KetQua");

    // WRITE BUFFER

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",

      type: "array",
    });

    // CREATE FILE

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    // DOWNLOAD

    saveAs(blob, `KetQua_${Date.now()}.xlsx`);

    // SUCCESS

    toast.success("Export Excel thành công");
  };

  return (
    <div className="app-container">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="app-header">
        <h1>Tra cứu phản ánh</h1>
      </div>

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}

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
        results={results}
        setCurrentPage={setCurrentPage}
        hasRequiredData={hasRequiredData}
      />

      {/* ========================= */}
      {/* RESULT TABLE */}
      {/* ========================= */}

      <ResultTable results={currentRows} />

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}

      {results.length > 0 && (
        <div className="pagination">
          {/* LEFT */}

          <div className="pagination-left">
            <span>Hiển thị</span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));

                setPage(1);
              }}
            >
              <option value={20}>20</option>

              <option value={50}>50</option>

              <option value={100}>100</option>
            </select>

            <span>dòng</span>
          </div>

          {/* RIGHT */}

          <div className="pagination-pages">
            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page ? "page-btn active" : "page-btn"
                }
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
