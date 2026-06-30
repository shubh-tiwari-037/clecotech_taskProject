# clecotech_taskProject
create a small webpage for users

# 📖 API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

---

# 🔐 Authentication

This project uses:

- JWT Authentication
- HTTP Only Cookies
- Access Token
- Refresh Token

Protected APIs require a valid Access Token stored in cookies.

---

# 👤 User APIs

## 1. Register User

### Endpoint

```http
POST /users/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User Registered Successfully"
}
```

---

## 2. Login User

### Endpoint

```http
POST /users/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "Login Successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### Cookies Set

- accessToken
- refreshToken

---

## 3. Logout User

### Endpoint

```http
POST /users/logout
```

### Authentication

Protected Route

### Success Response

```json
{
  "message": "Logout Successful"
}
```

---

## 4. Refresh Access Token

### Endpoint

```http
POST /users/refresh-token
```

### Authentication

Uses Refresh Token Cookie

### Success Response

```json
{
  "message": "Access Token Refreshed"
}
```

---

## 5. Get Current Logged-in User

### Endpoint

```http
GET /users/me
```

### Authentication

Protected Route

### Success Response

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

---

## 6. Get All Users (Admin Only)

### Endpoint

```http
GET /users/get
```

### Authentication

- Protected Route
- Admin Only

---

## 7. Get User By ID

### Endpoint

```http
GET /users/:id
```

### Authentication

Protected Route

---

## 8. Delete User

### Endpoint

```http
DELETE /users/:id
```

### Authentication

- Protected Route
- Admin Only

---

# 📝 Post APIs

## 1. Create Post

### Endpoint

```http
POST /posts/create
```

### Authentication

Protected Route

### Request Body

```json
{
  "title": "React Query Guide",
  "content": "Complete guide on React Query."
}
```

### Success Response

```json
{
  "message": "Post Created Successfully"
}
```

---

## 2. Get All Posts

### Endpoint

```http
GET /posts/get
```

### Authentication

Public Route

### Success Response

```json
[
  {
    "_id": "...",
    "title": "React Query Guide",
    "content": "Complete guide...",
    "author": {}
  }
]
```

---

## 3. Get Single Post

### Endpoint

```http
GET /posts/:id
```

### Authentication

Public Route

### Success Response

```json
{
  "_id": "...",
  "title": "React Query Guide",
  "content": "Complete guide...",
  "author": {}
}
```

---

## 4. Update Post

### Endpoint

```http
PATCH /posts/:id
```

### Authentication

Protected Route

### Request Body

```json
{
  "title": "Updated Title",
  "content": "Updated Content"
}
```

### Success Response

```json
{
  "message": "Post Updated Successfully"
}
```

---

## 5. Delete Post

### Endpoint

```http
DELETE /posts/:id
```

### Authentication

Protected Route

### Success Response

```json
{
  "message": "Post Deleted Successfully"
}
```

---

# 👮 Authorization

| Role | Permissions |
|------|-------------|
| User | Register, Login, Logout, View Posts, Create Post, Update Own Post, Delete Own Post |
| Admin | All User Permissions + View All Users + Delete Users |

---

# 📌 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# 🔒 Authentication Flow

```
Register
      │
      ▼
Login
      │
      ▼
Access Token + Refresh Token (HTTP Only Cookies)
      │
      ▼
Protected APIs
      │
      ▼
Access Token Expired
      │
      ▼
POST /users/refresh-token
      │
      ▼
New Access Token
```

---

# 📂 API Summary

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /users/register | Public |
| POST | /users/login | Public |
| POST | /users/logout | Protected |
| POST | /users/refresh-token | Protected |
| GET | /users/me | Protected |
| GET | /users/get | Admin |
| GET | /users/:id | Protected |
| DELETE | /users/:id | Admin |
| POST | /posts/create | Protected |
| GET | /posts/get | Public |
| GET | /posts/:id | Public |
| PATCH | /posts/:id | Protected |
| DELETE | /posts/:id | Protected |

---

# 👨‍💻 Demo Credentials

## Admin

```
Email: admin@example.com
Password: Admin@123
```

## User

```
Email: user@example.com
Password: User@123
```

---

# 🚀 Tech Stack

- React.js
- React Router DOM
- React Query (TanStack Query)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HTTP Only Cookies
- bcrypt
- Axios
- Tailwind CSS