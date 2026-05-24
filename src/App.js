import { useState } from "react";

import ExcelFilter from "./components/ExcelFilter";

import ReportPage from "./pages/ReportPage";

import "./styles/app.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return currentPage === "home" ? (
    <ExcelFilter setCurrentPage={setCurrentPage} />
  ) : (
    <ReportPage setCurrentPage={setCurrentPage} />
  );
}

export default App;
