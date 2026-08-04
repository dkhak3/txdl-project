import Pagination from "./Pagination";

import EmptyState from "../common/EmptyState";

import ReportTableHeader from "./ReportTableHeader";

import ReportDataTable from "./ReportDataTable";

function ReportTable({
  data = [],

  total = 0,

  totalPages = 1,

  currentPage = 1,

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
