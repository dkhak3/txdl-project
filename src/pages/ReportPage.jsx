// =========================
// IMPORT
// =========================

import { useMemo, useState } from "react";

import { useSelector } from "react-redux";

import * as XLSX from "xlsx-js-style";

import toast from "react-hot-toast";

import Button from "../components/Button";

import "../styles/report.css";

import { normalizeText } from "../utils/textUtils";

import { exportReport } from "../utils/reportExporter";

// =========================
// COMPONENT
// =========================

export default function ReportPage({ setCurrentPage }) {
  // =========================
  // REDUX
  // =========================

  const results = useSelector((state) => state.excel.results);

  const secondSheetData = useSelector((state) => state.excel.secondSheetData);

  const startDate = useSelector((state) => state.excel.startDate);

  const endDate = useSelector((state) => state.excel.endDate);

  const employeeInput = useSelector((state) => state.excel.employeeInput);

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(20);

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // =========================
  // COPY
  // =========================

  const copyText = async (text, message) => {
    await navigator.clipboard.writeText(text);

    toast.success(message);
  };

  const handleCopyDate = () =>
    copyText(
      `Từ ngày ${formatDate(startDate)} đến ngày ${formatDate(endDate)}`,
      "Đã copy thời gian",
    );

  const handleCopyEmployees = () =>
    copyText(employeeInput, "Đã copy danh sách nhân viên");

  // =========================
  // EXTRACT CHI NHÁNH
  // =========================

  const extractBranch = (text = "") => {
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
  };

  // =========================
  // EXTRACT NỘI DUNG
  // =========================

  const extractComplaintContent = (text = "") => {
    if (!text) return "";

    // FORM MỚI

    if (text.includes("1/ Nguồn tiếp nhận:")) {
      const match = text.match(/6\/[\s\S]*?:\s*([\s\S]*?)(?=7\/|$)/i);

      return match ? match[1].trim() : "";
    }

    // FORM CŨ

    const match = text.match(/5\/[\s\S]*?:\s*([\s\S]*?)(?=6\/|$)/i);

    return match ? match[1].trim() : "";
  };

  // =========================
  // BUILD SHEET2 MAP
  // (Giúp tìm kiếm nhanh hơn)
  // =========================

  const sheet2Map = useMemo(() => {
    const map = new Map();

    secondSheetData.forEach((row) => {
      const key = normalizeText(row[1]);

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key).push(row);
    });

    return map;
  }, [secondSheetData]);

  // =========================
  // BUILD VIOLATION
  // =========================

  const buildViolation = (value) => {
    const raw = String(value || "").trim();

    const normalized = normalizeText(raw);

    const isKhongViPham = normalized === "khong vi pham";

    const isCoViPham = normalized === "co vi pham";

    return {
      khongViPham: isKhongViPham ? 1 : "",

      viPham: isCoViPham ? 1 : !isKhongViPham ? raw : "",
    };
  };

  // =========================
  // BUILD REPORT DATA
  // =========================

  const reportData = useMemo(() => {
    const usedIndexes = new Set();

    return results.map((item, index) => {
      const stt = normalizeText(item["STT"]);

      const rawContent = item["Nội dung tiếp nhận Phản ánh"] || "";

      // =========================
      // MATCH SHEET2
      // =========================

      const rows = sheet2Map.get(stt) || [];

      let matchedRow = null;

      for (let i = 0; i < rows.length; i++) {
        if (!usedIndexes.has(rows[i])) {
          matchedRow = rows[i];

          usedIndexes.add(rows[i]);

          break;
        }
      }

      const violation = buildViolation(matchedRow?.[9]);

      return {
        stt: index + 1,

        chiNhanh: extractBranch(rawContent),

        noiDungPhanAnh: extractComplaintContent(rawContent),

        tuyen: matchedRow?.[4] || "",

        nhanVienBiPhanAnh: matchedRow?.[5] || "",

        bks: matchedRow?.[7] || "",

        khongViPham: violation.khongViPham,

        viPham: violation.viPham,
      };
    });
  }, [results, sheet2Map]);

  // =========================
  // EXPORT EXCEL
  // =========================

  const handleExportExcel = () => {
    if (!reportData.length) {
      toast.error("Không có dữ liệu");

      return;
    }

    // DATA EXPORT

    const exportData = reportData.map((item) => ({
      STT: item.stt,
      "CHI NHÁNH": item.chiNhanh,
      TUYẾN: item.tuyen,
      BKS: item.bks,
      "NỘI DUNG PHẢN ÁNH": item.noiDungPhanAnh,
      "NHÂN VIÊN BỊ PHẢN ÁNH": item.nhanVienBiPhanAnh,
      "KHÔNG VI PHẠM": item.khongViPham,
      "VI PHẠM": item.viPham,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // =========================
    // COLUMN WIDTH
    // =========================

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 16 },
      { wch: 35 },
      { wch: 16 },
      { wch: 80 },
      { wch: 35 },
      { wch: 18 },
      { wch: 18 },
    ];

    // =========================
    // STYLE
    // =========================

    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const address = XLSX.utils.encode_cell({
          r: row,
          c: col,
        });

        if (!worksheet[address]) continue;

        worksheet[address].s = {
          font: {
            name: "Times New Roman",
            sz: 12,
            bold: row === 0,
            color:
              row === 0
                ? {
                    rgb: "FFFFFF",
                  }
                : undefined,
          },

          fill:
            row === 0
              ? {
                  fgColor: {
                    rgb: "2563EB",
                  },
                }
              : undefined,

          alignment: {
            horizontal:
              row === 0
                ? "center"
                : col === 2 || col === 4 || col === 5
                  ? "left"
                  : "center",

            vertical: "center",

            wrapText: true,
          },

          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCao");

    XLSX.writeFile(workbook, `BaoCao_${Date.now()}.xlsx`);

    toast.success("Export Excel thành công");
  };

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(reportData.length / rowsPerPage);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;

    return reportData.slice(start, start + rowsPerPage);
  }, [reportData, currentPage, rowsPerPage]);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="report-page">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="report-header">
        <div>
          <h1>Báo cáo hỗ trợ trích xuất</h1>

          <div className="report-actions">
            {/* BACK */}

            <Button
              className="back-button"
              onClick={() => setCurrentPage("home")}
            >
              ← Quay lại
            </Button>

            {/* EXPORT */}

            <Button
              className="export-button"
              onClick={() =>
                exportReport(
                  reportData,
                  formatDate(startDate),
                  formatDate(endDate),
                  employeeInput,
                )
              }
            >
              ⬇ Tải Excel
            </Button>
          </div>
        </div>

        <p>
          Tổng số phản ánh
          <span>{reportData.length}</span>
        </p>
      </div>

      {/* ========================= */}
      {/* FILTER INFO */}
      {/* ========================= */}

      <div className="report-filter-info">
        {/* DATE */}

        <div className="report-info-card">
          <div className="info-header">
            <div className="info-title">📅 Khoảng thời gian</div>

            <button className="copy-button" onClick={handleCopyDate}>
              Copy
            </button>
          </div>

          <div className="info-content">
            Từ ngày {formatDate(startDate)} đến ngày {formatDate(endDate)}
          </div>
        </div>

        {/* EMPLOYEE */}

        <div className="report-info-card">
          <div className="info-header">
            <div className="info-title">👤 Nhân viên</div>

            <button className="copy-button" onClick={handleCopyEmployees}>
              Copy
            </button>
          </div>

          <div className="info-content">{employeeInput}</div>
        </div>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>STT</th>

              <th>CHI NHÁNH</th>

              <th>TUYẾN</th>

              <th>BKS</th>

              <th>Nội dung phản ánh</th>

              <th>Nhân viên bị phản ánh</th>

              <th>Không vi phạm</th>

              <th>Vi phạm</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((item) => (
                <tr key={item.stt}>
                  {/* STT */}
                  <td>{item.stt}</td>

                  {/* CHI NHÁNH */}
                  <td>{item.chiNhanh}</td>

                  {/* TUYẾN */}
                  <td>{item.tuyen}</td>

                  {/* BKS */}
                  <td>{item.bks}</td>

                  {/* NỘI DUNG */}
                  <td>{item.noiDungPhanAnh}</td>

                  {/* NHÂN VIÊN */}
                  <td>{item.nhanVienBiPhanAnh}</td>

                  {/* KHÔNG VI PHẠM */}
                  <td>{item.khongViPham}</td>

                  {/* VI PHẠM */}
                  <td>{item.viPham}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#6b7280",
                    fontStyle: "italic",
                  }}
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* =========================
            PAGINATION
        ========================= */}

        {reportData.length > 0 && (
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
                {[20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <span>dòng</span>
            </div>

            {/* CENTER */}

            <div
              style={{
                color: "#6b7280",
                fontWeight: 600,
              }}
            >
              Trang {currentPage} / {totalPages}
            </div>

            {/* RIGHT */}

            <div className="pagination-pages">
              {/* PREV */}

              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page ? "page-btn active" : "page-btn"
                    }
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* NEXT */}

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
