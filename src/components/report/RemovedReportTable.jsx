import EmptyState from "../common/EmptyState";
import Pagination from "../common/Pagination";
import PageSizeSelector from "../common/PageSizeSelector";
import ReportDataTable from "./ReportDataTable";
import ReportTableHeader from "./ReportTableHeader";
import ResultRemovedDataReportTable from "./ResultRemovedDataReportTable";
import RemovedReportTableHeader from "./RemovedReportTableHeader";

function RemovedReportTable({
  data = [],
  total = 0,

  onExport,
  onReport,
  onBack,

  currentPage,
  totalPages,
  pageSize,

  onPageChange,
  onPageSizeChange,
}) {
  return (
    <section className=" overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mt-8">
      <RemovedReportTableHeader
        data={data}
        total={total}
        onExport={onExport}
        onBack={onBack}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
        <PageSizeSelector
          pageSize={pageSize}
          total={total}
          onChange={onPageSizeChange}
        />

        <div className="text-sm text-gray-500">
          Tổng:
          <span className="ml-1 font-semibold text-gray-800">
            {total.toLocaleString()}
          </span>{" "}
          bản ghi
        </div>
      </div>

      {/* Table */}
      <div className="min-h-[420px]">
        {data.length > 0 ? (
          <ResultRemovedDataReportTable data={data} />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 bg-white px-6 py-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}

export default RemovedReportTable;
