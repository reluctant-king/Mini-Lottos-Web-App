# Mini Lottos Agent Portal

## Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017
- (Optional) User App running for full connection demo

## Backend
```bash
cd backend
npm install
npm start
```
Runs on http://localhost:5002

## Frontend
```bash
cd frontend
npm install
npm run dev
```
Opens http://localhost:5174

## Test Flow
1. Open http://localhost:5174
2. Login with:
   - Agent ID: **88291020**
   - Password: **agent123**
3. Land on Dashboard → see stats + activity
4. Tap "Register User" → enter Name, Phone, District → tap "Generate User ID" → see generated ID
5. Now in User App (port 5173), login with that phone → see new user profile
6. Back in Agent App → Tap "Scan Ticket" → "SIMULATE SCAN" → continue to winner alert
7. Reports tab shows charts
8. Winner alerts visible from notifications
