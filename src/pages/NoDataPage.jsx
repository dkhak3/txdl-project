import { Link } from "react-router-dom";

function NoDataPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mb-6 text-7xl">📄</div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Chưa có dữ liệu
        </h1>

        <p className="mb-8 leading-7 text-gray-500">
          Bạn cần tải file Excel và thực hiện tra cứu ở trang Home trước khi xem
          báo cáo.
        </p>

        <Link
          to="/"
          className="
            inline-flex
            items-center
            rounded-xl
            bg-orange-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NoDataPage;
