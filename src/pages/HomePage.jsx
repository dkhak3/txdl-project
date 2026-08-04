import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useExcelUpload from "../hooks/useExcelUpload";
import useFilter from "../hooks/useFilter";
import useSearch from "../hooks/useSearch";
import useHomeExport from "../hooks/useHomeExport";

import {
  selectCurrentPage,
  selectCurrentPageData,
  selectPageSize,
  selectResultTotal,
  selectTotalPages,
  setCurrentPage,
  setPageSize,
} from "../redux/homeResultSlice";

import Layout from "../components/layout/Layout";
import Hero from "../components/dashboard/Hero";
import StatisticGrid from "../components/dashboard/StatisticGrid";
import ExcelFilter from "../components/filter/ExcelFilter";
import ResultTable from "../components/report/ResultTable";

function HomePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /* ============================
      EXCEL
  ============================ */

  const {
    handleFile,
    clearFile,
    fileInputRef,

    fileName,
    loading,
    error,

    sheet1Total,
    sheet2Total,
  } = useExcelUpload();

  /* ============================
      FILTER
  ============================ */

  const {
    startDate,
    endDate,
    employeeInput,

    handleStartDateChange,
    handleEndDateChange,
    handleEmployeeChange,

    resetFilter,
  } = useFilter();

  /* ============================
      SEARCH
  ============================ */

  const { handleSearch, clearSearch } = useSearch();

  /* ============================
      RESULT
  ============================ */

  const data = useSelector(selectCurrentPageData);

  const total = useSelector(selectResultTotal);

  const currentPage = useSelector(selectCurrentPage);

  const totalPages = useSelector(selectTotalPages);

  const pageSize = useSelector(selectPageSize);

  /* ============================
      EXPORT
  ============================ */

  const { handleExport } = useHomeExport(employeeInput);

  /* ============================
      EVENTS
  ============================ */

  const handlePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSize = (size) => {
    dispatch(setPageSize(size));
  };

  const handleReport = () => {
    navigate("/report");
  };

  const handleReset = () => {
    clearFile();
    clearSearch();
    resetFilter();
  };

  /* ============================
      RENDER
  ============================ */

  return (
    <Layout>
      <Hero />

      {/* <StatisticGrid /> */}

      <ExcelFilter
        /* Upload */
        onFileChange={handleFile}
        fileName={fileName}
        loading={loading}
        error={error}
        sheet1Total={sheet1Total}
        sheet2Total={sheet2Total}
        /* Filter */
        startDate={startDate}
        endDate={endDate}
        employeeInput={employeeInput}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onEmployeeChange={handleEmployeeChange}
        /* Actions */
        onSearch={() =>
          handleSearch({
            startDate,
            endDate,
          })
        }
        onReset={handleReset}
        fileInputRef={fileInputRef}
        onReport={handleReport}
        canExport={total > 0}
        canReport={total > 0}
      />

      <ResultTable
        data={data}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePage}
        onPageSizeChange={handlePageSize}
        onExport={handleExport}
        onReport={handleReport}
      />
    </Layout>
  );
}

export default HomePage;
