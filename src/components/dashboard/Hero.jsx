function Hero() {
  return (
    <section
      className="
      mt-8
      overflow-hidden
      rounded-3xl
      bg-gradient-to-r
      from-orange-500
      to-orange-400
      px-10
      py-14
      text-white
      shadow-xl
      "
    >
      <div className="text-center">
        <h1
          className="
          text-5xl
          font-extrabold
          tracking-wide
          "
        >
          TXDL REPORT SYSTEM
        </h1>

        <p className="mt-3 text-xl font-semibold">Version 2.0.0</p>

        <p className="mt-6 text-lg">
          Hệ thống hỗ trợ làm báo cáo trích xuất dữ liệu phản ánh từ khách hàng
        </p>

        <p className="text-lg">Bộ phận Quản lý CLDV CITYBUS</p>

        <div
          className="
          mx-auto
          my-8
          h-[1px]
          w-40
          bg-white/40
          "
        />

        <p className="text-lg font-semibold tracking-widest">
          NHANH CHÓNG • CHÍNH XÁC • BẢO MẬT
        </p>
      </div>
    </section>
  );
}

export default Hero;
