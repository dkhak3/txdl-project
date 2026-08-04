function PageSizeSelector({ pageSize, total, onChange }) {
  const options = [10, 20, 50, 100, 200, 500];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Hiển thị</span>

      <select
        value={pageSize >= total ? "all" : pageSize}
        onChange={(e) => {
          const value = e.target.value;

          onChange(value === "all" ? total : Number(value));
        }}
        className="
          h-10
          rounded-lg
          border
          border-gray-300
          bg-white
          px-3
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-200
        "
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}

        <option value="all">Tất cả</option>
      </select>

      <span className="text-sm text-gray-600">dòng</span>
    </div>
  );
}

export default PageSizeSelector;
