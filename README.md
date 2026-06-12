<div align="center">
  <br />
    <img src="client/src/assets/logo.svg" alt="JyotishDesk Logo" width="80" />
  <br />
  <h1>✨ JyotishDesk CRM</h1>
  <p>
    <strong>A Premium, AI-Powered Customer Relationship Management Tool for Professional Astrologers.</strong>
  </p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture--ports">Architecture</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

<br />

## 🌟 Overview
JyotishDesk is a highly specialized CRM designed exclusively for astrologers. It streamlines the day-to-day operations of an astrological consultation business, allowing astrologers to manage client profiles, securely log consultation notes, track follow-ups, and generate beautiful PDF summaries for their clients. It features built-in AI capabilities to instantly generate comprehensive consultation summaries and email them directly to the clients.

---

## 🚀 Features

- **🌙 Dynamic Theming:** Seamless one-click switch between Premium Dark and Clean Light mode.
- **👥 Client Management:** Maintain a secure and detailed database of clients including exact birth details (DOB, Time, Place).
- **📝 Consultation Logs:** Securely write and store detailed notes for every reading.
- **🤖 AI-Powered Summaries:** One-click automated generation of professional consultation summaries and prescribed astrological remedies.
- **📩 Automated Emailing:** Send beautifully formatted post-consultation reports directly to your clients via SMTP.
- **📄 PDF Report Generation:** Download high-quality, printable PDF reports of consultations directly from the timeline to send via WhatsApp.
- **📅 Smart Follow-ups:** Never miss a client check-in with the automated follow-up scheduling system.

---

## 🛠 Tech Stack

**Frontend Architecture (Client)**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (with custom Day/Night Class configuration)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **PDF Engine:** jsPDF & html2canvas

**Backend Architecture (Server)**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (Relational DB for high integrity & speed)
- **Email System:** Nodemailer (SMTP Integration)
- **AI Integration:** Google Gemini API

---

## 🏗 Architecture & Ports

The application operates on a modern separated client-server architecture:

```text
jyotishdesk-crm/
│
├── client/                 # Frontend React Application
│   ├── src/                # UI Components, Pages, and Layouts
│   └── tailwind.config.js  # Theming and Design System
│
└── server/                 # Backend Node.js API & Database
    ├── config/             # DB Initialization and Env Config
    ├── controllers/        # Business Logic & AI Processing
    ├── data/               # Local SQLite Database (database.sqlite)
    ├── repositories/       # SQL Queries and Data Access Layer
    └── routes/             # RESTful API Endpoints
```

### 🔌 Port Configuration
When running the application locally, it utilizes the following ports:
- **Frontend (Client):** Runs on `http://localhost:5173`
- **Backend (Server API):** Runs on `http://localhost:5005`

---

## 💻 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

### 2. Clone the Repository
```bash
git clone https://github.com/riya503/JyotiDesk.git
cd JyotiDesk
```

### 3. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file inside the `server/` directory and configure your keys:
```env
PORT=5005
GEMINI_API_KEY=your_gemini_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_SENDER="JyotishDesk CRM" <no-reply@jyotishdesk.com>
```
Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a **new terminal** and run:
```bash
cd client
npm install
```
Start the frontend application:
```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser. The SQLite Database is lazy-loaded and will automatically initialize itself upon your first login or signup.

---
<div align="center">
  <i>Developed with ❤️ for the Astrological Community</i>
</div>
