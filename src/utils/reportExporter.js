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

    sheet.getCell("E2").value = {
      richText: [
        {
          text: "BÁO CÁO CÔNG VIỆC BỘ PHẬN QUẢN LÝ CLDV CITYBUS\n",
          font: {
            name: "Times New Roman",
            bold: true,
            size: 16,
          },
        },
        {
          text: `(Từ ngày ${startDate} đến ngày ${endDate})`,
          font: {
            name: "Times New Roman",
            bold: true,
            italic: true,
            size: 13,
          },
        },
      ],
    };

    sheet.getCell("E2").alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };

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

      const rowNumber = startRow + index;

      row.height = templateRow.height;

      row.getCell(1).value = item.stt;
      row.getCell(2).value = item.chiNhanh;
      row.getCell(3).value = item.tuyen;
      row.getCell(4).value = item.bks;
      row.getCell(5).value = item.noiDungPhanAnh;
      row.getCell(6).value = item.nhanVienBiPhanAnh;
      row.getCell(7).value = item.khongViPham || "";
      row.getCell(8).value = item.viPham || "";

      //=========================
      // RESET FONT TOÀN BỘ DÒNG
      //=========================

      for (let i = 1; i <= 8; i++) {
        row.getCell(i).font = {
          name: "Times New Roman",
          size: 12,
          bold: false,
          color: {
            argb: "FF000000",
          },
        };
      }

      //=========================
      // CĂN LỀ
      //=========================

      for (let i = 1; i <= 8; i++) {
        row.getCell(i).alignment = {
          vertical: "middle",
          wrapText: true,
          horizontal: i === 3 || i === 5 || i === 6 ? "left" : "center",
        };
      }

      //=========================
      // HỖ TRỢ KHÁCH HÀNG
      //=========================

      const khongVPText = String(item.khongViPham || "").trim();

      if (khongVPText && Number(khongVPText) !== 1) {
        row.getCell(7).value = khongVPText;

        row.getCell(7).value = {
          richText: [
            {
              text: khongVPText,

              font: {
                name: "Times New Roman",

                size: 12,

                bold: true,

                color: {
                  argb: "FFFF0000",
                },
              },
            },
          ],
        };
        row.getCell(7).alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        // merge ô
        sheet.mergeCells(`G${rowNumber}:H${rowNumber}`);
      }

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

    // lấy dòng tổng
    const totalRow = sheet.getRow(totalRowIndex);
    // merge A -> F
    sheet.mergeCells(`A${totalRowIndex}:F${totalRowIndex}`);
    // ghi dữ liệu
    totalRow.getCell(1).value = "TỔNG";

    totalRow.getCell(7).value = khongVP;
    totalRow.getCell(8).value = coVP;

    // style
    for (let i = 1; i <= 8; i++) {
      totalRow.getCell(i).font = {
        name: "Times New Roman",

        size: 12,

        color: { argb: "FF0000" },

        bold: true,
      };

      totalRow.getCell(i).alignment = {
        horizontal: "center",

        vertical: "middle",

        wrapText: true,
      };

      totalRow.getCell(i).border = {
        top: {
          style: "thin",
        },

        bottom: {
          style: "thin",
        },

        left: {
          style: "thin",
        },

        right: {
          style: "thin",
        },
      };
    }

    totalRow.height = 24;

    totalRow.commit();

    // =========================
    // DOWNLOAD
    // =========================

    const excelBuffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      // `BaoCao_${Date.now()}.xlsx`,
      "CITYBUS - BÁO CÁO HỖ TRỢ TRÍCH XUẤT DỮ LIỆU BP.QLCL-DV.xlsx",
    );
  } catch (err) {
    console.error(err);

    throw err;
  }
}
