function ReportStatisticGrid({
  total = 0,
  khongViPham = 0,
  viPham = 0,
  hoTroKhachHang = 0,
}) {
  const cards = [
    {
      title: "Tổng phản ánh",
      value: total,
      icon: "📊",
      color: "text-primary",
      bg: "bg-orange-50",
    },
    {
      title: "Không vi phạm",
      value: khongViPham,
      icon: "✅",
      color: "text-success",
      bg: "bg-green-50",
    },
    {
      title: "Vi phạm",
      value: viPham,
      icon: "⚠️",
      color: "text-danger",
      bg: "bg-red-50",
    },
    {
      title: "Hỗ trợ khách hàng",
      value: hoTroKhachHang,
      icon: "🤝",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div
              className={`
                flex h-14 w-14 items-center justify-center
                rounded-2xl text-3xl
                ${card.bg}
              `}
            >
              {card.icon}
            </div>

            <span className={`text-4xl font-bold ${card.color}`}>
              {card.value}
            </span>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-dark">{card.title}</h3>

            <p className="mt-1 text-sm text-gray-500">
              Thống kê theo dữ liệu báo cáo
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ReportStatisticGrid;
