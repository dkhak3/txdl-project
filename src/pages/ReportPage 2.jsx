import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import Button from "../components/Button";

import "../styles/report.css";

import { normalizeText } from "../utils/textUtils";

export default function ReportPage({ setCurrentPage }) {
  const results = useSelector((state) => state.excel.results);

  const secondSheetData = useSelector((state) => state.excel.secondSheetData);

  const startDate = useSelector((state) => state.excel.startDate);

  const endDate = useSelector((state) => state.excel.endDate);

  const employeeInput = useSelector((state) => state.excel.employeeInput);

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
  // COPY
  // =========================

  const handleCopyDate = async () => {
    const text = `Từ ngày ${formatDate(startDate)} đến ngày ${formatDate(endDate)}`;

    await navigator.clipboard.writeText(text);

    toast.success("Đã copy thời gian");
  };

  const handleCopyEmployees = async () => {
    await navigator.clipboard.writeText(employeeInput);

    toast.success("Đã copy danh sách");
  };

  // =========================
  // EXTRACT CHI NHÁNH
  // =========================

  const extractBranch = (text) => {
    if (!text) return "";

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

    const match = text.match(/5\/[\s\S]*?:\s*([\s\S]*?)(?=6\/|$)/i);

    return match ? match[1].trim() : "";
  };

  // =========================
  // NORMALIZE STT
  // =========================

  const normalizeSTT = (value) => {
    return String(value || "")
      .trim()
      .replace(".0", "");
  };

  // =========================
  // BUILD MAP SHEET2
  // =========================

  const secondSheetMap = {};

  secondSheetData.forEach((row) => {
    const stt = normalizeSTT(row[1]);

    secondSheetMap[stt] = {
      tuyen: row[4] || "",

      nhanVienBiPhanAnh: row[5] || "",

      bks: row[7] || "",

      viPham: row[9] || "",
    };
  });

  // =========================
  // REPORT DATA
  // =========================

  const reportData = results.map((item, index) => {
    // SHEET1

    const employeeName = normalizeText(item["Tên nhân viên QLCL-DV"]);

    // FIND SHEET2

    const matchedRow = secondSheetData.find((row) => {
      const sheet2Employee = normalizeText(row[3]);

      return sheet2Employee === employeeName;
    });

    console.log({
      employeeName,
      matchedRow,
    });

    // VI PHẠM

    const violationValue = normalizeText(matchedRow?.[9] || "");

    // SHEET1 CONTENT

    const rawContent = item["Nội dung tiếp nhận Phản ánh"] || "";

    return {
      stt: index + 1,

      // SHEET1

      chiNhanh: extractBranch(rawContent),

      noiDungPhanAnh: extractComplaintContent(rawContent),

      // SHEET2

      tuyen: matchedRow?.[4] || "",

      nhanVienBiPhanAnh: matchedRow?.[5] || "",

      bks: matchedRow?.[7] || "",

      // VI PHẠM

      khongViPham: violationValue.includes("khong vi pham") ? "✓" : "",

      viPham:
        violationValue.includes("vi pham") &&
        !violationValue.includes("khong vi pham")
          ? "✓"
          : "",
    };
  });

  // console.log("REPORT DATA:", reportData);

  return (
    <div className="report-page">
      {/* HEADER */}

      <div className="report-header">
        <div>
          <h1>Báo cáo hỗ trợ trích xuất</h1>

          <Button
            className="back-button"
            onClick={() => setCurrentPage("home")}
          >
            ← Quay lại
          </Button>
        </div>

        <p>
          Tổng số phản ánh:
          <span>{reportData.length}</span>
        </p>
      </div>

      {/* FILTER */}

      <div className="report-filter-info">
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

      {/* TABLE */}

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
            {reportData.map((item, index) => (
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
      </div>
    </div>
  );
}
