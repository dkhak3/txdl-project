import XLSX from "xlsx-js-style";

/**
 * Tạo Workbook
 */
export function createWorkbook() {
  return XLSX.utils.book_new();
}

/**
 * Tạo Worksheet
 */
export function createWorksheet(data = []) {
  return XLSX.utils.json_to_sheet(data);
}

/**
 * Thêm Worksheet vào Workbook
 */
export function appendWorksheet(workbook, worksheet, sheetName = "Sheet1") {
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

/**
 * Auto Width
 */
export function autoFitColumns(worksheet, data = []) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  worksheet["!cols"] = headers.map((header) => {
    let max = header.length;

    data.forEach((row) => {
      const value = row[header] ?? "";

      const length = String(value)
        .split("\n")
        .reduce((m, line) => Math.max(m, line.length), 0);

      max = Math.max(max, length);
    });

    return {
      wch: Math.min(Math.max(max + 4, 15), 80),
    };
  });
}

/**
 * Freeze Header
 */
export function freezeHeader(worksheet) {
  worksheet["!freeze"] = {
    xSplit: 0,
    ySplit: 1,
  };
}

/**
 * Filter
 */
export function enableFilter(worksheet) {
  if (!worksheet["!ref"]) return;

  worksheet["!autofilter"] = {
    ref: worksheet["!ref"],
  };
}

/**
 * Header Style
 */
// export function styleHeader(worksheet) {
//   if (!worksheet["!ref"]) return;

//   const range = XLSX.utils.decode_range(worksheet["!ref"]);

//   for (let col = range.s.c; col <= range.e.c; col++) {
//     const cell = XLSX.utils.encode_cell({
//       r: 0,
//       c: col,
//     });

//     if (!worksheet[cell]) continue;

//     worksheet[cell].s = {
//       font: {
//         bold: true,
//         color: {
//           rgb: "FFFFFF",
//         },
//       },

//       fill: {
//         fgColor: {
//           rgb: "F97316",
//         },
//       },

//       alignment: {
//         horizontal: "center",
//         vertical: "center",
//         wrapText: true,
//       },

//       border: {
//         top: {
//           style: "thin",
//         },
//         bottom: {
//           style: "thin",
//         },
//         left: {
//           style: "thin",
//         },
//         right: {
//           style: "thin",
//         },
//       },
//     };
//   }
// }
export function styleHeader(worksheet) {
  if (!worksheet["!ref"]) return;

  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let col = range.s.c; col <= range.e.c; col++) {
    const cell = XLSX.utils.encode_cell({
      r: 0,
      c: col,
    });

    if (!worksheet[cell]) continue;

    worksheet[cell].s = {
      font: {
        name: "Times New Roman",
        sz: 13,
        bold: true,
        color: {
          rgb: "FFFFFF",
        },
      },

      fill: {
        fgColor: {
          rgb: "F97316",
        },
      },

      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },

      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };
  }
}

/**
 * Style toàn bộ dữ liệu
 */
// export function styleBody(worksheet) {
//   if (!worksheet["!ref"]) return;

//   const range = XLSX.utils.decode_range(worksheet["!ref"]);

//   for (let row = 1; row <= range.e.r; row++) {
//     for (let col = range.s.c; col <= range.e.c; col++) {
//       const cell = XLSX.utils.encode_cell({
//         r: row,
//         c: col,
//       });

//       if (!worksheet[cell]) continue;

//       worksheet[cell].s = {
//         alignment: {
//           vertical: "top",
//           wrapText: true,
//         },

//         border: {
//           top: {
//             style: "thin",
//           },
//           bottom: {
//             style: "thin",
//           },
//           left: {
//             style: "thin",
//           },
//           right: {
//             style: "thin",
//           },
//         },
//       };
//     }
//   }
// }

export function styleBody(worksheet, data = []) {
  if (!worksheet["!ref"] || !data.length) return;

  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  const headers = Object.keys(data[0]);

  const contentCol = headers.indexOf("Nội dung tiếp nhận Phản ánh");

  for (let row = 1; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = XLSX.utils.encode_cell({
        r: row,
        c: col,
      });

      if (!worksheet[cell]) continue;

      worksheet[cell].s = {
        font: {
          name: "Times New Roman",
          sz: 13,
        },

        alignment: {
          horizontal: col === contentCol ? "left" : "center",
          vertical: "center",
          wrapText: true,
        },

        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    }
  }
}

/**
 * Download
 */
export function downloadWorkbook(workbook, fileName) {
  XLSX.writeFile(workbook, fileName);
}

/**
 * Sinh tên file
 */
export function generateFileName(prefix) {
  const now = new Date();

  const yyyy = now.getFullYear();

  const MM = String(now.getMonth() + 1).padStart(2, "0");

  const dd = String(now.getDate()).padStart(2, "0");

  const hh = String(now.getHours()).padStart(2, "0");

  const mm = String(now.getMinutes()).padStart(2, "0");

  return `${prefix}_${yyyy}${MM}${dd}_${hh}${mm}.xlsx`;
}
