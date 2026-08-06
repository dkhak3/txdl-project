import Pagination from "./Pagination";

import EmptyState from "../common/EmptyState";

import ReportTableHeader from "./ReportTableHeader";

import ReportDataTable from "./ReportDataTable";

function ReportTable({
  data = [],

  total = 0,

  totalPages = 1,

  currentPage = 1,

  pageSize,
  totalRecords,
  onPageSizeChange,

  onPageChange,

  onExport,

  onBack,
}) {
  return (
    <section
      className="
        mt-8
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-md
        "
    >
      <ReportTableHeader total={total} onExport={onExport} onBack={onBack} />
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hiển thị</span>

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="
        rounded-lg
        border
        border-gray-300
        px-3
        py-2
        text-sm
      "
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span className="text-sm text-gray-600">dòng</span>
        </div>

        <div className="text-sm font-semibold text-gray-700">
          Tổng:
          <span className="ml-1 text-orange-600">{totalRecords}</span> bản ghi
        </div>
      </div>
      {data.length > 0 ? <ReportDataTable data={data} /> : <EmptyState />}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}

export default ReportTable;
