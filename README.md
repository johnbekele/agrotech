# AgroTech — A Platform for Farmers to Share & Rent Tools

**By Yohans Bekele **

Live Demo: [agrotech-kohl-nine.vercel.app](https://agrotech-kohl-nine.vercel.app)  
GitHub: [https://github.com/johnbekele/agrotech.git](https://github.com/johnbekele/agrotech.git)

---

## Table of Contents

- [Project Objective](#project-objective)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [API Documentation](#api-documentation)
- [How to Run Locally](#how-to-run-locally)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [User & Admin Manual](#user--admin-manual)

---

## Project Objective

Modern farmers face significant costs acquiring and maintaining agricultural machinery. Many small or medium farms cannot afford these machines, while others have underutilized equipment.

**AgroTech** is a web application that enables farmers to list, share, and rent agricultural equipment, reducing costs, increasing efficiency, and promoting sustainable resource use.

---

## Features

- **Secure Registration & Login:** Email verification via Nodemailer.
- **Tool Listings:** Add, edit, or remove equipment for rent.
- **Search & Rent:** Search tools with filters by location/type.
- **Booking Management:** Book, view, and cancel rentals.
- **Role-based Access:** Farmer and Admin roles.
- **Admin Dashboard:** Manage users and tool listings.
- **Responsive UI:** Mobile and desktop compatibility with Tailwind CSS.

---

## Tech Stack

| Layer      | Technology                  |
|------------|----------------------------|
| Frontend   | React, React Router, Tailwind CSS |
| Backend    | Node.js, Express           |
| Database   | MongoDB (Mongoose ODM)     |
| Auth       | JWT, Nodemailer            |
| Hosting    | Vercel (frontend), Render/AWS (backend) |
| Versioning | Git, GitHub                |

---

## System Architecture

```
[User]
   |
[React Frontend] <---> [Node.js Express API] <---> [MongoDB Database]
   |
[Nodemailer Email Service]
```

### Data Models (Mongoose)

- **User:** name, email, password, role, isVerified, etc.
- **Tool:** title, description, owner, availability, price, etc.
- **Booking:** user, tool, date, status, etc.

---

## API Documentation

### Auth Routes (`/api/user`)
| Method | Route                | Description                       |
|--------|--------------------- |-----------------------------------|
| POST   | /register            | Register a new user (email verify)|
| POST   | /login               | Log in a user                     |
| POST   | /resend-verification | Resend verification email         |
| GET    | /profile             | Get current user profile (JWT)    |

### Tool Routes (`/api/tools`)
| Method | Route     | Description                        |
|--------|-----------|------------------------------------|
| GET    | /         | Get all tools                      |
| POST   | /         | Add new tool (Farmer only)         |
| GET    | /:id      | Get tool by ID                     |
| PUT    | /:id      | Update tool (owner only)           |
| DELETE | /:id      | Delete tool (owner only)           |
| GET    | /search   | Search for tools                   |

### Booking Routes (`/api/bookings`)
| Method | Route                   | Description                   |
|--------|-------------------------|-------------------------------|
| POST   | /:toolId                | Book a tool                   |
| GET    | /mybookings             | Get your bookings             |
| GET    | /received               | Get bookings for your tools   |
| PUT    | /:bookingId/cancel      | Cancel a booking              |

### Admin Routes (`/api/admin`)
| Method | Route            | Description             |
|--------|------------------|------------------------|
| GET    | /users           | Get all users          |
| PUT    | /users/:id/ban   | Ban a user             |
| DELETE | /tools/:id       | Remove any tool listing|

---

## How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/johnbekele/agrotech.git
   ```
2. **Set up environment variables in `/server/.env`:**
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
3. **Install dependencies:**
   - For frontend:
     ```bash
     cd client
     npm install
     ```
   - For backend:
     ```bash
     cd ../server
     npm install
     ```
4. **Start the development servers:**
   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     cd ../client
     npm start
     ```

---

## Project Structure

```
/client   - React frontend (Tailwind CSS)
/server   - Node.js Express backend (Mongoose, JWT, Nodemailer)
/docs     - API documentation
```

---

## Testing

- **Unit Testing:** Key backend functions tested with Jest.
- **Integration Testing:** API endpoints tested via Postman.
- **System Testing:** Manual testing of user flows (registration, listing, booking, admin).
- **User/Beta Testing:** Feedback collected from users and UI/UX improved accordingly.

---

## User & Admin Manual

### User
- Register and verify email.
- Login to list/rent tools and manage bookings.

### Admin
- Login to manage users, tools, and oversee all bookings.

---

**For more details, visit the [GitHub Repository](https://github.com/johnbekele/agrotech.git).**

---

*AgroTech: Empowering farmers through technology and collaboration!*


