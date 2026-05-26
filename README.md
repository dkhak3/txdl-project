# TXDL Project

Hệ thống hỗ trợ tra cứu, lọc và trích xuất dữ liệu phản ánh/khiếu nại từ file Excel.

---

# Chức năng chính

## 1. Upload file Excel

- Hỗ trợ file:
  - `.xlsx`
  - `.xls`

- Tự động đọc:
  - Sheet 1 → dữ liệu phản ánh
  - Sheet 2 → dữ liệu trích xuất QLCL-DV

- Kiểm tra định dạng file Excel hợp lệ.
- Hiển thị toast thông báo upload thành công/thất bại.

---

# 2. Lọc dữ liệu phản ánh

Cho phép lọc theo:

- Từ ngày
- Đến ngày
- Tên nhân viên QLCL-DV

Kết quả sẽ hiển thị:

- STT
- Ngày phản hồi
- Tên nhân viên QLCL-DV
- Nội dung tiếp nhận phản ánh

---

# 3. So sánh dữ liệu Sheet1 và Sheet2

Sau khi lọc dữ liệu từ Sheet1:

- Hệ thống sẽ so sánh dữ liệu với Sheet2
- Tự động ghép dữ liệu liên quan

Dữ liệu lấy từ Sheet2 gồm:

- Tuyến
- BKS
- Nhân viên bị phản ánh
- Xác định tính vi phạm

---

# 4. Báo cáo hỗ trợ trích xuất

Trang ReportPage hỗ trợ:

- Xem báo cáo tổng hợp
- Copy nhanh:
  - Khoảng thời gian
  - Danh sách nhân viên
- Phân trang dữ liệu
- Export Excel

Các cột hiển thị:

- STT
- Chi nhánh
- Tuyến
- BKS
- Nội dung phản ánh
- Nhân viên bị phản ánh
- Không vi phạm
- Vi phạm

---

# 5. Logic xử lý đặc biệt

## Chi nhánh

Tự động extract từ nội dung phản ánh.

Ví dụ:

```txt
1/ Chi nhánh/Đơn vị: HCM
```

→ Kết quả:

```txt
HCM
```

---

## Nội dung phản ánh

Tự động extract phần nội dung từ:

```txt
5/ Nội dung tiếp nhận PA/KN:
```

hoặc

```txt
6/ Nội dung tiếp nhận PA/KN:
```

---

## Xác định tính vi phạm

Nếu Sheet2 có:

```txt
KHÔNG VI PHẠM
```

→ Cột "Không vi phạm" = `1`

Nếu có:

```txt
CÓ VI PHẠM
```

→ Cột "Vi phạm" = `1`

Nếu có nội dung khác:

→ Hiển thị nguyên nội dung tại cột "Vi phạm"

---

# Công nghệ sử dụng

- ReactJS
- Redux Toolkit
- XLSX
- File Saver
- React Hot Toast

---

# Clone dự án

```bash
git clone git@github.com:dkhak3/txdl-project.git
```

hoặc

```bash
git clone https://github.com/dkhak3/txdl-project.git
```

---

# Cài đặt dự án

## 1. Di chuyển vào project

```bash
cd txdl-project
```

---

## 2. Cài dependencies

```bash
npm install
```

---

# Chạy project

```bash
npm start
```

Project sẽ chạy tại:

```txt
http://localhost:3000
```

---

# Build production

```bash
npm run build
```

---

# Cấu trúc dữ liệu Excel

## Sheet 1

Dữ liệu phản ánh khách hàng.

Các field sử dụng:

- STT
- Ngày phản hồi
- Tên nhân viên QLCL-DV
- Nội dung tiếp nhận Phản ánh

---

## Sheet 2

Dữ liệu trích xuất QLCL-DV.

Các field sử dụng:

- STT
- NHÂN VIÊN QLCL-DV
- TUYẾN
- HỌ TÊN NHÂN VIÊN BỊ PHẢN ÁNH
- BIỂN KIỂM SOÁT
- XÁC ĐỊNH TÍNH VI PHẠM

---

# Phân trang

- Mặc định:
  - 20 dòng/trang

- Có thể chọn:
  - 20
  - 50
  - 100

- Có nút chuyển trang:
  - 1
  - 2
  - 3
  - ...

---

# Export Excel

Cho phép export:

- Kết quả lọc
- Báo cáo hỗ trợ trích xuất

File export dạng:

```txt
.xlsx
```

---

# Tác giả

TXDL Project - Internal Support Tool
