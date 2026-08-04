import Button from "../common/Button";

function ExcelFilter({
  startDate,
  endDate,
  employeeInput,

  onStartDateChange,
  onEndDateChange,
  onEmployeeChange,
  onFileChange,

  onSearch,
  onExport,
  onReport,
  onReset,

  canExport,
  canReport,

  fileName,
  loading,
  error,

  sheet1Total,

  sheet2Total,
}) {
  return (
    <section
      className="
      mt-8
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-8
      shadow-md
      "
    >
      <h2
        className="
        mb-8
        text-center
        text-3xl
        font-extrabold
        text-orange-500
        "
      >
        BỘ LỌC TRA CỨU
      </h2>

      {/* FILE */}

      <div className="mb-6">
        <label className="mb-2 block font-bold">FILE EXCEL</label>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileChange}
          className="
          w-full
          rounded-2xl
          border
          border-gray-300
          p-4
          "
        />

        {fileName && (
          <p className="mt-2 text-sm text-green-600">📄 {fileName}</p>
        )}

        {fileName && !loading && !error && (
          <div
            className="
      mt-4
      rounded-2xl
      border
      border-green-200
      bg-green-50
      p-4
      text-sm
    "
          >
            <p className="font-semibold text-green-700">
              ✅ Đọc file thành công
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Hãy chọn khoảng thời gian rồi nhấn SEARCH.
            </p>

            <p className="mt-2">
              📄 <strong>{fileName}</strong>
            </p>

            <p>
              📑 Sheet 1: <strong>{sheet1Total.toLocaleString()}</strong> dòng
            </p>

            <p>
              📑 Sheet 2: <strong>{sheet2Total.toLocaleString()}</strong> dòng
            </p>
          </div>
        )}

        {loading && <p className="mt-2 text-blue-600">Đang đọc file...</p>}

        {error && <p className="mt-2 text-red-600">❌ {error}</p>}
      </div>

      {/* DATE */}

      <div
        className="
        mb-6
        grid
        gap-6
        md:grid-cols-2
        "
      >
        <div>
          <label className="mb-2 block font-bold">NGÀY BẮT ĐẦU</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="
            w-full
            rounded-2xl
            border
            border-gray-300
            p-4
            "
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">NGÀY KẾT THÚC</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="
            w-full
            rounded-2xl
            border
            border-gray-300
            p-4
            "
          />
        </div>
      </div>

      {/* EMPLOYEE */}

      <div>
        <label className="mb-2 block font-bold">NHÂN VIÊN QLCL-DV</label>

        <input
          value={employeeInput}
          onChange={(e) => onEmployeeChange(e.target.value)}
          placeholder="VD: Nguyễn Văn A, Trần Văn B..."
          className="
          w-full
          rounded-2xl
          border
          border-gray-300
          p-4
          "
        />

        <small className="mt-2 block mb-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-primary">
          Chỉ nhập tên những người làm chính.
        </small>
      </div>

      {/* BUTTON */}

      <div
        className="
        mt-10
        flex
        flex-wrap
        justify-center
        gap-4
        "
      >
        <Button
          onClick={onSearch}
          disabled={!fileName || loading || !startDate || !endDate}
        >
          🔍 SEARCH
        </Button>
        <Button variant="danger" onClick={onReset}>
          RESET
        </Button>
        {/* <Button variant="success" onClick={onExport} disabled={!canExport}>
          📄 EXPORT
        </Button>

        <Button variant="secondary" onClick={onReport} disabled={!canReport}>
          📊 REPORT
        </Button> */}
      </div>
    </section>
  );
}

export default ExcelFilter;
