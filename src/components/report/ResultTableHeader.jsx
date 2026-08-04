import Button from "../common/Button";

function ResultTableHeader({
  total = 0,
  onExport,
  onReport,
  disableExport = false,
  disableReport = false,
}) {
  return (
    <div className="border-b border-gray-200 bg-white px-8 py-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}

        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-primary">
            📋 SEARCH RESULT
          </div>

          <h2 className="text-3xl font-bold text-dark">Kết quả tra cứu</h2>

          <p className="mt-2 text-gray-500">
            Hiển thị <strong>{total}</strong> phản ánh phù hợp với điều kiện tìm
            kiếm.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap gap-3">
          <Button variant="success" onClick={onExport} disabled={disableExport}>
            📄 Xuất Excel
          </Button>

          <Button
            variant="secondary"
            onClick={onReport}
            disabled={disableReport}
          >
            📊 Báo cáo chính
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultTableHeader;
