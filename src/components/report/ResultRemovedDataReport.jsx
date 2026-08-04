function ResultRemovedDataReport({ data = [] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className=" z-10 border-b bg-gray-50">
            <th className="w-16 px-5 py-4 text-center text-sm font-semibold uppercase text-gray-600">
              STT JOB
            </th>

            <th className="w-40 px-5 py-4 text-center text-sm font-semibold uppercase text-gray-600">
              Ngày tiếp nhận DVKH
            </th>

            <th className="w-40 px-5 py-4 text-left text-sm font-semibold uppercase text-gray-600">
              Tên nhân viên DVKH
            </th>

            <th className="w-40 px-5 py-4 text-center text-sm font-semibold uppercase text-gray-600">
              Ngày phản hồi QLCL-DV
            </th>

            <th className="w-40 px-5 py-4 text-left text-sm font-semibold uppercase text-gray-600">
              Tên nhân viên QLCL-DV
            </th>

            <th className="w-auto px-5 py-4 text-left text-sm font-semibold uppercase text-gray-600">
              Nội dung phản ánh
            </th>

            <th className="w-auto px-5 py-4 text-left text-sm font-semibold uppercase text-gray-600">
              Lý do loại phản ánh
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.STT}
              className="
                border-b
                transition-colors
                duration-200
                hover:bg-orange-50
              "
            >
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center font-medium">
                {item.STT}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center">
                {item.NGAY_TIEP_NHAN}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap font-medium">
                {item.TEN_NHAN_VIEN_DVKH}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-center">
                {item.NGAY_PHAN_HOI}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap font-medium">
                {item.TEN_NHAN_VIEN_QLCL}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-gray-700">
                {item.NOI_DUNG_TIEP_NHAN_PHAN_ANH}
              </td>
              <td className="px-5 py-4 break-words whitespace-pre-wrap text-red-600 font-semibold">
                {item.LY_DO}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultRemovedDataReport;
