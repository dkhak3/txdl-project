import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

function VideoGuidePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout>
      <section
        className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          md:p-8
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              🎬 Hướng dẫn sử dụng hệ thống
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Video hướng dẫn toàn bộ quy trình sử dụng TXDL.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            ← Quay lại
          </button>
        </div>

        {/* Video */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-black
            shadow-md
          "
        >
          <video className="aspect-video w-full" controls preload="metadata">
            <source src="/videos/txdl-guide.mp4" type="video/mp4" />
            Trình duyệt không hỗ trợ phát video.
          </video>
        </div>

        {/* Description */}
        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <h2 className="font-bold text-gray-800">📌 Nội dung hướng dẫn</h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Video hướng dẫn cách nhập thông tin, tải file Excel, thực hiện tra
            cứu dữ liệu, xem báo cáo, kiểm tra các phản ánh bị loại và xuất kết
            quả ra Excel.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default VideoGuidePage;
