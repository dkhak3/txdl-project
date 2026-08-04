// src/components/layout/Header.jsx

import { Link } from "react-router-dom";

function Header() {
  // const today = new Date().toLocaleDateString("vi-VN");
  const today = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header
      className="
      border-b
      border-gray-200
      bg-white
      shadow-sm
      "
    >
      <div
        className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        px-6
        py-6
        "
      >
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/logo-futa.png"
              alt="FUTA Logo"
              className="h-16 w-16 object-contain"
            />
          </Link>
          <div>
            <h1
              className="
              text-3xl
              font-extrabold
              tracking-wide
              text-primary
              "
            >
              TXDL REPORT SYSTEM
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Hệ thống hỗ trợ trích xuất dữ liệu
            </p>

            <p className="text-sm text-gray-500">
              Bộ phận Quản lý CLDV CITYBUS
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="text-right">
          <h3 className="font-bold text-dark">Version 2.0.0</h3>

          <p className="mt-1 text-sm text-gray-500">today {today}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
