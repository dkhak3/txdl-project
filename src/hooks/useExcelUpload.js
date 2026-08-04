import { useDispatch, useSelector } from "react-redux";

import {
  setExcelData,
  setLoading,
  setError,
  resetExcel,
  selectExcel,
} from "../redux/excelSlice";

import { readExcel } from "../services/excelService";
import { useRef } from "react";

export default function useExcelUpload() {
  const dispatch = useDispatch();

  const excel = useSelector(selectExcel);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      dispatch(setLoading(true));

      const excelData = await readExcel(file);

      dispatch(setExcelData(excelData));
    } catch (error) {
      dispatch(setError(error.message));

      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fileInputRef = useRef(null);

  const clearFile = () => {
    dispatch(resetExcel());

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    handleFile,

    fileInputRef,
    clearFile,

    loading: excel.loading,

    error: excel.error,

    fileName: excel.fileName,

    hasFile: excel.sheet1.length > 0,

    sheet1: excel.sheet1,

    sheet2: excel.sheet2,

    sheet1Total: excel.sheet1Total,

    sheet2Total: excel.sheet2Total,
  };
}
