import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mb-6 text-8xl font-extrabold text-orange-500">404</div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Không tìm thấy trang
        </h1>

        <p className="mb-8 text-gray-500 leading-7">
          Trang bạn đang truy cập không tồn tại hoặc đã bị di chuyển.
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
          ← Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
