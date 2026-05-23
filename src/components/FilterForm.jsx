import Button from "./Button";

export default function FilterForm({
  startDate,
  endDate,
  employeeInput,
  dispatch,
  setStartDate,
  setEndDate,
  setEmployeeInput,
  handleFileUpload,
  handleFilter,
  handleExportExcel,
}) {
  return (
    <div className="filter-card">
      <div className="form-group">
        <label>Upload File Excel</label>

        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ngày bắt đầu</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Ngày kết thúc</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => dispatch(setEndDate(e.target.value))}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Tên nhân viên QLCL-DV</label>

        <input
          type="text"
          placeholder="VD: Nguyễn Hữu Duy Kha, Nguyễn Văn A"
          value={employeeInput}
          onChange={(e) => dispatch(setEmployeeInput(e.target.value))}
        />
        <small>Nhập nhiều tên bằng dấu phẩy (,)</small>
      </div>

      <div className="button-group">
        <Button onClick={handleFilter}>Tìm kiếm</Button>

        <Button className="export-button" onClick={handleExportExcel}>
          Export Excel
        </Button>
      </div>
    </div>
  );
}
