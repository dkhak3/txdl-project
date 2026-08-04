import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";

import { selectResult } from "../redux/reportResultSlice";
import ReportDataTable from "../components/report/ReportDataTable";
import ResultRemovedDataReport from "../components/report/ResultRemovedDataReport";

function RemovedReportPage() {
  const navigate = useNavigate();

  const report = useSelector(selectResult);

  const removedRows = report.removedRows || [];

  if (!removedRows.length) {
    return <Navigate to="/report" replace />;
  }

  console.log("Removed Rows:", removedRows);

  const handleBack = () => {
    navigate("/report");
  };

  const handleExport = () => {
    console.log("Export Removed Excel");
  };

  return (
    <Layout>
      <div
        className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <section
          className="
    rounded-3xl
    bg-gradient-to-r
    from-red-500
    to-red-600
    p-10
    text-white
    shadow-lg
  "
        >
          <h1 className="text-4xl font-extrabold">
            DANH SÁCH PHẢN ÁNH BỊ LOẠI
          </h1>

          <p className="mt-3 text-red-100 text-lg">
            Các phản ánh không thể xử lý do không tìm thấy dữ liệu đối chiếu.
          </p>
        </section>
        <div className="mb-8 flex items-center justify-between">
          <div className="mt-8">
            <div className="rounded-2xl border bg-white p-6 shadow">
              <p className="text-gray-500">Tổng phản ánh bị loại:</p>

              <h2 className="mt-2 text-4xl font-black text-red-600">
                {removedRows.length}
              </h2>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-5">
            <Button variant="success" onClick={handleExport}>
              📄 Xuất Excel
            </Button>

            <Button variant="secondary" onClick={handleBack}>
              ← Quay lại báo cáo chính
            </Button>
          </div>
        </div>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-sm
        "
      >
        {removedRows.length > 0 ? (
          <ResultRemovedDataReport data={removedRows} />
        ) : (
          <EmptyState />
        )}
      </div>
    </Layout>
  );
}

export default RemovedReportPage;
