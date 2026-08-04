import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import ReportHero from "../components/dashboard/ReportHero";
import ReportStatisticGrid from "../components/dashboard/ReportStatisticGrid";

import ReportTable from "../components/report/ReportTable";

import useFilter from "../hooks/useFilter";
import useReportSearch from "../hooks/useReportSearch";

import {
  selectCurrentPage,
  selectCurrentPageData,
  selectPageSize,
  selectResult,
  //   selectResultData,
  selectResultTotal,
  selectTotalPages,
  setCurrentPage,
  setPageSize,
} from "../redux/reportResultSlice";

import { selectResultData as selectHomeResultData } from "../redux/homeResultSlice";

function ReportPage() {
  const dispatch = useDispatch();

  /* ============================
      FILTER
  ============================ */

  const {
    startDate,
    endDate,

    handleStartDateChange,
    handleEndDateChange,
  } = useFilter();

  /* ============================
      SEARCH
  ============================ */

  const { handleSearch } = useReportSearch();

  /* ============================
      RESULT
  ============================ */

  const report = useSelector(selectResult);

  const data = useSelector(selectCurrentPageData);

  const total = useSelector(selectResultTotal);

  const currentPage = useSelector(selectCurrentPage);

  const totalPages = useSelector(selectTotalPages);

  const pageSize = useSelector(selectPageSize);

  /* ============================
      EVENTS
  ============================ */

  const handlePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSize = (size) => {
    dispatch(setPageSize(size));
  };

  const handleExport = () => {};

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  /* ============================
      CHECK DATA
  ============================ */
  const hasBuilt = useRef(false);

  const homeData = useSelector(selectHomeResultData);

  useEffect(() => {
    if (hasBuilt.current) return;

    if (homeData.length === 0) return;

    hasBuilt.current = true;

    handleSearch({
      startDate,
      endDate,
    });
  }, [homeData.length]);

  console.log("report", report);

  if (!homeData.length) {
    return <Navigate to="/no-data" replace />;
  }

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
        hoTroKhachHang={report.totalHoTroKhachHang}
      />
      {report.totalRemoved > 0 && (
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
    hover:bg-red-100
    transition
  "
        >
          🔍 Xem {report.totalRemoved} phản ánh bị loại
        </Link>
      )}

      <ReportTable
        data={data}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePage}
        onPageSizeChange={handlePageSize}
        onExport={handleExport}
        onBack={handleBack}
      />
    </Layout>
  );
}

export default ReportPage;
