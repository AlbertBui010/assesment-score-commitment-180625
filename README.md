# Assessment Score Commitment

Hệ thống backend RESTful đánh giá mức độ commitment của nhân viên theo thời gian, triển khai với NestJS, PostgreSQL, Docker.

---

## 🚀 Tính năng

- Ghi nhận điểm commitment của nhân viên theo thời gian
- Ánh xạ điểm số sang trạng thái (Issue → Excellent)
- API lấy trạng thái commitment hiện tại của từng nhân viên
- Quản lý employees, commitment levels, commitment history
- Seed dữ liệu mẫu nhanh chóng
- Tích hợp Swagger docs

---

## 🏗️ Công nghệ sử dụng

- [NestJS](https://nestjs.com/) (TypeScript)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (unit test)
- [Swagger](https://swagger.io/)

---

## 🗃️ Cấu trúc thư mục

```
src/
  employees/
    employee.entity.ts
    employees.controller.ts
    employees.service.ts
    employees.module.ts
    dto/
  commitment-levels/
    commitment-level.entity.ts
    ...
  commitment-history/
    commitment-history.entity.ts
    ...
  seed.ts
  app.module.ts
  main.ts
.env
docker-compose.yml
Dockerfile
```

---

## ⚙️ Cài đặt & Chạy dự án

### 1. Clone dự án

```bash
git clone <repo-url>
cd assesment-score-commitment-180625
```

### 2. Tạo file `.env`

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=commitment_db
```

### 3. Khởi động Docker Compose

```bash
docker-compose up --build
```

### 4. Seed dữ liệu mẫu

```bash
docker-compose exec app npx ts-node src/seed.ts
```

---

## 🛠️ API

### Lấy trạng thái commitment hiện tại của nhân viên

```
GET /employees/:id/commitment
```

**Response mẫu:**
```json
{
  "employeeId": 1,
  "employeeName": "Alice",
  "latestScore": 85,
  "evaluatedAt": "2025-06-01T00:00:00.000Z",
  "levelLabel": "Good",
  "colorCode": "#00FF00"
}
```

### Swagger Docs

Truy cập: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🧪 Unit Test

Chạy toàn bộ test:
```bash
npm run test
```

---

## 📝 Seed dữ liệu mẫu

- Chạy script seed như hướng dẫn trên để tạo employees, commitment levels, commitment history mẫu.

---

## 💡 Ghi chú

- Để seed dữ liệu trên máy host, đổi `DB_HOST=localhost` trong `.env`.
- Để seed trong Docker, giữ `DB_HOST=db`.
- Nếu thay đổi Dockerfile hoặc cài thêm package, hãy build lại Docker image.

---

## 📄