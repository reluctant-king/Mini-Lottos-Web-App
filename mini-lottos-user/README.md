# Mini Lottos User App

## Prerequisites
- Node.js 18+
- MongoDB running locally on default port 27017

## Backend Setup
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5001. Auto-seeds data on first run.

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Opens at http://localhost:5173

## Test Flow
1. Splash → Login
2. Enter phone: **9999999999**
3. Click "Send OTP"
4. **CHECK BACKEND TERMINAL** for OTP code (printed clearly)
5. Enter OTP → land on Home with tickets, balance, notifications
