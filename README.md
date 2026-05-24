# TXDL Project

Ứng dụng ReactJS dùng để:

- Upload file Excel
- Lọc dữ liệu theo:
  - Ngày phản hồi
  - Tên nhân viên QLCL-DV
- Export kết quả ra Excel

---

# Công nghệ sử dụng

- ReactJS
- Redux Toolkit
- XLSX
- File Saver

---

# Clone project

```bash
git clone https://github.com/dkhak3/txdl-project
```

---

# Di chuyển vào project

```bash
cd txdl-project
```

---

# Cài dependencies

```bash
npm install
```

Hoặc:

```bash
npm i
```

---

# Các package cần thiết

Nếu thiếu package thì cài:

```bash
npm install @reduxjs/toolkit react-redux
```

```bash
npm install xlsx
```

```bash
npm install file-saver
```

---

# Chạy project

```bash
npm start
```

Project sẽ chạy tại:

```plaintext
http://localhost:3000
```

---

# Build production

```bash
npm run build
```

---

# Cấu trúc project

```plaintext
src/
│
├── app/
├── features/
├── components/
├── utils/
├── styles/
└── App.js
```

---

# Tính năng

- Upload Excel
- Filter theo ngày
- Filter nhiều nhân viên
- Normalize tiếng Việt
- Export Excel
- Redux Toolkit
- Responsive UI

---

# Lưu ý

File Excel cần có các cột:

- Ngày phản hồi
- Tên nhân viên QLCL-DV
- 1/ Chi nhánh/Đơn vị:
- Nội dung tiếp nhận Phản ánh

---

# Author

TXDL Project
