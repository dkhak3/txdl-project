function ReportDataTable({ data = [] }) {
  console.log("ReportDataTable data: ", data);

  return (
    <div
      className="
        overflow-x-auto
        "
    >
      <table
        className="
            min-w-full
            "
      >
        <thead>
          <tr
            className="
                    bg-orange-500
                    text-white
                    "
          >
            <th className="p-4">STT</th>

            <th className="p-4">CHI NHÁNH</th>

            <th className="p-4">TUYẾN</th>

            <th className="p-4">BKS</th>

            <th className="p-4">Nội dung phản ánh</th>

            <th className="p-4">Nhân viên bị phản ánh</th>

            <th className="p-4">Giải tỏa</th>

            <th className="p-4">Vi phạm</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.STT}
              className="
                            border-b
                            hover:bg-orange-50
                            "
            >
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center font-medium">
                {index++}
              </td>

              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center">
                {item.CHI_NHANH}
              </td>

              <td className="px-5 py-4 break-words whitespace-pre-wrap">
                {item.TUYEN}
              </td>

              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center">
                {item.BIEN_KIEM_SOAT}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap">
                {item.DIEN_GIAI_CHI_TIET_NOI_DUNG}
              </td>

              <td className="px-5 py-4 break-words whitespace-pre-wrap">
                {item.HO_TEN_NHAN_VIEN_BI_PHAN_ANH}
              </td>
              {item.HO_TRO_KHACH_HANG ? (
                <td
                  colSpan={2}
                  className="px-4 py-3 text-center font-bold text-red-600"
                >
                  HỖ TRỢ KHÁCH HÀNG
                </td>
              ) : (
                <>
                  <td className="px-4 py-3 text-center">
                    {item.KHONG_VI_PHAM && (
                      <span className="font-bold text-green-600">
                        {item.KHONG_VI_PHAM}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.VI_PHAM && (
                      <span className="font-bold text-red-600">
                        {item.VI_PHAM}
                      </span>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportDataTable;
