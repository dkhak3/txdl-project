import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import toast from "react-hot-toast";

import { selectSheet1, selectSheet2 } from "../redux/excelSlice";

import {
  setResult,
  resetResult,
  resetCurrentPage,
} from "../redux/reportResultSlice";

import { buildReport } from "../services/reportService";

export default function useReportSearch() {
  const dispatch = useDispatch();

  const sheet1 = useSelector(selectSheet1);
  const sheet2 = useSelector(selectSheet2);

  /**
   * Tìm kiếm báo cáo
   */
  const handleSearch = useCallback(
    ({ startDate, endDate }) => {
      if (!sheet1.length || !sheet2.length) {
        toast.error("Vui lòng chọn file Excel.");
        return;
      }

      if (startDate && endDate && startDate > endDate) {
        toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
        return;
      }

      const result = buildReport(sheet1, sheet2, startDate, endDate);

      

      dispatch(resetCurrentPage());
      dispatch(setResult(result));

      toast.success(`Tìm thấy ${result.totalMatched} phản ánh.`);
    },
    [dispatch, sheet1, sheet2],
  );

  /**
   * Xóa kết quả tìm kiếm
   */
  const clearSearch = () => {
    dispatch(resetResult());
  };

  return {
    handleSearch,
    clearSearch,
  };
}
