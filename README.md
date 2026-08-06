# 📊 TXDL Project

Website hỗ trợ **trích xuất dữ liệu phản ánh DVKH** từ file Excel, giúp đối chiếu dữ liệu giữa Sheet 1 và Sheet 2, thống kê kết quả và xuất báo cáo Excel.

---

## 🚀 Demo

🔗 https://txdl-project.vercel.app/

---

## 📂 Github

🔗 https://github.com/dkhak3/txdl-project

---

# Công nghệ sử dụng

- ReactJS
- Redux Toolkit
- TailwindCSS
- React Router DOM
- ExcelJS
- SheetJS (xlsx)
- React Hot Toast

---

# Chức năng

## 1. Trang Home

Cho phép người dùng:

- Chọn ngày bắt đầu
- Chọn ngày kết thúc
- Nhập danh sách nhân viên QLCL-DV
- Upload file Excel

Sau khi tìm kiếm sẽ:

- Đọc Sheet 1
- Lọc dữ liệu theo:
  - Ngày phản hồi
  - Tên nhân viên
- Hiển thị:

| STT JOB | Ngày tiếp nhận | Tên DVKH | Ngày phản hồi | Tên QLCL | Nội dung tiếp nhận |
| ------- | -------------- | -------- | ------------- | -------- | ------------------ |

---

## 2. Report

Đối chiếu dữ liệu giữa:

- Sheet 1
- Sheet 2

Hiển thị:

| STT | Chi nhánh | Tuyến | BKS | Nội dung phản ánh | Nhân viên bị phản ánh | Giải tỏa | Vi phạm |
| --- | --------- | ----- | --- | ----------------- | --------------------- | -------- | ------- |

Ngoài ra còn thống kê:

- Tổng phản ánh
- Không vi phạm
- Vi phạm
- Hỗ trợ khách hàng
- Phản ánh bị loại

---

## 3. Removed Report

Hiển thị các phản ánh không thể đối chiếu.

Bao gồm:

- STT JOB
- Ngày tiếp nhận DVKH
- Tên nhân viên DVKH
- Ngày phản hồi
- Tên nhân viên QLCL-DV
- Nội dung tiếp nhận
- Lý do loại

---

# Export Excel

## Home

Xuất trực tiếp từ dữ liệu bảng.

Bao gồm:

- STT JOB
- Ngày tiếp nhận
- Tên DVKH
- Ngày phản hồi
- Tên QLCL-DV
- Nội dung tiếp nhận

---

## Report

Xuất theo Template Excel.

Tự động:

- Điền Header
- Điền khoảng thời gian
- Điền tên nhân viên
- Giữ nguyên định dạng Template
- Merge HỖ TRỢ KHÁCH HÀNG
- Thống kê cuối bảng
- Tự động mở rộng số dòng theo dữ liệu

---

## Removed Report

Xuất giống Home Report.

Bao gồm:

- STT JOB
- Ngày tiếp nhận
- Tên DVKH
- Ngày phản hồi
- Tên QLCL-DV
- Nội dung tiếp nhận
- Lý do loại

---

# Cấu trúc thư mục

```
src
│
├── components
│   ├── common
│   ├── dashboard
│   ├── layout
│   └── report
│
├── hooks
│   ├── useFilter.js
│   ├── useHomeExport.js
│   ├── useReportExport.js
│   └── useRemovedReportExport.js
│
├── redux
│   ├── excelSlice.js
│   ├── filterSlice.js
│   ├── homeResultSlice.js
│   └── reportResultSlice.js
│
├── services
│   └── export
│       ├── exportUtils.js
│       ├── homeExportService.js
│       ├── removedReportExportService.js
│       │
│       └── report
│           ├── reportConstants.js
│           ├── reportTemplateHelper.js
│           ├── reportHeader.js
│           ├── reportBody.js
│           ├── reportSummary.js
│           └── reportExportService.js
│
└── pages
    ├── HomePage.jsx
    ├── ReportPage.jsx
    └── RemovedReportPage.jsx
```

---

# Cài đặt

```bash
git clone https://github.com/dkhak3/txdl-project.git
```

```bash
cd txdl-project
```

```bash
npm install
```

```bash
npm start
```

---

# Build

```bash
npm run build
```

---

# Tác giả

**Nguyễn Hữu Duy Kha**

GitHub:

https://github.com/dkhak3
