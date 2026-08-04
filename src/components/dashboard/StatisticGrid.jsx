// src/components/dashboard/StatisticGrid.jsx

import StatisticCard from "./StatisticCard";

function StatisticGrid({
  total = 0,

  khongViPham = 0,

  viPham = 0,

  hoTroKhachHang = 0,
}) {
  return (
    <section
      className="
            mt-8
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
            "
    >
      <StatisticCard
        title="TỔNG PHẢN ÁNH"
        value={total}
        color="text-orange-500"
      />

      <StatisticCard
        title="KHÔNG VI PHẠM"
        value={khongViPham}
        color="text-green-600"
      />

      <StatisticCard title="VI PHẠM" value={viPham} color="text-red-600" />

      <StatisticCard
        title="HỖ TRỢ KHÁCH HÀNG"
        value={hoTroKhachHang}
        color="text-blue-600"
      />
    </section>
  );
}

export default StatisticGrid;
