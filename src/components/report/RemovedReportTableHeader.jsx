import Button from "../common/Button";

function RemovedReportTableHeader({
  data = 0,
  total = 0,
  onExport,
  onBack,
  disableExport = false,
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-gray-200 bg-white px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <div>
        <div className="mb-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-primary">
          📋 REMOVED REPORT RESULT
        </div>

        <h2 className="text-3xl font-bold text-dark">Kết quả báo cáo</h2>

        <p className="mt-2 text-gray-500">
          Hiển thị <strong>{data.length}</strong> phản ánh bị loại.
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-3">
        <Button variant="success" onClick={onExport} disabled={disableExport}>
          📄 Xuất Excel
        </Button>

        <Button variant="secondary" onClick={onBack}>
          ← Quay lại báo cáo chính
        </Button>
      </div>
    </div>
  );
}

export default RemovedReportTableHeader;
