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
            <th>STT</th>
            <th>Ngày phản hồi</th>
            <th>Tên NV QLCL-DV</th>
            <th>Nội dung tiếp nhận</th>
          </tr>
        </thead>

        <tbody>
          {results.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{formatDate(row["Ngày phản hồi"])}</td>

              <td>{row["Tên nhân viên QLCL-DV"]}</td>

              <td>{row["Nội dung tiếp nhận Phản ánh"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
