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

---

## Common Information (Shared with Agent Portal)

### Database
Both apps connect to the **same MongoDB database** (`mini_lottos`). Data created in the Agent Portal is immediately visible in the User App.

### Shared Collections
| Collection | Purpose |
|---|---------|
| `users` | User profiles (phone, name, balance, coins) |
| `tickets` | Lottery tickets linked to users |
| `draws` | Draw schedules and results |
| `notifications` | User-facing notifications |

### Connection Flow
1. **Agent** registers a user → generates User ID + saves phone
2. **Agent** creates a ticket → links to the User ID
3. **User** logs in with that phone → sees their tickets
4. **Draw Engine** (in Agent backend) auto-resolves draws every 60 seconds
5. **User** gets notified of wins → **Agent** receives winner alerts

### Ports
| Service | Port |
|---|----|
| User App Frontend | `5173` |
| User App Backend | `5001` |
| Agent App Frontend | `5174` |
| Agent App Backend | `5002` |
