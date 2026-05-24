import { formatDate } from "../utils/dateUtils";

export default function ResultTable({ results }) {
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2>Kết quả tra cứu</h2>

        <span>{results.length} kết quả</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT job</th>
            <th>Ngày phản hồi</th>
            <th>Tên NV QLCL-DV</th>
            <th>Nội dung tiếp nhận</th>
          </tr>
        </thead>

        {/* <tbody>
          {results.map((row, index) => (
            <tr key={index}>
              <td>{row["STT"]}</td>

              <td>{formatDate(row["Ngày phản hồi"])}</td>

              <td>{row["Tên nhân viên QLCL-DV"]}</td>

              <td>{row["Nội dung tiếp nhận Phản ánh"]}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{item["STT"]}</td>

              <td>{formatDate(item["Ngày phản hồi"])}</td>

              <td>{item["Tên nhân viên QLCL-DV"]}</td>

              <td>{item["Nội dung tiếp nhận Phản ánh"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
