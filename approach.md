# Hướng dẫn phát triển hệ thống đánh giá mức độ commitment nhân viên

---

## **Approach**

Xây dựng hệ thống đánh giá mức độ commitment của nhân viên theo thời gian.  
Cho phép theo dõi điểm, phân loại theo mức (Issue → Excellent).

---

## **What**

Tạo hệ thống backend RESTful:

- Ghi nhận điểm commitment theo thời gian (commitment_scores)
- Ánh xạ điểm → trạng thái (commitment_history)

**Cung cấp API:**
- Lấy trạng thái commitment hiện tại theo từng nhân viên

**Triển khai bằng:**  
- NestJS  
- PostgreSQL  
- Docker

---

## **How**

### **Database**

Thiết kế 3 bảng chính:

```sql
CREATE TABLE employees (
  id serial primary key,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE commitment_levels (
  id serial primary key,
  score_min integer not null,
  score_max integer not null,
  label varchar(50) not null,
  color_code varchar(7) not null
);

CREATE TABLE commitment_history (
  id serial primary key,
  employee_id integer not null,
  evaluator_score integer not null,
  evaluated_at timestamp not null,
  CONSTRAINT fk_employee 
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

---

### **Backend**

- Sử dụng NestJS (RESTful, Module-based, Dependency Injection mạnh)
- ORM: TypeORM

---

### **Docker**

- Docker Compose để chạy: NestJS + PostgreSQL

---

### **API Spec**

- Swagger docs sẵn sàng qua đường dẫn `/api/docs`

---

### **Unit test**

- Viết test đơn giản cho service và controller

---

## **API Specs**

| Method | Endpoint                        | Description                                   |
|--------|----------------------------------|-----------------------------------------------|
| GET    | `/employees/:id/commitment`      | Get latest