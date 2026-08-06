import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import ReportHero from "../components/dashboard/ReportHero";
import ReportStatisticGrid from "../components/dashboard/ReportStatisticGrid";

import ReportTable from "../components/report/ReportTable";

import useFilter from "../hooks/useFilter";
import useReportSearch from "../hooks/useReportSearch";
import useReportExport from "../hooks/useReportExport";

import {
  selectCurrentPage,
  selectCurrentPageData,
  selectPageSize,
  selectResult,
  selectResultTotal,
  selectTotalPages,
  setCurrentPage,
  setPageSize,
} from "../redux/reportResultSlice";

import { selectResultData as selectHomeResultData } from "../redux/homeResultSlice";

import { selectEmployeeInput } from "../redux/filterSlice";

function ReportPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ========================================
      FILTER
  ======================================== */

  const { startDate, endDate, employeeInput } = useFilter();

  // const employeeInput = useSelector(selectEmployeeInput);

  /* ========================================
      SEARCH
  ======================================== */

  const { handleSearch } = useReportSearch();

  /* ========================================
      EXPORT
  ======================================== */

  const { handleExport } = useReportExport();

  /* ========================================
      RESULT
  ======================================== */

  const report = useSelector(selectResult);

  const data = useSelector(selectCurrentPageData);

  const total = useSelector(selectResultTotal);

  const currentPage = useSelector(selectCurrentPage);

  const totalPages = useSelector(selectTotalPages);

  const pageSize = useSelector(selectPageSize);

  const homeData = useSelector(selectHomeResultData);

  /* ========================================
      BUILD REPORT
  ======================================== */

  const hasBuilt = useRef(false);

  useEffect(() => {
    if (hasBuilt.current) return;

    if (homeData.length === 0) return;

    hasBuilt.current = true;

    handleSearch({
      startDate,
      endDate,
    });
  }, [homeData.length, handleSearch, startDate, endDate]);

  /* ========================================
      PAGINATION
  ======================================== */

  const handlePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSize = (size) => {
    dispatch(setPageSize(size));
  };

  /* ========================================
      EXPORT
  ======================================== */

  const onExport = () => {
    console.log(report);
    handleExport({
      report,
      startDate,
      endDate,
      employeeName: employeeInput,
      // report,
      // startDate: formatDate(startDate),
      // endDate: formatDate(endDate),
      // employeeName: employeeInput,
    });
  };

  /* ========================================
      BACK
  ======================================== */

  const handleBack = () => {
    navigate("/");
  };

  /* ========================================
      CHECK DATA
  ======================================== */

  if (!homeData.length) {
    return <Navigate to="/no-data" replace />;
  }

  /* ========================================
      FORMAT DATE
  ======================================== */

  const formatDate = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  return (
    <Layout>
      <ReportHero
        startDate={formatDate(startDate)}
        endDate={formatDate(endDate)}
        total={report.totalMatched || 0}
      />

      <ReportStatisticGrid
        total={report.totalMatched || 0}
        khongViPham={report.totalKhongViPham || 0}
        viPham={report.totalViPham || 0}
        hoTroKhachHang={report.totalHoTroKhachHang || 0}
      />

      {report.totalRemoved > 0 && (
        <div className="mb-6">
          <Link
            to="/report/removed"
            className="
              inline-flex
              items-center
              rounded-xl
              border
              border-red-300
              bg-red-50
              px-4
              py-2
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            🔍 Xem {report.totalRemoved} phản ánh bị loại
          </Link>
        </div>
      )}

      <ReportTable
        data={data}
        total={total}
        totalRecords={report.totalMatched}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePage}
        onPageSizeChange={handlePageSize}
        onExport={onExport}
        onBack={handleBack}
      />
    </Layout>
  );
}

export default ReportPage;
