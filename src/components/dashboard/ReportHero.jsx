function ReportHero({
  startDate = "01/05/2026",
  endDate = "31/05/2026",
  total = 125,
}) {
  return (
    <section className="mb-8 rounded-3xl bg-white p-8 shadow-md">
      <div className="text-center">
        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          TXDL REPORT SYSTEM
        </span>

        <h1 className="mt-5 text-4xl font-bold text-dark">BÁO CÁO PHẢN ÁNH</h1>

        <p className="mt-3 text-gray-500">
          Thống kê dữ liệu phản ánh khách hàng
        </p>

        <div className="mt-6 inline-flex rounded-xl bg-gray-100 px-6 py-3">
          <span className="font-medium">
            {startDate} - {endDate}
          </span>
        </div>

        <div className="mt-6">
          <h2 className="text-5xl font-bold text-primary">{total}</h2>

          <p className="mt-2 text-gray-500">Tổng phản ánh</p>
        </div>
      </div>
    </section>
  );
}

export default ReportHero;
