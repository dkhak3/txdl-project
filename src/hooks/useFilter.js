import { useDispatch, useSelector } from "react-redux";

import {
  selectStartDate,
  selectEndDate,
  selectEmployeeInput,
  setStartDate,
  setEndDate,
  setEmployeeInput,
} from "../redux/filterSlice";

export default function useFilter() {
  const dispatch = useDispatch();

  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const employeeInput = useSelector(selectEmployeeInput);

  const handleStartDateChange = (value) => {
    dispatch(setStartDate(value));
  };

  const handleEndDateChange = (value) => {
    dispatch(setEndDate(value));
  };

  const handleEmployeeInputChange = (value) => {
    dispatch(setEmployeeInput(value));
  };

  return {
    startDate,
    endDate,
    employeeInput,

    handleStartDateChange,
    handleEndDateChange,
    handleEmployeeInputChange,
  };
}
