import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";

import "./index.css";
import NoDataPage from "./pages/NoDataPage";
import NotFoundPage from "./pages/NotFoundPage";
import RemovedReportPage from "./pages/RemovedReportPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/report" element={<ReportPage />} />

      <Route path="/report/removed" element={<RemovedReportPage />} />

      <Route path="/no-data" element={<NoDataPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
