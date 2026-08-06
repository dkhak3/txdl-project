import toast from "react-hot-toast";

import { exportReportExcel } from "../services/export/reportExportService";

export default function useReportExport() {
  const handleExport = async ({ report, startDate, endDate, employeeName }) => {
    try {
      await exportReportExcel({
        report,
        startDate,
        endDate,
        employeeName,
      });

      toast.success("Xuất báo cáo thành công.");
    } catch (err) {
      console.error(err);

      toast.error(err.message || "Xuất báo cáo thất bại.");
    }
  };

  return {
    handleExport,
  };
}
