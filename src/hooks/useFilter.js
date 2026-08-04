import { useDispatch, useSelector } from "react-redux";

import {
  selectStartDate,
  selectEndDate,
  selectEmployeeInput,
  setStartDate,
  setEndDate,
  setEmployeeInput,
  resetFilter,
} from "../redux/filterSlice";

export default function useFilter() {
  const dispatch = useDispatch();

  const startDate = useSelector(selectStartDate);

  const endDate = useSelector(selectEndDate);

  const employeeInput = useSelector(selectEmployeeInput);

  return {
    startDate,

    endDate,

    employeeInput,

    handleStartDateChange: (value) => dispatch(setStartDate(value)),

    handleEndDateChange: (value) => dispatch(setEndDate(value)),

    handleEmployeeChange: (value) => dispatch(setEmployeeInput(value)),

    resetFilter: () => dispatch(resetFilter()),
  };
}
