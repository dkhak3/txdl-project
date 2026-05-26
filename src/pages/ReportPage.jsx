import { useState } from "react";

import { useSelector } from "react-redux";

// import * as XLSX from "xlsx";
import * as XLSX from "xlsx-js-style";

import { saveAs } from "file-saver";

import toast from "react-hot-toast";

import Button from "../components/Button";

import "../styles/report.css";

import { normalizeText } from "../utils/textUtils";

export default function ReportPage({ setCurrentPage }) {
  // =========================
  // REDUX DATA
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

    const day = String(d.getDate()).padStart(2, "0");

    const month = String(d.getMonth() + 1).padStart(2, "0");

    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // =========================
  // COPY DATE
  // =========================

  const handleCopyDate = async () => {
    const text = `Từ ngày ${formatDate(startDate)} đến ngày ${formatDate(endDate)}`;

    await navigator.clipboard.writeText(text);

    toast.success("Đã copy thời gian");
  };

  // =========================
  // COPY EMPLOYEE
  // =========================

  const handleCopyEmployees = async () => {
    await navigator.clipboard.writeText(employeeInput);

    toast.success("Đã copy danh sách nhân viên");
  };

  // =========================
  // EXTRACT CHI NHÁNH
  // =========================

  const extractBranch = (text) => {
    if (!text) return "";

    // CASE MỚI:
    // Có "1/ Nguồn tiếp nhận:"
    // => lấy từ 2/ Chi nhánh/Đơn vị:

    if (text.includes("1/ Nguồn tiếp nhận:")) {
      const match = text.match(
        // /2\/\s*Chi nhánh\/Đơn vị:\s*([\s\S]*?)(?=3\/|4\/|5\/|6\/|7\/|$)/i,
        /2\/[\s\S]*?:\s*([\s\S]*?)(?=3\/|4\/|5\/|6\/|7\/|$)/i,
      );

      return match ? match[1].trim() : "";
    }

    // CASE CŨ
    // lấy từ 1/ Chi nhánh/Đơn vị:

    const match = text.match(
      /1\/[\s\S]*?:\s*([\s\S]*?)(?=2\/|3\/|4\/|5\/|6\/|$)/i,
    );

    return match ? match[1].trim() : "";
  };

  // =========================
  // EXTRACT NỘI DUNG
  // =========================

  const extractComplaintContent = (text) => {
    if (!text) return "";

    // CASE MỚI:
    // Có "1/ Nguồn tiếp nhận:"
    // => lấy từ 6/ Nội dung tiếp nhận PA/KN:

    if (text.includes("1/ Nguồn tiếp nhận:")) {
      const match = text.match(
        // /6\/\s*Nội dung tiếp nhận PA\/KN:\s*([\s\S]*?)(?=7\/|$)/i,
        /6\/[\s\S]*?:\s*([\s\S]*?)(?=7\/|$)/i,
      );

      return match ? match[1].trim() : "";
    }

    // CASE CŨ
    // lấy từ 5/

    const match = text.match(/5\/[\s\S]*?:\s*([\s\S]*?)(?=6\/|$)/i);

    return match ? match[1].trim() : "";
  };
  // =========================
  // BUILD REPORT DATA
  // =========================

  const usedIndexes = new Set();

  const reportData = results.map((item, index) => {
    // SHEET1

    const employeeName = normalizeText(item["STT"]);

    const rawContent = item["Nội dung tiếp nhận Phản ánh"] || "";

    // =========================
    // MATCH SHEET2
    // =========================

    const matchedIndex = secondSheetData.findIndex((row, rowIndex) => {
      // KHÔNG DÙNG LẠI DÒNG ĐÃ MATCH

      if (usedIndexes.has(rowIndex)) {
        return false;
      }

      const sheet2Employee = normalizeText(row[1]);

      return sheet2Employee === employeeName;
    });

    // ĐÁNH DẤU ĐÃ DÙNG

    if (matchedIndex !== -1) {
      usedIndexes.add(matchedIndex);
    }

    const matchedRow = secondSheetData[matchedIndex];

    // =========================
    // VI PHẠM
    // =========================

    const violationRaw = String(matchedRow?.[9] || "").trim();

    const normalizedViolation = normalizeText(violationRaw);

    // KHÔNG VI PHẠM

    const isKhongViPham = normalizedViolation === "khong vi pham";

    // CÓ VI PHẠM

    const isCoViPham = normalizedViolation === "co vi pham";

    // TEXT KHÁC

    const otherViolationText =
      !isKhongViPham && !isCoViPham ? violationRaw : "";

    return {
      // STT WEB

      stt: index + 1,

      // SHEET1

      chiNhanh: extractBranch(rawContent),

      noiDungPhanAnh: extractComplaintContent(rawContent),

      // SHEET2

      tuyen: matchedRow?.[4] || "",

      nhanVienBiPhanAnh: matchedRow?.[5] || "",

      bks: matchedRow?.[7] || "",

      // KHÔNG VI PHẠM

      khongViPham: isKhongViPham ? 1 : "",

      // VI PHẠM

      viPham: isCoViPham ? 1 : otherViolationText,
    };
  });

  // =========================
  // EXPORT EXCEL
  // =========================

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      toast.error("Không có dữ liệu");

      return;
    }

    // =========================
    // DATA
    // =========================

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

    // =========================
    // SHEET
    // =========================

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // =========================
    // COLUMN WIDTH
    // =========================

    worksheet["!cols"] = [
      { wch: 8 }, // STT

      { wch: 16 }, // CHI NHÁNH

      { wch: 35 }, // TUYẾN

      { wch: 16 }, // BKS

      { wch: 80 }, // NỘI DUNG

      { wch: 35 }, // NHÂN VIÊN

      { wch: 18 }, // KHÔNG VP

      { wch: 18 }, // VP
    ];

    // =========================
    // STYLE
    // =========================

    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({
          r: row,
          c: col,
        });

        if (!worksheet[cellAddress]) continue;

        // HEADER

        if (row === 0) {
          worksheet[cellAddress].s = {
            font: {
              name: "Times New Roman",

              sz: 12,

              bold: true,

              color: {
                rgb: "FFFFFF",
              },
            },

            fill: {
              fgColor: {
                rgb: "2563EB",
              },
            },

            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },

            border: {
              top: {
                style: "thin",
              },

              bottom: {
                style: "thin",
              },

              left: {
                style: "thin",
              },

              right: {
                style: "thin",
              },
            },
          };
        }

        // BODY
        else {
          worksheet[cellAddress].s = {
            font: {
              name: "Times New Roman",

              sz: 12,
            },

            alignment: {
              horizontal:
                col === 2 || col === 4 || col === 5 ? "left" : "center",

              vertical: "center",

              wrapText: true,
            },

            border: {
              top: {
                style: "thin",
              },

              bottom: {
                style: "thin",
              },

              left: {
                style: "thin",
              },

              right: {
                style: "thin",
              },
            },
          };
        }
      }
    }

    // =========================
    // WORKBOOK
    // =========================

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCao");

    // =========================
    // EXPORT
    // =========================

    XLSX.writeFile(workbook, `BaoCao_${Date.now()}.xlsx`);

    toast.success("Export Excel thành công");
  };

  // =========================
  // PAGINATION DATA
  // =========================

  const indexOfLastRow = currentPage * rowsPerPage;

  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = reportData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(reportData.length / rowsPerPage);

  return (
    <div className="report-page">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="report-header">
        <div>
          <h1>Báo cáo hỗ trợ trích xuất</h1>

          {/* ACTIONS */}

          <div className="report-actions">
            {/* BACK */}

            <Button
              className="back-button"
              onClick={() => setCurrentPage("home")}
            >
              ← Quay lại
            </Button>

            {/* EXPORT */}

            <Button className="export-button" onClick={handleExportExcel}>
              ⬇ Tải Excel
            </Button>
          </div>
        </div>

        {/* TOTAL */}

        <p>
          Tổng số phản ánh:
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
            {currentRows.map((item, index) => (
              <tr key={index}>
                <td>{item.stt}</td>

                <td>{item.chiNhanh}</td>

                <td>{item.tuyen}</td>

                <td>{item.bks}</td>

                <td>{item.noiDungPhanAnh}</td>

                <td>{item.nhanVienBiPhanAnh}</td>

                <td>{item.khongViPham}</td>

                <td>{item.viPham}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ========================= */}
        {/* PAGINATION */}
        {/* ========================= */}

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
    </div>
  );
}
