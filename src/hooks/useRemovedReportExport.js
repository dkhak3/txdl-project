import toast from "react-hot-toast";

import { exportRemovedReportExcel } from "../services/export/removedReportExportService";

export default function useRemovedReportExport() {
  const handleExport = ({ removedRows, employeeName }) => {
    try {
      exportRemovedReportExcel(removedRows, employeeName);

      toast.success("Xuất Excel thành công.");
    } catch (err) {
      console.error(err);

      toast.error(err.message);
    }
  };

  return {
    handleExport,
  };
}
