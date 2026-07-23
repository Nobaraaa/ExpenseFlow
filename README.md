<div align="center">

# ExpenseFlow

![React](https://img.shields.io/badge/React-19-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-brightgreen)
![Java](https://img.shields.io/badge/Java-17-orange)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-blue)

ExpenseFlow is a full-stack personal expense tracker. It pairs a React (Vite) frontend with a Spring Boot REST API, letting users register, log in, and manage their income/expenses with charts and summaries.

**[🔗 Live App](https://expense-flow-green.vercel.app/)** &nbsp;|&nbsp; **[⚙️ Live API](https://expenseflow-es56.onrender.com)**

</div>

## ✨ Features

- **User accounts** — register, log in, and view/update your profile
- **Expense tracking** — add, edit, and delete transactions (title, amount, type, category, date)
- **Dashboard** — summary cards and charts (via Recharts) for a quick overview of spending
- **Export** — generate PDF (jsPDF) or Excel (SheetJS) reports of your transactions

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Axios for API calls
- Recharts for charts
- React Toastify for notifications
- jsPDF / xlsx for exports

**Backend**
- Spring Boot 4.1 (Java 17)
- Spring Data JPA
- PostgreSQL (Production)
- H2 file-based database (Development)
- Maven

## 📁 Project Structure

```
ExpenseFlow/
├── src/                     # React frontend
│   ├── components/          # Login, Signup, Dashboard, TransactionForm, etc.
│   ├── services/api.js      # Axios instance (baseURL: http://localhost:8080/api)
│   └── App.jsx
├── expenseflow/              # Spring Boot backend
│   └── src/main/java/com/project/expenseflow/
│       ├── controller/       # ExpenseController, UserController
│       ├── service/          # ExpenseService, UserService
│       ├── repository/       # JPA repositories
│       ├── entity/           # Expense, User
│       └── dto/               # LoginRequest, UserProfileDto
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Java 17+
- Maven (or use the included `mvnw` wrapper)

### Backend setup

```bash
cd expenseflow
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`. It uses a local H2 file database (`expenseflowdb`) that's created automatically — no separate database install needed. The H2 console is available at `http://localhost:8080/h2-console`.

### Frontend setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default (standard Vite port) and is already configured to talk to the backend at `http://localhost:8080/api`.

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Log in with email/password |
| GET | `/api/users/{id}` | Get a user's profile |
| PUT | `/api/users/{id}` | Update a user's profile |
| GET | `/api/expenses` | List all expenses |
| POST | `/api/expenses` | Add an expense |
| PUT | `/api/expenses/{id}` | Update an expense |
| DELETE | `/api/expenses/{id}` | Delete an expense |

## 🌐 Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | [expense-flow-green.vercel.app](https://expense-flow-green.vercel.app/) |
| Backend | Render | [expenseflow-es56.onrender.com](https://expenseflow-es56.onrender.com) |

## 📜 Available Scripts (frontend)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## ⚠️ Notes

- Basic authentication is implemented (no BCrypt or JWT yet).
- Duplicate email registration is prevented.
- CORS is configured for both local development and the deployed Vercel frontend.
- The Render backend is on a free tier, so the first request after a period of inactivity may take up to a minute while it spins back up.

## 📄 License

No license specified yet.
