import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportReport(
  reportData,
  startDate,
  endDate,
  employeeInput,
) {
  try {
    // =========================
    // LOAD TEMPLATE
    // =========================

    const response = await fetch("/report-template.xlsx");

    if (!response.ok) {
      throw new Error("Không tìm thấy report-template.xlsx");
    }

    const workbook = new ExcelJS.Workbook();

    const buffer = await response.arrayBuffer();

    await workbook.xlsx.load(buffer);

    // const sheet = workbook.getWorksheet(1);

    // if (!sheet) {
    //   throw new Error("Template không có Sheet 1");
    // }

    console.log(
      workbook.worksheets.map((ws) => ({
        id: ws.id,
        name: ws.name,
      })),
    );

    const sheet = workbook.worksheets[0];

    if (!sheet) {
      throw new Error("Template không có worksheet");
    }

    // =========================
    // HEADER
    // =========================

    sheet.getCell("A4").value = `Họ & Tên: ${employeeInput}`;

    sheet.getCell("E2").value = `BÁO CÁO CÔNG VIỆC BỘ PHẬN QUẢN LÝ CLDV CITYBUS
    (Từ ngày ${startDate} đến ngày ${endDate})`;

    // =========================
    // TEMPLATE
    // =========================

    const startRow = 8;

    const templateRow = sheet.getRow(startRow);

    // =========================
    // NHÂN BẢN DÒNG MẪU
    // =========================

    if (reportData.length > 1) {
      for (let i = 1; i < reportData.length; i++) {
        sheet.duplicateRow(startRow, 1, true);
      }
    }

    // =========================
    // GHI DỮ LIỆU
    // =========================

    reportData.forEach((item, index) => {
      const row = sheet.getRow(startRow + index);

      row.height = templateRow.height;

      row.getCell(1).value = item.stt;
      row.getCell(2).value = item.chiNhanh;
      row.getCell(3).value = item.tuyen;
      row.getCell(4).value = item.bks;
      row.getCell(5).value = item.noiDungPhanAnh;
      row.getCell(6).value = item.nhanVienBiPhanAnh;
      row.getCell(7).value = item.khongViPham || "";
      row.getCell(8).value = item.viPham || "";

      row.commit();
    });

    // =========================
    // TỔNG
    // =========================

    const totalRowIndex = startRow + reportData.length;

    const khongVP = reportData.filter(
      (x) => Number(x.khongViPham) === 1,
    ).length;

    const coVP = reportData.filter((x) => Number(x.viPham) === 1).length;

    const totalRow = sheet.getRow(totalRowIndex);

    totalRow.getCell(7).value = khongVP;
    totalRow.getCell(8).value = coVP;

    totalRow.commit();

    // =========================
    // DOWNLOAD
    // =========================

    const excelBuffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `BaoCao_${Date.now()}.xlsx`,
    );
  } catch (err) {
    console.error(err);

    throw err;
  }
}
