import { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import RemovedReportTable from "../components/report/RemovedReportTable";

import { selectResult } from "../redux/reportResultSlice";
import toast from "react-hot-toast/headless";

import useRemovedReportExport from "../hooks/useRemovedReportExport";
import useFilter from "../hooks/useFilter";

function RemovedReportPage() {
  const navigate = useNavigate();

  const { startDate, endDate, employeeInput } = useFilter();

  const report = useSelector(selectResult);

  const removedRows = report.removedRows || [];

  /* ============================
      PAGINATION
  ============================ */

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(20);

  const totalRecords = removedRows.length;

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return removedRows.slice(start, start + pageSize);
  }, [removedRows, currentPage, pageSize]);

  /* ============================
      EVENTS
  ============================ */

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handlePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleBack = () => {
    navigate("/report");
  };

  const { handleExport } = useRemovedReportExport();

  const onExport = () => {
    handleExport({
      removedRows,
      employeeName: employeeInput,
    });
  };

  if (!removedRows.length) {
    return <Navigate to="/report" replace />;
  }

  return (
    <Layout>
      {/* HERO */}

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
        <h1 className="text-4xl font-extrabold">DANH SÁCH PHẢN ÁNH BỊ LOẠI</h1>

        <p className="mt-3 text-lg text-red-100">
          Các phản ánh không thể xử lý do không tìm thấy dữ liệu đối chiếu.
        </p>
      </section>

      {/* TABLE */}

      <div className="mt-8">
        <RemovedReportTable
          data={currentData}
          total={totalRecords}
          totalRecords={totalRecords}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePage}
          onPageSizeChange={handlePageSize}
          onExport={onExport}
          onBack={handleBack}
        />
      </div>
    </Layout>
  );
}

export default RemovedReportPage;
