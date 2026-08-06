import {
  loadTemplateWorkbook,
  getReportSheet,
  downloadWorkbook,
} from "./reportTemplateHelper";

import { fillHeader } from "./reportHeader";
import { fillBody } from "./reportBody";
import { fillSummary } from "./reportSummary";

/**
 * ======================================================
 * EXPORT REPORT
 * ======================================================
 */

export async function exportReportExcel({
  report,
  startDate,
  endDate,
  employeeName,
}) {
  const reportData = report?.data || [];

  if (reportData.length === 0) {
    throw new Error("Không có dữ liệu để xuất.");
  }

  /**
   * ============================
   * LOAD TEMPLATE
   * ============================
   */

  const workbook = await loadTemplateWorkbook();

  const sheet = getReportSheet(workbook);

  /**
   * ============================
   * HEADER
   * ============================
   */

  fillHeader(sheet, {
    startDate,
    endDate,
    employeeName,
  });

  /**
   * ============================
   * BODY
   * ============================
   */

  fillBody(sheet, reportData);

  /**
   * ============================
   * SUMMARY
   * ============================
   */

  fillSummary(sheet, report);

  /**
   * ============================
   * FILE NAME
   * ============================
   */

  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");

  const mm = String(today.getMonth() + 1).padStart(2, "0");

  const yyyy = today.getFullYear();

  const employee = employeeName?.trim() || "ALL";

  //   const fileName = `REPORT_${employee}_${dd}-${mm}-${yyyy}.xlsx`;
  const fileName = `CITYBUS - BÁO CÁO HỖ TRỢ TRÍCH XUẤT DỮ LIỆU BP.QLCL-DV.xlsx`;

  /**
   * ============================
   * DOWNLOAD
   * ============================
   */

  await downloadWorkbook(workbook, fileName);
}
