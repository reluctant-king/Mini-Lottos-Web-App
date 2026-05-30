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

---

## Common Information (Shared with User App)

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
