import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { selectSheet1 } from "../redux/excelSlice";

import {
  setResult,
  resetResult,
  resetCurrentPage,
} from "../redux/homeResultSlice";

import { buildResult } from "../services/searchService";

export default function useSearch() {
  const dispatch = useDispatch();

  const sheet1 = useSelector(selectSheet1);

  const handleSearch = ({ startDate, endDate }) => {
    if (!sheet1.length) {
      toast.error("Vui lòng chọn file Excel.");
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }

    // const result = buildResult(sheet1, startDate, endDate);

    // dispatch(resetCurrentPage());

    const result = buildResult(sheet1, startDate, endDate);

    
    

    dispatch(resetCurrentPage());
    dispatch(setResult(result));

    // dispatch(setResult(result));

    if (result.totalMatched === 0) {
      toast("Không tìm thấy phản ánh.");
    } else {
      toast.success(`Tìm thấy ${result.totalMatched} phản ánh.`);
    }
  };

  const clearSearch = () => {
    dispatch(resetCurrentPage());
    dispatch(resetResult());
  };

  return {
    handleSearch,
    clearSearch,
  };
}
