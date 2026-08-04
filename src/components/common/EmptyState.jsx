function EmptyState() {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      gap-4
      py-16
      text-center
      "
    >
      <h1 className="text-7xl">📭</h1>

      <h2 className="text-3xl font-bold text-gray-700">Không có dữ liệu</h2>

      <p className="text-gray-500">Không tìm thấy phản ánh phù hợp.</p>

      <p className="text-gray-500">Vui lòng thử tìm kiếm lại.</p>
    </div>
  );
}

export default EmptyState;
