import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { selectResultData } from "../redux/homeResultSlice";

import { exportHomeExcel } from "../services/export/homeExportService";

export default function useHomeExport(employeeInput = "") {
  const data = useSelector(selectResultData);

  const handleExport = () => {
    if (!data.length) {
      toast.error("Không có dữ liệu để xuất.");

      return;
    }

    try {
      exportHomeExcel(data, employeeInput);

      toast.success("Xuất file Excel thành công.");
    } catch (error) {
      console.error(error);

      toast.error("Xuất file Excel thất bại.");
    }
  };

  return {
    handleExport,
  };
}
