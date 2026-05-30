Finalized Decisions
🎯 General
Stack: Vite + React + Tailwind + React Router + Context API + MERN (MongoDB + Express + React + Node)
Connection: Both apps connect to the same MongoDB database (shared via connection string)
Auth: Mock OTP — printed to backend terminal/console
Language: English, ₹ INR, Indian districts
Icons: lucide-react
📱 User App
Full flow as listed + Profile
Profile screen designed
Users only view tickets (agents create them)
Games are placeholder cards that add coins on click
🏢 Agent App
Mock credentials: Agent ID: 88291020 / Password: agent123
Mock scan (Simulate Scan button)
Basic Settings screen designed
window.print() for receipt
🔗 Connection Flow (Confirmed)
Agent registers user → generates User ID + saves phone → Agent creates ticket → links to User ID → User logs in with that phone → sees tickets → wins detected by draw engine → Agent gets winner alert

Both apps share the same MongoDB database (mini_lottos DB with collections: users, agents, tickets, draws, notifications, otps, winneralerts).
 PROMPT 1 — USER APP (MERN Full Stack)
Paste this entire block into Cursor / Bolt / Claude Code:

text

Build a COMPLETE MERN stack mobile application called "Mini Lottos User App" in a folder named `mini-lottos-user`. This is a mobile-first lottery application for end users.

═══════════════════════════════════════════════════════
FOLDER STRUCTURE
═══════════════════════════════════════════════════════
mini-lottos-user/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Ticket.js
│   │   ├── Draw.js
│   │   ├── Notification.js
│   │   └── OTP.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── drawRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── rewardRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── ticketController.js
│   │   ├── drawController.js
│   │   ├── notificationController.js
│   │   └── rewardController.js
│   ├── middleware/authMiddleware.js
│   ├── utils/seed.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── api/axios.js
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── DataContext.jsx
    │   ├── components/
    │   │   ├── MobileLayout.jsx
    │   │   ├── BottomNav.jsx
    │   │   ├── NumberBall.jsx
    │   │   ├── TicketCard.jsx
    │   │   ├── Toast.jsx
    │   │   └── Loader.jsx
    │   └── pages/
    │       ├── Splash.jsx
    │       ├── Login.jsx
    │       ├── Verify.jsx
    │       ├── Home.jsx
    │       ├── Tickets.jsx
    │       ├── TicketDetail.jsx
    │       ├── Winning.jsx
    │       ├── ClaimDetails.jsx
    │       ├── Results.jsx
    │       ├── Rewards.jsx
    │       ├── RewardsBalance.jsx
    │       ├── Help.jsx
    │       ├── Notifications.jsx
    │       └── Profile.jsx
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── index.html
    └── package.json

═══════════════════════════════════════════════════════
BACKEND (Node.js + Express + MongoDB + Mongoose + JWT)
═══════════════════════════════════════════════════════
PORT: 5001
DATABASE: MongoDB — connection string in .env
Use a SHARED DATABASE named "mini_lottos" so this app's data is accessible by the Agent App.

.env file:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/mini_lottos
JWT_SECRET=user_secret_key_2024
NODE_ENV=development
```

INSTALL: express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, morgan

MONGOOSE MODELS:

User.js:
{ phone: String unique required, name: String, district: String, balance: Number default 120.50, coins: Number default 18, agentId: String, avatar: String, createdAt }

Ticket.js:
{ ticketNumber: String unique, userId: ObjectId ref User, userPhone: String, agentId: String, numbers: [Number], category: String enum ['Mini Lottos','Mega Jackpot','Daily Draw','Quick Pick','Bumper'], price: Number, drawDate: Date, status: String enum ['active','won','lost','pending'] default 'active', prize: Number default 0, gameName: String, createdAt }

Draw.js:
{ name: String, drawDate: Date, winningNumbers: [Number], jackpot: Number, status: String, createdAt }

Notification.js:
{ userId: ObjectId ref User, type: String enum ['win','draw','bonus','info'], title: String, message: String, read: Boolean default false, createdAt }

OTP.js:
{ phone: String unique, code: String, expiresAt: Date }

API ENDPOINTS:

POST  /api/auth/send-otp        body: {phone}
  → generate 4-digit OTP, upsert in OTP collection (expires in 5 min)
  → **console.log(`\n📱 ═══════════════════════════\n   OTP for ${phone}: ${code}\n═══════════════════════════\n`)**
  → return {success:true, message:'OTP sent'}

POST  /api/auth/verify-otp      body: {phone, code}
  → validate OTP not expired
  → find or create User (auto-create with default name "Player" if new)
  → sign JWT, return {token, user}

GET   /api/auth/me              [PROTECTED] → return current user from JWT

PUT   /api/auth/profile         [PROTECTED] body: {name, district} → update user

GET   /api/tickets              [PROTECTED] query: ?status=active|past
  → return user's tickets sorted by drawDate desc

GET   /api/tickets/:id          [PROTECTED] → single ticket

GET   /api/draws/upcoming       → next 3 upcoming draws
GET   /api/draws/results        → last 10 completed draws
GET   /api/draws/winners        → recent winners list (last 5 won tickets with user names)

GET   /api/notifications        [PROTECTED] → user's notifications
DELETE /api/notifications       [PROTECTED] → clear all
PUT   /api/notifications/:id/read [PROTECTED]

POST  /api/rewards/play         [PROTECTED] body: {gameId, coinsEarned}
  → add coins to user, return updated user

POST  /api/rewards/redeem       [PROTECTED] body: {coins}
  → convert coins → balance (1 coin = ₹1), return updated user

SEED SCRIPT (utils/seed.js) — runs once if collections empty:
- 2 Users: 
  • {phone:"9999999999", name:"Arjun", district:"Kochi", balance:120.50, coins:18}
  • {phone:"8888888888", name:"Priya", district:"Trivandrum", balance:50, coins:25}
- 6 Tickets for Arjun:
  • Active: Daily Mini Lotto, numbers [4,12,21,33,45], drawDate +5 days, ₹2
  • Active: Mini Weekly, numbers [7,14,22,29,40], drawDate +7 days, ₹5
  • Won: Quick Pick 5, numbers [7,18,22,29,40], prize ₹500, status 'won'
  • Won: Mini Lottos, prize ₹50000, status 'won' (for winning screen demo)
  • Lost: numbers [...], status 'lost'
  • Pending: "Midnight Madness", status 'pending'
- 3 upcoming Draws: Super Daily (₹5,000,000), Quick 5 (₹50,000), Mini Weekly (₹100,000)
- 3 Notifications: Winning Alert (won ₹500), Draw Result Out, Daily Bonus

Auto-run seed on server start if Users collection is empty.

═══════════════════════════════════════════════════════
FRONTEND (Vite + React + Tailwind + Router + Axios)
═══════════════════════════════════════════════════════
PORT: 5173

INSTALL: react, react-router-dom, axios, lucide-react, tailwindcss, postcss, autoprefixer

tailwind.config.js:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: {
      primary: '#F97316',
      'primary-dark': '#EA580C',
      'primary-light': '#FEF3EC'
    },
    fontFamily: { sans: ['Inter', 'sans-serif'] }
  }},
  plugins: [],
}
```

index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body { font-family: 'Inter', sans-serif; background: #F9FAFB; }
* { -webkit-tap-highlight-color: transparent; }
```

api/axios.js:
```js
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5001/api' });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('ml_user_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;
```

AuthContext.jsx: provides {user, token, loading, sendOtp(phone), verifyOtp(phone, code), logout(), refreshUser()}. Auto-load /api/auth/me on mount if token exists.

DataContext.jsx: provides {tickets, notifications, winners, refreshTickets(), refreshNotifications(), playGame(id, coins), redeemCoins(amount)}.

MobileLayout.jsx:
```jsx
export default function MobileLayout({ children, hideNav }) {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-gray-50 relative pb-24 shadow-2xl">
      {children}
    </div>
  );
}
```

BottomNav.jsx: fixed bottom inside the max-w container, 4 tabs (Home, My Tickets, Help, Profile), active tab orange + filled, inactive gray. Use Home, Ticket, HelpCircle, User from lucide-react.

═══════════════════════════════════════════════════════
SCREENS — RENDER FULL CONTENT (NO BLANK PAGES!)
═══════════════════════════════════════════════════════

📍 Splash.jsx (route "/")
- Container: h-screen bg-gradient-to-br from-yellow-200 via-orange-100 to-blue-300 relative overflow-hidden
- Floating absolute-positioned circles (animate-bounce with different delays):
  - top-20 left-8: w-16 h-16 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-yellow-900 font-bold text-xl → "$"
  - top-1/3 right-8: w-14 h-14 bg-red-400 rounded-full shadow-xl text-white font-bold flex center → "7"
  - bottom-72 left-4: w-12 h-12 bg-blue-500 rounded-full shadow-xl text-white → "21"
  - bottom-40 right-12: w-14 h-14 bg-green-500 rounded-full shadow-xl text-white → "42"
  - bottom-32 right-8: w-12 h-12 bg-yellow-400 rounded-full shadow-xl → "$"
- Center container: flex flex-col items-center justify-center h-full
  - Logo circle: w-64 h-64 rounded-full bg-teal-600 border-8 border-white shadow-2xl flex flex-col items-center justify-center
    - white text "mni" text-5xl font-bold lowercase
    - white text "LOTTOS" tracking-wider mt-1
  - mt-8 "MINI LOTTOS" text-4xl font-extrabold text-blue-900
  - mt-2 "PLAY. WIN. CELEBRATE." text-sm tracking-[0.3em] text-blue-700 font-semibold
- Bottom: absolute bottom-12 left-1/2 -translate-x-1/2
  - white pill: bg-white shadow px-6 py-3 rounded-full flex items-center gap-2 → Shield icon (blue) + "OFFICIAL GOVERNMENT SUPPORTED" text-blue-900 font-bold text-sm
  - mt-4 progress bar: w-32 h-1 bg-white/50 rounded-full with blue inner bar animating
- useEffect: setTimeout(()=>navigate('/login'), 2500)

📍 Login.jsx (route "/login")
- Top center: w-20 h-20 bg-orange-500 rounded-2xl shadow-lg flex center → Ticket icon white w-12 h-12
- "Mini Lottos" text-3xl text-orange-600 font-bold text-center mt-3
- Hero illustration card: mt-6 w-64 h-64 mx-auto bg-orange-100 rounded-full flex items-center justify-center relative
  - Inside: white rounded-2xl card 200x200 with shadow showing:
    - Phone icon (Smartphone from lucide) w-16 h-16 text-orange-500
    - Two horizontal bars (skeleton placeholders)
    - "💬 OTP SENT" orange pill at bottom
- "Welcome to Mini Lottos" text-3xl font-bold text-center mt-6
- "Enter your phone number to play and win big!" text-gray-600 text-center mt-2
- Form mt-8 px-5:
  - Label "Phone Number" text-sm font-semibold
  - Input wrapper: relative
    - Phone icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
    - <input type="tel" placeholder="000-000-0000" className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-orange-500 outline-none text-lg" />
  - mt-6 button: bg-orange-500 hover:bg-orange-600 text-white w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 → "Send OTP" + ArrowRight icon
- Footer mt-6 text-center text-sm text-gray-600: "By continuing, you agree to our <span class='text-orange-500 underline'>Terms of Service</span> and <span class='text-orange-500 underline'>Privacy Policy</span>."
- BottomNav (Home active)
- onClick Send OTP: validate 10 digits → POST /api/auth/send-otp → toast "OTP sent! Check console." → navigate(`/verify?phone=${phone}`)

📍 Verify.jsx (route "/verify")
- Top bar: back arrow (ArrowLeft) + "Mini Lottos" centered orange + bottom border
- mt-8 light-orange circle (bg-orange-100 w-32 h-32 rounded-full mx-auto) with Ticket icon (Ticket w-16 h-16 text-orange-500) center
- mt-8 "Verification Code" text-4xl font-bold text-center
- "Please enter the 4-digit code sent to your phone." text-gray-600 text-center mt-3 px-8
- mt-8 OTP boxes: flex justify-center gap-3
  - 4x: <input maxLength="1" className="w-16 h-20 border-2 border-gray-200 rounded-2xl text-center text-3xl font-bold focus:border-orange-500 outline-none" />
  - Auto-focus next on input, backspace focuses prev
- mt-8 button "🔒 Verify & Login" bg-orange-500 text-white w-full py-4 rounded-2xl font-bold text-lg with Lock icon
- mt-8 text-center "Didn't get the code?" gray
- "🕐 Resend code in 00:XX" orange (countdown from 30, useEffect setInterval)
- mt-4 "Get help via phone" underline gray text-center
- onClick verify: POST /api/auth/verify-otp → save token in localStorage('ml_user_token') → setUser → navigate /home

📍 Home.jsx (route "/home")
- Top bar: avatar (w-12 h-12 rounded-full bg-orange-200) + flex-col "Welcome back," text-xs gray + "Arjun!" text-lg font-bold | right: bg-orange-100 px-4 py-2 rounded-xl "BALANCE / ₹120.50" orange
- mt-4 mx-4 orange banner: bg-orange-500 text-white rounded-2xl p-5 shadow
  - flex gap-3: PartyPopper icon + "Big Winner Today!" font-bold
  - mt-2 "Someone just won ₹25,000 in Quick 5. Could you be next?"
- mt-6 mx-4 "⭐ Featured Games" flex items-center gap-2 text-xl font-bold (Star icon orange in circle)
- mt-4 mx-4 Game Card 1 (Super Daily):
  - bg-white rounded-2xl shadow overflow-hidden
  - Top image area: h-48 bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-700 relative
    - Top-left yellow pill: bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold → "HOT JACKPOT"
    - Bottom-left "Super Daily" text-3xl text-white font-extrabold
  - Bottom info: p-5
    - flex justify-between:
      - col: "ESTIMATED JACKPOT" text-xs uppercase tracking-wider gray + "₹5,000,000" text-2xl font-bold text-orange-500
      - col: "NEXT DRAW" + "2h : 15m" text-xl font-bold
    - mt-4 button: bg-orange-500 text-white w-full py-3 rounded-xl font-bold flex center gap-2 → Ticket icon + "Play Now" (onClick toast: "Visit your local agent to play")
- mt-4 mx-4 Game Card 2 (Quick 5): same structure with image bg different (gradient blue), "EVERY 15 MINS" blue pill, "Quick 5", "TOP PRIZE ₹50,000", "DRAWING / Every 15 min", "🚀 Play Now"
- mt-6 mx-4 "Past Winners" text-xl font-bold
- Horizontal scroll: flex gap-3 overflow-x-auto px-4 pb-2
  - Cards (min-w-32): bg-white p-3 rounded-2xl shadow flex flex-col items-center
    - avatar circle bg-orange-200 w-12 h-12
    - "Mary J." font-bold mt-2 text-sm
    - "₹500 won" text-xs text-green-600 font-semibold
  - Repeat for "Bob L. ₹1,200 won", "Sarah ₹500 won"
- BottomNav with Home active

📍 Tickets.jsx (route "/tickets")
- Top bar: orange Ticket icon + "My Tickets" text-2xl font-bold + right Bell icon (with red dot if unread notifications)
- mt-4 mx-4 Tabs: flex bg-orange-100 rounded-xl p-1
  - [Active] active: bg-orange-500 text-white rounded-lg py-3 flex-1 font-bold
  - [Past Draws] inactive: text-gray-500 py-3 flex-1
- Active tab cards (mt-6 mx-4 space-y-5):
  Card 1: bg-white rounded-2xl shadow-md overflow-hidden
    - Top section: bg-gradient-to-br from-orange-400 to-orange-600 p-5 text-white relative
      - top-right pill: bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold "ACTIVE"
      - "Mega Jackpot" text-sm opacity-90
      - "Daily Mini Lotto" text-2xl font-extrabold mt-1
    - Body: p-5
      - flex justify-between text-sm
        - col: "DRAW DATE" gray uppercase text-xs + "Oct 25, 2023 • 8:00 PM" font-semibold
        - col text-right: "ENTRY" gray uppercase text-xs + "₹2.00" text-orange-500 font-bold
      - mt-4 "YOUR NUMBERS" text-xs uppercase text-gray-500
      - mt-2 flex gap-2: 5x NumberBall component (w-10 h-10 rounded-full border-2 border-orange-300 text-orange-500 font-bold flex center) showing 04, 12, 21, 33, 45
      - mt-4 button: bg-orange-100 text-orange-600 w-full py-3 rounded-xl font-semibold flex center gap-2 → Eye icon + "View Details" → /tickets/:id
  Card 2 (Winner): same structure
    - top-right pill: bg-yellow-400 text-yellow-900 → "🏆 WINNER!" (Award icon)
    - "Quick Win Series" / "Quick Pick 5"
    - "PRIZE" + "₹500.00" green
    - Numbers all filled orange (bg-orange-500 text-white)
    - Button: bg-orange-500 text-white "🏆 Claim Prize" → /winning/:id/claim
  Card 3 (Processing): bg-white rounded-2xl
    - bg-gray-100 top section
    - gray pill "PROCESSING" with Clock icon
    - "Nightly Draw" / "Midnight Madness"
    - Body: "Draw results being finalized..." text-gray-500 + RefreshCcw icon right
- Fetch GET /api/tickets, filter by tab
- BottomNav Tickets active (orange with red dot top-right of icon)

📍 TicketDetail.jsx (route "/tickets/:id")
- Back + "Ticket Details"
- Hero card with ticket info, large QR placeholder (use inline SVG with random pattern), all 5 numbers as big balls, draw date, status pill, prize if won
- "Share Ticket" + "Download" buttons

📍 Winning.jsx (route "/winning/:id")
- Top: back + "Mini Lottos" orange center
- Dark celebration card: h-72 bg-gradient-to-b from-gray-900 to-orange-900 rounded-2xl mx-4 relative overflow-hidden
  - $ coin top-left
  - center: huge 🎉 emoji + PartyPopper icon
  - bottom: confetti pattern (CSS dots)
- mt-6 "Congratulations!" text-5xl text-orange-500 font-extrabold text-center
- mt-3 "Your ticket has won a prize!" text-xl text-center
- mt-6 mx-4 yellow card: bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-6 text-center
  - "TOTAL WINNINGS" text-xs uppercase orange tracking-wider
  - "₹50,000" text-5xl font-extrabold mt-2
  - mt-3 flex center gap-2: Award icon yellow-600 + "Jackpot Tier 2" font-bold
- mt-4 mx-4 white card: p-4 rounded-2xl shadow
  - flex justify-between: "TICKET NUMBER / #L-98710" | "DRAW DATE / Oct 20, 2023"
- mt-6 mx-4 orange button "View Details" → /winning/:id/claim
- mt-3 mx-4 light-orange button "🎧 Contact Agent"

📍 ClaimDetails.jsx (route "/winning/:id/claim")
- Back + "Winning Ticket Details"
- Orange hero card: bg-orange-500 rounded-2xl p-6 text-white text-center
  - PartyPopper icon top-right rotated
  - "CONGRATULATIONS!" uppercase tracking-wider
  - "₹50,000" text-4xl font-extrabold mt-2
  - mt-3 white pill "Grand Prize Winner" inline-block
- mt-4 white card divide-y:
  - row: "TICKET NUMBER" + "#L-98710" orange | right: orange Clock icon pill "Pending Collection"
  - row 2col: "DRAW DATE / Oct 20, 2023" | "LOTTERY TYPE / Mini Weekly"
- mt-6 "Assigned Agent" font-bold text-xl
- White card p-4 flex gap-4 items-center:
  - Avatar w-16 h-16 rounded-full bg-orange-200
  - col: "Rajesh Kumar" font-bold + "📞 +91 98765 43210" gray
- mt-4 orange button: "📞 Call Agent" w-full py-4 rounded-2xl → window.location='tel:+919876543210'
- mt-6 "Steps to Collect Your Prize" font-bold
- 3 numbered steps: each = flex gap-4
  - orange circle "1" w-10 h-10 rounded-full text-orange-500 bg-orange-100 font-bold
  - col: "Call your assigned agent" font-bold + gray description
- Steps content:
  1. Call your assigned agent — Discuss the verification process and fix an appointment.
  2. Visit the district lottery office — Head to the nearest official center as directed by your agent.
  3. Present your ticket and ID proof — Carry your original physical ticket and a valid government ID (Aadhar/PAN).
- BottomNav with My Tickets active

📍 Results.jsx (route "/results")  
[ALSO acts as alternative home with district view]
- Top: avatar + col: "Good Evening" + "📍 Kochi" (MapPin icon) | right Bell
- mt-4 mx-4 big orange card: bg-orange-500 rounded-2xl p-6 text-white text-center
  - "TODAY'S BIGGEST PRIZE" uppercase tracking-wider
  - "₹1,00,00,000" text-4xl font-extrabold mt-3
  - mt-5 button: bg-white text-orange-600 px-10 py-3 rounded-full font-bold "Play Now"
- mt-6 mx-4 grid grid-cols-2 gap-4:
  - 4 cards (bg-white p-5 rounded-2xl shadow text-center):
    - icon circle (w-14 h-14 bg-orange-100 rounded-full mx-auto flex center) + Ticket icon orange + "View Active Tickets" mt-3 font-bold → /tickets
    - History icon + "View Past Tickets" → /tickets?tab=past
    - ShoppingCart icon + "Buy Mini Entry" → toast "Contact agent"
    - Trophy icon + "Check Results" → /results
- mt-6 mx-4 "Mini Lottos Pool Size (District Wise)" font-bold
- Horizontal scroll: flex gap-3 overflow-x-auto px-4 pb-2
  - Cards min-w-40 p-4 rounded-2xl:
    - Kochi (highlighted): bg-orange-100 border-2 border-orange-300, "Kochi" gray + "₹5.2L" text-2xl text-orange-500 font-extrabold
    - Trivandrum white border, "₹3.8L"
    - Calicut white border, "₹4.1L"
- mt-4 mx-4 green card: bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 items-center
  - green circle with PartyPopper white icon
  - col: "Recent Winner!" font-bold green-800 + "Rajesh from Kochi won ₹50,000" green-700
- BottomNav

📍 Rewards.jsx (route "/rewards")
- Top: Menu (hamburger) + "Mini Lottos" orange center + Bell right
- mt-4 mx-4 orange card: bg-orange-500 rounded-2xl p-6 text-white relative
  - huge $ icon (DollarSign w-32 h-32) absolute right-2 top-1/2 -translate-y-1/2 opacity-30
  - "Your Rewards" font-medium
  - mt-2 flex items-baseline gap-2: "18" text-6xl font-extrabold + "Coins" text-xl
  - mt-4 inline-flex bg-white/20 px-3 py-2 rounded-full: Info icon + "1 Coin = ₹1. Use for entry tickets."
- mt-6 mx-4 "🎮 Play & Earn" flex gap-2 text-xl font-bold (Gamepad2 icon orange)
- mt-4 mx-4 list (space-y-3) — 4 cards (bg-white p-4 rounded-2xl shadow flex items-center justify-between):
  - left: icon square (w-12 h-12 rounded-xl bg-blue-100 flex center) + Brain/HelpCircle icon blue + col: "Daily Quiz" font-bold + "Answer easy questions" text-xs gray
  - right: bg-orange-100 text-orange-600 px-3 py-2 rounded-xl font-bold "+3 Coins" (onClick: POST /api/rewards/play → animate +coins, toast)
  Items: 
  1. Daily Quiz (blue icon HelpCircle) +3
  2. Trivia Challenge (yellow icon Brain) +2
  3. Culture Mini Game (green icon Building2) +5
  4. Educational Game (purple icon Lightbulb) +2
- mt-6 mx-4 "🎉 Unlock Visual Rewards" flex gap-2 text-xl font-bold (PartyPopper icon)
- Horizontal scroll cards (min-w-44 rounded-2xl overflow-hidden):
  - Card 1: h-32 bg-gradient-to-br from-red-500 to-orange-600 with Play icon center white + bottom label "Animated Prize Video"
  - Card 2: h-32 bg-gradient-to-br from-orange-300 to-amber-500 with cartoon character placeholder + "PREMIUM" yellow pill top-right + bottom "Retro Character"
- mt-6 mx-4 button: bg-orange-500 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → Ticket icon + "REDEEM FOR MINI LOTTO ENTRY"
- BottomNav with "GAMES" tab (orange when active) — change nav to: Home / Games (active) / Winners / Profile

📍 RewardsBalance.jsx (route "/rewards/balance")
- Top: Menu + "Mini Lottos" + Bell
- mt-4 mx-4 big orange card bg-orange-500 rounded-2xl p-8 text-white text-center
  - white circle w-20 h-20 rounded-full mx-auto bg-white flex center with $ icon orange
  - mt-5 "25 Coins" text-4xl font-extrabold
  - "Your Current Balance" text-sm opacity-90 mt-1
  - mt-5 inline-block bg-orange-400/50 px-6 py-2 rounded-full text-sm font-bold "KEEP PLAYING TO EARN MORE!"
- mt-6 mx-4 "Earn More Coins" flex items-center justify-between
  - left: text-xl font-bold
  - right: Sparkles icon orange
- mt-4 mx-4 space-y-3:
  - Daily Quiz card: bg-blue-500 text-white p-4 rounded-2xl flex items-center justify-between
    - left: HelpCircle icon white bg in rounded-xl + col: "Daily Quiz" font-bold + "Earn up to 10 coins" text-sm
    - right: ChevronRight white
  - Trivia Night: bg-purple-500 Trophy icon, "Earn up to 50 coins"
  - Mind Games: bg-green-500 GraduationCap icon, "Earn up to 15 coins"
- mt-6 mx-4 dashed border card: border-2 border-dashed border-orange-400 rounded-2xl p-5 bg-white
  - flex justify-between top: "REDEEM COINS" font-bold + right orange pill "Best Value"
  - mt-4 inner card: bg-orange-50 rounded-xl p-5 text-center border border-dashed border-orange-200
    - "1 Coin = ₹1" text-3xl text-orange-500 font-extrabold
    - "Instant Conversion" gray mt-2
  - mt-4 button: bg-orange-500 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → Ticket icon + "REDEEM FOR ENTRY"
  - mt-3 "Use your 25 coins for 25 Mini Lotto entries" text-xs gray text-center
- BottomNav: Home / Lottos / Rewards (active orange) / Profile

📍 Help.jsx (route "/help")
- Top: back + "Support Center"
- mt-2 "Hello! How can we help you win today?" text-lg
- mt-6 mx-4 "Common Help Topics" font-bold text-lg
- mt-4 space-y-3:
  - Card with orange left border: bg-white p-4 rounded-2xl shadow border-l-4 border-orange-500 flex items-center gap-4
    - icon circle bg-orange-100 w-14 h-14 + Ticket icon orange
    - col flex-1: "Ticket Status Help" font-bold + "Check if your numbers won" text-sm gray
    - ChevronRight icon
  - Card with green left border: bg-white border-l-4 border-green-500
    - bg-green-100 + Banknote icon green
    - "Claim My Prize" + "Easy steps to get your money"
- mt-6 "Frequently Asked Questions" font-bold text-lg
- mt-4 mx-4 space-y-3 — 4 accordion cards (bg-white rounded-2xl p-4 shadow):
  - flex justify-between items-center, onClick toggle:
    - "When are the daily draws?" font-semibold
    - bg-orange-500 text-white w-8 h-8 rounded-full flex center "+" or Minus icon when open
  - Below if open: text-sm gray "Daily draws happen at 8:00 PM IST every evening."
  Items:
  1. When are the daily draws? → 8:00 PM daily
  2. Is my personal data safe? → Yes, encrypted with bank-grade security
  3. How do I update my bank details? → Visit your local agent
  4. Minimum age to play? → 18 years and above
- mt-6 mx-4 orange dashed card: border-2 border-dashed border-orange-300 bg-orange-50 rounded-2xl p-5
  - flex gap-2: HelpCircle icon orange + "Talk to Us" font-bold text-xl
  - mt-4 space-y-3:
    - White card: flex gap-3 items-center
      - blue MapPin icon in bg-blue-100 circle
      - col flex-1: "Your Local Agent" text-xs uppercase tracking-wider + "Call Agent Near You" font-bold orange
      - Phone icon gray
    - White card:
      - orange Headphones icon in bg-orange-100 circle
      - col: "Official Helpline" + "0800-MINI-LOTTO" font-bold
      - Phone icon
- BottomNav: Help active

📍 Notifications.jsx (route "/notifications")
- Top: back + "Notifications" + right "Clear" orange (onClick DELETE /api/notifications)
- mt-4 mx-4 "RECENT NOTIFICATIONS" text-xs uppercase tracking-wider gray font-bold
- mt-3 mx-4 space-y-4 — cards (bg-white rounded-2xl shadow p-4 border-l-4 flex gap-3):
  - Orange border-l: 
    - bg-orange-100 w-12 h-12 rounded-full flex center + Trophy icon orange
    - col flex-1: "Winning Alert!" font-bold + mt-1 "Congratulations! You won <span class='text-orange-500 font-bold'>₹500</span> in the Weekly Draw." + mt-3 flex gap-1 items-center text-xs gray "🕐 Oct 25, 10:30 AM"
    - top-right: orange dot (unread indicator)
  - Blue border-l:
    - bg-blue-100 + Ticket icon blue
    - "Draw Result Out" + "The results for today's Mini Weekly draw are out. Check your tickets now!" + "🕐 Oct 24, 8:00 PM"
  - Purple border-l:
    - bg-purple-100 + Gift icon purple
    - "Daily Bonus" + "Earn <span class='text-purple-600 font-bold'>double coins</span> today by playing our Daily Quiz!" + "🕐 Oct 23, 11:15 AM"
- mt-8 text-center italic text-gray-400 "That's all for now!"
- BottomNav with Alerts tab (orange + red dot) — change nav for this page to: Home / Tickets / Alerts (active) / Rewards / Help

📍 Profile.jsx (route "/profile")
- Top: "Profile" centered + Bell
- mt-6 center: avatar w-24 h-24 rounded-full bg-orange-200 mx-auto + camera edit icon overlay
- mt-3 "Arjun" text-2xl font-bold text-center
- "+91 9999999999" text-gray-500 text-center
- mt-4 mx-4 grid grid-cols-2 gap-4:
  - Card bg-orange-50 p-4 rounded-2xl text-center: "BALANCE" text-xs uppercase + "₹120.50" text-2xl font-bold orange
  - Card bg-yellow-50 p-4 rounded-2xl: "COINS" + "18" text-2xl font-bold text-yellow-600
- mt-6 mx-4 space-y-2 cards (bg-white p-4 rounded-2xl shadow flex items-center gap-4):
  - Edit icon orange in bg-orange-100 circle + "Edit Profile" font-semibold + ChevronRight right
  - Languages icon + "Language" + "English" gray right + ChevronRight
  - Bell icon + "Notifications" + Switch toggle right
  - Shield icon + "Privacy & Security" + ChevronRight
  - HelpCircle icon + "Help & Support" + ChevronRight
  - LogOut icon RED + "Logout" text-red-500 (onClick logout)
- BottomNav: Profile active

═══════════════════════════════════════════════════════
APP.jsx
═══════════════════════════════════════════════════════
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import Winning from './pages/Winning';
import ClaimDetails from './pages/ClaimDetails';
import Results from './pages/Results';
import Rewards from './pages/Rewards';
import RewardsBalance from './pages/RewardsBalance';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/winning/:id" element={<Winning />} />
            <Route path="/winning/:id/claim" element={<ClaimDetails />} />
            <Route path="/results" element={<Results />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/rewards/balance" element={<RewardsBalance />} />
            <Route path="/help" element={<Help />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

═══════════════════════════════════════════════════════
CRITICAL RULES
═══════════════════════════════════════════════════════
1. ❌ NO BLANK PAGES. Every screen must render FULL JSX as described.
2. ✅ Tailwind config content paths must be correct.
3. ✅ Wrap with BrowserRouter + AuthProvider + DataProvider properly.
4. ✅ Backend MUST seed data on first run. Auto-trigger if empty.
5. ✅ OTP must be printed to backend terminal clearly.
6. ✅ CORS enabled for http://localhost:5173 (and 5174 for agent compatibility).
7. ✅ Use lucide-react for ALL icons. No emoji-only.
8. ✅ Mobile-first: max-w-[430px] mx-auto always.
9. ✅ All buttons must work — no dead clicks. Use toasts for "not implemented" actions.
10. ✅ Code must be PRODUCTION-READY. No TODO comments, no placeholders.

═══════════════════════════════════════════════════════
RUN INSTRUCTIONS — create README.md with this
═══════════════════════════════════════════════════════
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
2. Enter phone: 9999999999
3. Click "Send OTP"
4. **CHECK BACKEND TERMINAL** for OTP code (e.g., "📱 OTP for 9999999999: 4521")
5. Enter OTP → land on Home with tickets, balance, notifications

PROMPT 2 — AGENT APP (MERN Full Stack)
Paste this entire block into your AI tool after building the user app:

text

Build a COMPLETE MERN stack mobile application called "Mini Lottos Agent Portal" in a folder named `mini-lottos-agent`. This is the agent-side application that creates and manages tickets, which appear in the User App.

⚠️ IMPORTANT: This app shares the SAME MongoDB database as the User App ("mini_lottos" DB). When the agent creates a user or ticket here, it must be readable by the User App backend.

═══════════════════════════════════════════════════════
FOLDER STRUCTURE
═══════════════════════════════════════════════════════
mini-lottos-agent/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── Agent.js
│   │   ├── User.js          (SAME schema as user-app)
│   │   ├── Ticket.js        (SAME schema)
│   │   ├── Notification.js  (SAME schema — for user notifications)
│   │   └── WinnerAlert.js   (NEW — for agent's winner alerts)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── reportRoutes.js
│   │   └── alertRoutes.js
│   ├── controllers/...
│   ├── middleware/authMiddleware.js
│   ├── utils/
│   │   ├── seed.js
│   │   └── drawEngine.js    (auto-resolves draws, picks winners)
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── api/axios.js
    │   ├── context/AgentAuthContext.jsx
    │   ├── components/
    │   │   ├── MobileLayout.jsx
    │   │   ├── BottomNav.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── Toast.jsx
    │   │   └── Loader.jsx
    │   └── pages/
    │       ├── Login.jsx
    │       ├── Dashboard.jsx
    │       ├── ScanTicket.jsx
    │       ├── CreateEntry.jsx
    │       ├── LinkUser.jsx
    │       ├── RegisterUser.jsx
    │       ├── LinkedSuccess.jsx
    │       ├── TicketRecords.jsx
    │       ├── Reports.jsx
    │       ├── WinnerAlert.jsx
    │       └── Settings.jsx
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── index.html
    └── package.json

═══════════════════════════════════════════════════════
BACKEND (Node.js + Express + MongoDB + Mongoose + JWT)
═══════════════════════════════════════════════════════
PORT: 5002

.env:
```
PORT=5002
MONGO_URI=mongodb://localhost:27017/mini_lottos
JWT_SECRET=agent_secret_key_2024
NODE_ENV=development
```

⚠️ MONGO_URI is THE SAME as User App → so data is shared.

INSTALL: express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, morgan, node-cron

MONGOOSE MODELS:

Agent.js:
{ agentId: String unique (8-digit), password: String hashed, name: String, phone: String, district: String, photo: String default avatar URL, ticketsSoldToday: Number default 0, totalSales: Number default 0, createdAt }

User.js (MUST match user-app schema):
{ phone: String unique, name: String, district: String, balance: Number default 120.50, coins: Number default 18, agentId: String, avatar: String, createdAt }

Ticket.js (MUST match user-app schema):
{ ticketNumber: String unique, userId: ObjectId ref User, userPhone: String, agentId: String, numbers: [Number], category: String, price: Number, drawDate: Date, status: String, prize: Number default 0, gameName: String, contacted: Boolean default false, createdAt }

Notification.js (for user-side):
{ userId: ObjectId ref User, type: String, title: String, message: String, read: Boolean default false, createdAt }

WinnerAlert.js (agent-side):
{ agentId: String, ticketId: ObjectId ref Ticket, ticketNumber: String, prize: Number, winnerName: String, winnerPhone: String, contacted: Boolean default false, createdAt }

API ENDPOINTS:

POST  /api/auth/login           body: {agentId, password}
  → bcrypt compare, sign JWT, return {token, agent}

GET   /api/auth/me              [PROTECTED] → current agent

POST  /api/users/register       [PROTECTED] body: {name, phone, district}
  → generate 8-digit user ID (used as phone alias)
  → check phone doesn't exist
  → create User with agentId=current agent's id
  → return generated ID (formatted XXXX-XXX)

GET   /api/users/search         [PROTECTED] query: ?q=8829-551 or ?q=9999999999
  → search by phone OR _id

POST  /api/tickets/create       [PROTECTED] body: {entries, category, price}
  → create draft ticket (status='pending', userId=null) → returns ticketId

POST  /api/tickets/link         [PROTECTED] body: {ticketId, userId}
  → link userId to ticket, set status='active'
  → generate random 5 numbers (1-49)
  → set drawDate +5 days
  → CREATE Notification for user: "New ticket purchased"
  → return updated ticket

GET   /api/tickets              [PROTECTED] query: ?status=all|active|completed|winner&search=...
GET   /api/tickets/:id          [PROTECTED]
POST  /api/tickets/scan         [PROTECTED]
  → returns random ticket from agent's tickets (mock scan)

POST  /api/tickets/:id/contacted [PROTECTED]
  → marks winner as contacted in WinnerAlert and Ticket

GET   /api/reports/daily        [PROTECTED]
  → today's stats: ticketsSold, miniLottoEntries, winners

GET   /api/reports/sales        [PROTECTED] query: ?period=daily|weekly
  → returns chart data: arrays of {label, value}
  → daily: hourly (6am, 9am, 12pm, 3pm, 6pm, 9pm, 12am)
  → weekly: MON to SUN

GET   /api/reports/activity     [PROTECTED]
  → last 10 ticket activities for dashboard

GET   /api/alerts/winners       [PROTECTED] → unread winner alerts for this agent
PUT   /api/alerts/winners/:id/read [PROTECTED]

DRAW ENGINE (utils/drawEngine.js):
- Use node-cron, runs every 60 seconds
- Find tickets where drawDate <= now AND status='active'
- For each: randomly mark as 'won' (20% chance) or 'lost' (80%)
- If won: assign random prize from [500, 1000, 5000, 10000, 25000, 50000]
- If won: create Notification for user + create WinnerAlert for the ticket's agent
- console.log results

SEED SCRIPT (auto-run on first start if Agent collection empty):
- 1 Agent: 
  • agentId: "88291020"
  • password: "agent123" (bcrypt hashed)
  • name: "Sarah Miller"
  • phone: "+1234567890"
  • district: "North Central District"
  • photo: "https://i.pravatar.cc/150?img=47"

- Don't seed Users/Tickets here — user-app seed handles those. But if Users collection is empty (e.g. agent-app started first), seed 2 users too:
  • {phone:"9999999999", name:"Arjun", district:"Kochi"}
  • {phone:"8888888888", name:"Priya", district:"Trivandrum"}

- Create 2 winner alerts for agent 88291020:
  • Ticket #8742, Rahul Sharma, +91 98765 43210, ₹50,000

═══════════════════════════════════════════════════════
FRONTEND (Vite + React + Tailwind + Router + Axios + Recharts)
═══════════════════════════════════════════════════════
PORT: 5174

INSTALL: react, react-router-dom, axios, lucide-react, recharts, tailwindcss, postcss, autoprefixer

tailwind.config.js:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: {
      primary: '#2563EB',
      'primary-dark': '#1E40AF',
      'primary-light': '#EFF6FF'
    },
    fontFamily: { sans: ['Inter', 'sans-serif'] }
  }},
  plugins: [],
}
```

vite.config.js:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 }
});
```

api/axios.js: baseURL "http://localhost:5002/api" with Bearer token from localStorage 'ml_agent_token'.

AgentAuthContext: {agent, token, login(agentId, password), logout(), refreshAgent()}

MobileLayout same as user-app but with blue accent.

BottomNav: 4 tabs varying per screen — common set: Home, Tickets, Users, Reports OR Home, Users, Reports, Settings. Active tab = blue, inactive gray.

═══════════════════════════════════════════════════════
SCREENS — RENDER FULL CONTENT (NO BLANKS!)
═══════════════════════════════════════════════════════

🔷 Login.jsx (route "/")
- Top bar: "Agent Login" centered text-xl font-bold + right Info icon (blue circle with i)
- mt-4 mx-4 hero image card: h-48 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden
  - Polygon overlay pattern (use SVG with semi-transparent triangles)
  - Center: w-24 h-24 bg-white rounded-2xl shadow-2xl flex center
    - Landmark icon w-12 h-12 text-blue-700
- mt-8 "Welcome Back" text-3xl font-extrabold text-center
- mt-2 "Please enter your credentials to access the terminal." text-gray-600 text-center
- mt-8 mx-4 form:
  - "AGENT ID" text-xs uppercase tracking-wider font-bold mb-2
  - Input wrapper relative:
    - IdCard icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
    - <input placeholder="Enter your 8-digit ID" maxLength="8" className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-600 outline-none" />
  - mt-5 "PASSWORD" label
  - Input wrapper with Lock icon left + Eye/EyeOff toggle right (onClick toggles type)
  - mt-8 button: bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-2xl font-bold text-lg flex center gap-2 → "LOGIN TO PORTAL" + LogIn icon
- mt-6 mx-4 flex items-center gap-4: line + "OR" gray + line
- mt-6 center: Biometric login
  - w-20 h-20 bg-white border-2 border-blue-200 rounded-2xl shadow flex center mx-auto → Fingerprint icon w-12 h-12 text-blue-600
  - mt-3 "Biometric Login" text-center font-semibold
  - onClick: auto-login with demo creds
- mt-6 text-center "Forgot Password?" text-blue-600 font-semibold
- bottom (absolute bottom-4 left-0 right-0) text-center: 
  - flex center gap-2: Lock icon + "Authorized Agents Only" font-bold
  - "Warning: Unauthorized access is strictly prohibited and monitored." text-xs gray mt-1 px-8
- onSubmit: POST /api/auth/login → on success save token + navigate /dashboard

🔷 Dashboard.jsx (route "/dashboard")
- Top bar: w-10 h-10 bg-blue-100 rounded-xl flex center + Landmark icon blue + "Agent Portal" text-xl font-bold | right: Bell (with red dot) + Menu icons
- mt-4 mx-4 profile card: bg-white p-4 rounded-2xl shadow flex items-center gap-4
  - Avatar w-20 h-20 rounded-2xl (use agent.photo)
  - col flex-1:
    - "Agent Sarah Miller" text-xl font-bold
    - "ID: 8829-102" text-blue-600 font-semibold mt-1
    - mt-1 flex items-center gap-1 text-gray-500: MapPin icon + "North Central District" text-sm
- mt-6 mx-4 "QUICK ACTIONS" text-xs uppercase tracking-wider gray font-bold
- mt-3 mx-4 space-y-3:
  - Card 1 (BLUE, primary action): bg-blue-600 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4 → /scan
    - w-14 h-14 bg-white/20 rounded-2xl flex center + QrCode icon white
    - col: "Scan Ticket" text-xl font-bold + "Verify winners instantly" text-sm opacity-90
  - Card 2 (white): bg-white p-5 rounded-2xl shadow flex items-center gap-4 → /register-user
    - w-14 h-14 bg-blue-100 rounded-2xl + UserPlus icon blue
    - col: "Register User" font-bold + "Add new participant" text-sm gray
  - Card 3 (white): → /link
    - bg-blue-100 + Link2 icon blue
    - "Link Ticket" + "Connect user to ticket"
- mt-6 mx-4 "DAILY PERFORMANCE" text-xs uppercase tracking-wider gray font-bold
- mt-3 mx-4 grid grid-cols-3 gap-3:
  - StatCard bg-white p-4 rounded-2xl shadow text-center:
    - "142" text-3xl font-extrabold + "Tickets Sold Today" text-xs gray mt-1
  - "89" + "Mini Lotto Entries"
  - "12" text-green-500 + "Winning Tickets"
- mt-6 mx-4 flex justify-between items-center: "RECENT TICKET ACTIVITY" font-bold uppercase tracking-wider gray + "View All" text-blue-600 font-semibold
- mt-3 mx-4 space-y-3:
  - Card: bg-white p-4 rounded-2xl shadow flex items-center gap-3
    - w-10 h-10 bg-green-100 rounded-full + Check icon green
    - col flex-1: "Ticket #9921" font-bold + "Sold - 2:14 PM" text-xs gray
    - right col text-right: "$10.00" font-bold + "Cash Payment" text-xs gray
  - Card 2: bg-blue-100 + Barcode icon blue, "Ticket #8821" "Scanned - 1:45 PM" + right blue pill "Verifying"
  - Card 3: green Check, "Ticket #8754" "Sold - 12:30 PM" + "$25.00" "Card Payment"
- BottomNav: Home active / Tickets / Users / Reports

🔷 ScanTicket.jsx (route "/scan")
- Top: back + "Scan Ticket"
- mt-4 mx-4 camera viewfinder:
  - relative aspect-square bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-2xl overflow-hidden
  - Inner viewfinder rectangle (absolute inset-8 border border-white/30)
  - 4 BLUE corner brackets at each corner of inner rectangle:
    - top-left: w-12 h-12, border-l-4 border-t-4 border-blue-500 absolute top-8 left-8
    - top-right: similar with border-r-4 border-t-4
    - bottom-left, bottom-right similar
  - Horizontal scan line: absolute left-8 right-8 top-1/2 h-1 bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.8)] animate-pulse
  - Flashlight button: absolute bottom-4 right-4 w-12 h-12 bg-black/70 rounded-xl flex center + Flashlight icon white
- mt-6 mx-4 text-center:
  - "Place the ticket QR code inside the frame" font-bold
  - mt-2 "Ensure good lighting for better accuracy" text-sm text-gray-500
- mt-6 mx-4 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold "🎯 SIMULATE SCAN"
  → onClick: POST /api/tickets/scan → show result card with animation
- AFTER SCAN, result card appears mt-4 mx-4 bg-white p-4 rounded-2xl shadow:
  - flex items-center gap-3
    - w-12 h-12 bg-blue-100 rounded-2xl + Ticket icon blue
    - col flex-1: "Ticket #9921" font-bold + "Scanned at 14:32 Today" text-xs gray
    - bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold "VALID"
    - w-8 h-8 bg-blue-600 rounded-full flex center + Check icon white
- mt-6 mx-4 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 "Continue Processing >" → if winner navigate /winner-alert/:id else /tickets
- mt-3 mx-4 text-center text-gray-500 underline "Enter Code Manually"

🔷 CreateEntry.jsx (route "/create-entry")
- Top: back + "Mini Lottos Entry"
- mt-4 mx-4 hero card: bg-blue-100 rounded-2xl p-6 text-center
  - w-20 h-20 bg-blue-600 rounded-2xl shadow mx-auto flex center + Ticket icon white
  - mt-4 "Agent Terminal" text-2xl text-blue-700 font-bold
  - "Issue new lottery entries quickly" text-gray-600 mt-1
- mt-6 mx-4 "ENTRY DETAILS" text-xs uppercase tracking-wider gray font-bold
- mt-3 mx-4 "Number of Entries" font-semibold mb-2
- Input with # icon (Hash from lucide), default value 4, type number, bg-white border rounded-2xl py-4 pl-12 pr-4
- mt-6 "Lottery Category" font-semibold mb-3
- grid grid-cols-2 gap-3:
  - Card 1 (selected): bg-blue-50 border-2 border-blue-600 rounded-2xl p-5 text-center relative
    - top-right: w-6 h-6 bg-blue-600 rounded-full flex center + Check icon white
    - "₹5" text-2xl text-blue-600 font-extrabold
    - "Basic Entry" font-semibold mt-1
  - Card 2: bg-white border border-gray-200 rounded-2xl
    - "₹10" text-2xl font-extrabold
    - "Premium Entry"
- mt-6 mx-4 Calculation Summary card: bg-slate-900 text-white rounded-2xl p-5
  - "Calculation Summary" font-bold mb-4
  - flex justify-between
    - col: "Entries: 4" + mt-1 "Price: ₹5.00/ea"
    - col text-right: "TOTAL VALUE" text-xs opacity-70 + "₹20.00" text-3xl font-extrabold text-blue-400
- Bottom fixed mx-4 mb-6 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → "Proceed to Link User" + ArrowRight
  → POST /api/tickets/create → save returned ticketId in localStorage 'pending_ticket' → navigate /link
- below button mt-3 text-center text-xs uppercase tracking-wider gray "AUTHORIZED GOVERNMENT LOTTERY AGENT PORTAL"

🔷 LinkUser.jsx (route "/link")
- Top: back + "Link Ticket to User"
- mt-4 mx-4 "Select User Type" text-2xl font-bold
- "Choose how to link this transaction" text-gray-500 mt-1
- mt-6 mx-4 flex items-center gap-2: w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-bold flex center "1" + "EXISTING USER" text-xs uppercase tracking-wider font-bold
- mt-3 mx-4 card: bg-white p-4 rounded-2xl shadow
  - Mock scanner box: h-40 bg-emerald-800 rounded-xl relative overflow-hidden
    - 4 white corner brackets like ScanTicket but smaller
    - center text "0011-15ATE" text-white font-mono text-xl
    - small circle below center (w-3 h-3 bg-white rounded-full)
  - mt-3 "Search existing database by ID number or mobile." text-sm text-gray-600 text-center
  - mt-3 input wrapper:
    - IdCard icon left + <input placeholder="Enter User ID" className="..." />
  - mt-3 button: bg-blue-600 text-white w-full py-3 rounded-xl font-bold flex center gap-2 → Search icon + "Search User"
    → GET /api/users/search?q=... → if found: POST /api/tickets/link with pendingTicketId → navigate /linked-success → else toast "User not found"
- mt-6 mx-4 flex items-center gap-4: line + "OR" gray font-bold + line
- mt-6 mx-4 flex items-center gap-2: w-8 h-8 bg-blue-600 rounded-full text-white "2" + "NEW USER"
- mt-3 mx-4 card: bg-white p-4 rounded-2xl shadow
  - Image card: h-32 bg-gradient-to-br from-sky-200 via-blue-200 to-blue-300 rounded-xl flex center
    - Pen icon (Pen from lucide) w-16 h-16 text-blue-700 rotate-45
  - mt-3 "First time player? Create a new secure account profile instantly." text-center text-gray-600
  - mt-3 button: border-2 border-blue-600 text-blue-600 w-full py-3 rounded-xl font-bold flex center gap-2 → UserPlus icon + "Register New User" → navigate /register-user
- BottomNav: Tickets / Users / Link (active blue) / Reports

🔷 RegisterUser.jsx (route "/register-user")
- Top: back + "Register New User"
- mt-6 center: w-20 h-20 bg-blue-100 rounded-2xl flex center mx-auto + UserPlus icon w-10 h-10 text-blue-600
- mt-4 "Create Agent Account" text-2xl font-bold text-center
- "Enter the lottery agent's details to authorize their mobile application access." text-gray-500 text-center mt-2 px-4
- mt-8 mx-4 form space-y-5:
  - col: "FULL NAME" text-xs uppercase font-bold mb-2 + Input with IdCard icon left, placeholder "Legal full name"
  - col: "PHONE NUMBER" + Input with Phone icon, placeholder "10-digit mobile number", maxLength="10"
  - col: "DISTRICT" + Select wrapper:
    - MapPin icon absolute left + ChevronDown right + select with options: Select District (disabled default), Kochi, Trivandrum, Calicut, Kannur, Thrissur, Palakkad
- mt-8 mx-4 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → Fingerprint icon + "Generate User ID"
  → POST /api/users/register → show generated ID card below
- IF GENERATED, mt-6 mx-4 dashed card: border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-6 text-center
  - "GENERATED ID" text-xs uppercase tracking-wider gray font-bold
  - mt-3 "8829 - 551" text-4xl font-extrabold text-blue-600 tracking-widest
  - mt-4 flex justify-center gap-6:
    - button: flex items-center gap-2 text-gray-700 → Copy icon + "Copy" (onClick: navigator.clipboard.writeText)
    - "|" divider
    - button: flex items-center gap-2 → Share2 icon + "Share"
- mt-4 mx-4 button: border-2 border-blue-600 text-blue-600 w-full py-4 rounded-2xl font-bold flex center gap-2 → Download icon + "Install User App"
  → onClick toast "Download link copied!"
- BottomNav: Home / Users (active blue) / Reports / Settings

🔷 LinkedSuccess.jsx (route "/linked-success")
- Top: back + "Ticket Linked"
- mt-4 mx-4 green success card: bg-green-50 border border-green-200 rounded-2xl p-8 text-center
  - w-20 h-20 bg-green-500 rounded-2xl shadow-lg mx-auto flex center
    - inner w-10 h-10 bg-white rounded-full flex center + Check icon green
  - mt-5 "Ticket Successfully Linked" text-2xl font-extrabold text-green-900
  - mt-3 "Verification complete. The ticket is now associated with the user account." text-green-700 text-sm
- mt-6 mx-4 flex items-center gap-2: Ticket icon blue + "Ticket Information" text-xl font-bold
- mt-3 mx-4 white card divide-y divide-gray-100:
  - row p-4 flex justify-between: "Ticket #" text-gray-500 + "9921" font-bold
  - row p-4: "User ID" + "8829-551"
  - row p-4: "Mini Lottos entries" + "4"
  - row p-4: "Entry value" + "₹20.00"
  - row p-4 flex justify-between items-center: "Status" + bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 → green dot + "ACTIVE"
- mt-6 mx-4 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → Printer icon + "Print Receipt" (onClick window.print())
- mt-3 mx-4 button: bg-blue-100 text-blue-600 w-full py-4 rounded-2xl font-bold flex center gap-2 → Plus icon + "Process Another Ticket" → /create-entry
- mt-3 mx-4 text-center text-gray-500 flex justify-center items-center gap-2 → LayoutDashboard icon + "Return to Dashboard" → /dashboard

🔷 TicketRecords.jsx (route "/tickets")
- Top: back + "Ticket Records"
- mt-4 mx-4 search input wrapper:
  - Search icon left + <input placeholder="Search ticket or user ID" className="bg-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 w-full" />
- mt-4 mx-4 flex gap-2 overflow-x-auto:
  - filter pills: All (bg-blue-600 text-white px-5 py-2 rounded-full font-semibold) | Active (bg-gray-100 text-gray-700) | Completed | Winner
  - onClick set filter state + refetch
- mt-4 mx-4 ticket cards space-y-4 — each card bg-white p-4 rounded-2xl shadow:
  - flex justify-between: 
    - col: "TICKET NUMBER" text-xs uppercase gray tracking-wider + "#9921" text-xl font-bold mt-1
    - status pill (green ACTIVE / yellow WINNER / gray COMPLETED)
  - mt-3 grid grid-cols-2:
    - col: "User ID" text-xs gray + "8829-551" font-semibold mt-1
    - col: "Category" text-xs gray + "Mini Lottos ₹5" font-semibold mt-1
  - mt-3 button: bg-blue-50 text-blue-600 w-full py-3 rounded-xl font-bold flex center gap-2 → "View Details" + ChevronRight icon
- Sample cards: #9921 ACTIVE / #8742 WINNER yellow / #7655 COMPLETED gray / #10292 ACTIVE
- Fetch GET /api/tickets?status=... 
- BottomNav: Home / Users / Reports (active blue) / Settings

🔷 Reports.jsx (route "/reports")
- Top: Menu + "Sales Summary" text-xl font-bold + Bell (red dot)
- mt-4 mx-4 space-y-4 — stat cards:
  - Card bg-white p-5 rounded-2xl shadow flex justify-between items-start
    - col: "Tickets Sold Today" text-gray-600 + mt-2 "1,284" text-4xl font-extrabold + mt-2 flex items-center gap-1 text-green-500 font-semibold → TrendingUp icon + "+12%"
    - right: w-10 h-10 bg-blue-100 rounded-xl + Ticket icon blue
  - "Weekly Sales" + "$12,450" + "+5.2%" green + Banknote icon
  - "Mini Lottos Entries" + "856" + "-2.4%" red TrendingDown + Ticket-like icon
- mt-6 mx-4 chart card 1: bg-white p-5 rounded-2xl shadow
  - flex justify-between items-start
    - col: "Daily Sales Chart" font-bold + "Hourly distribution of ticket sales" text-xs gray
    - right: w-10 h-10 bg-blue-100 rounded-xl + Filter icon blue
  - mt-4 flex items-end gap-3: "1,284" text-3xl font-extrabold + "+8% vs yesterday" text-green-500 font-semibold text-sm
  - mt-4 ResponsiveContainer height={200}: <AreaChart data={hourlyData}>
    - blue stroke + gradient fill (blue to transparent)
    - XAxis labels: 6am, 9am, 12pm, 3pm, 6pm, 9pm, 12am
    - Data: wavy pattern, e.g. [80, 200, 150, 100, 180, 250, 60, 90, 220, 40, 200, 180]
- mt-6 mx-4 chart card 2: bg-white p-5 rounded-2xl shadow
  - "Weekly Summary Chart" font-bold
  - "Revenue comparison per day" text-xs gray
  - mt-4 ResponsiveContainer height={180}: <BarChart>
    - blue bars rounded
    - X-axis: MON TUE WED THU FRI SAT SUN
    - Data values e.g. [1200, 1500, 900, 1800, 2100, 1700, 1300]
- BottomNav: Home / Users / Reports (active blue) / Settings

🔷 WinnerAlert.jsx (route "/winner-alert/:id")
- Top: back + "Winning Ticket Alert"
- mt-4 mx-4 hero card: bg-blue-50 rounded-2xl p-6 text-center
  - w-16 h-16 bg-blue-200 rounded-2xl mx-auto flex center + Trophy icon w-8 h-8 text-blue-700
  - mt-4 "Winning Ticket Found!" text-2xl text-blue-700 font-extrabold
  - mt-2 "A winning ticket has been verified in your agent jurisdiction." text-gray-600 text-sm
- mt-6 mx-4 prize card: rounded-2xl shadow overflow-hidden
  - bg-blue-600 text-white py-3 text-center font-bold uppercase tracking-wider text-sm "CONFIRMED PRIZE"
  - bg-white p-6 text-center
    - "Prize Amount" text-gray-500
    - mt-2 "₹50,000" text-4xl font-extrabold
    - mt-4 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg inline-flex items-center gap-2 font-bold → Clock icon + "CONTACT PENDING"
- mt-6 mx-4 "TICKET INFORMATION" text-xs uppercase tracking-wider gray font-bold
- mt-3 mx-4 white card divide-y:
  - row p-4 flex items-center gap-4: 
    - w-10 h-10 bg-gray-100 rounded-xl flex center + Ticket icon gray
    - col flex-1: "TICKET NUMBER" text-xs uppercase tracking-wider gray + "#8742" font-bold mt-1
  - row p-4 flex items-center gap-4: User icon + "WINNER NAME" + "Rahul Sharma"
  - row p-4: Phone icon + "PHONE NUMBER" + "+91 98765 43210"
- mt-6 mx-4 button: bg-blue-600 text-white w-full py-4 rounded-2xl font-bold flex center gap-2 → Phone icon + "Call User" → href="tel:+919876543210"
- mt-3 mx-4 button: bg-white border border-gray-200 text-gray-700 w-full py-4 rounded-2xl font-bold "Mark as Contacted" → PUT /api/alerts/winners/:id/read + POST /api/tickets/:id/contacted → toast "Marked"
- BottomNav: Home / Users (active) / Reports / Settings

🔷 Settings.jsx (route "/settings")
- Top: back + "Settings"
- mt-4 profile card same style as Dashboard
- mt-6 mx-4 space-y-2 cards (bg-white p-4 rounded-2xl shadow flex items-center gap-4):
  - User icon blue circle + "Edit Profile" + ChevronRight
  - Bell icon + "Notifications" + Switch toggle (uncontrolled)
  - Languages icon + "Language" + "English" gray + ChevronRight
  - Shield icon + "Privacy & Security" + ChevronRight
  - HelpCircle icon + "Help & Support" + ChevronRight
  - LogOut icon RED + "Logout" text-red-500 (onClick: clear token, navigate /)
- BottomNav: Settings active

═══════════════════════════════════════════════════════
APP.jsx
═══════════════════════════════════════════════════════
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgentAuthProvider } from './context/AgentAuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanTicket from './pages/ScanTicket';
import CreateEntry from './pages/CreateEntry';
import LinkUser from './pages/LinkUser';
import RegisterUser from './pages/RegisterUser';
import LinkedSuccess from './pages/LinkedSuccess';
import TicketRecords from './pages/TicketRecords';
import Reports from './pages/Reports';
import WinnerAlert from './pages/WinnerAlert';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AgentAuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<ScanTicket />} />
          <Route path="/create-entry" element={<CreateEntry />} />
          <Route path="/link" element={<LinkUser />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/linked-success" element={<LinkedSuccess />} />
          <Route path="/tickets" element={<TicketRecords />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/winner-alert/:id" element={<WinnerAlert />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AgentAuthProvider>
    </BrowserRouter>
  );
}
```

═══════════════════════════════════════════════════════
🔗 CONNECTION TO USER APP (CRITICAL)
═══════════════════════════════════════════════════════
- Backend uses the SAME MONGO_URI as User App → reads/writes to same DB
- User collection schema MUST match user-app exactly
- Ticket collection schema MUST match
- Notification collection used to push notifications visible in user-app
- When agent registers a user → user can log in to User App with that phone → sees their data
- When agent creates+links ticket → user sees it in their Tickets tab immediately
- When drawEngine resolves wins → Notification + WinnerAlert created → user sees notification, agent sees winner alert
- Agent's CORS must allow http://localhost:5174 (its own frontend)

═══════════════════════════════════════════════════════
CRITICAL RULES
═══════════════════════════════════════════════════════
1. ❌ NO BLANK PAGES — render full JSX per design above
2. ✅ Tailwind content paths correct
3. ✅ AgentAuthProvider wraps Routes
4. ✅ Backend auto-seeds agent on first run
5. ✅ Both apps must share MongoDB DB "mini_lottos"
6. ✅ CORS enabled for http://localhost:5174
7. ✅ Use lucide-react icons
8. ✅ Use recharts for charts
9. ✅ Mobile-first max-w-[430px]
10. ✅ Production-ready, no TODO/placeholders

═══════════════════════════════════════════════════════
RUN INSTRUCTIONS (README.md)
═══════════════════════════════════════════════════════
# Mini Lottos Agent Portal

## Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017
- (Optional) User App already running for full connection demo

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

NOW BUILD COMPLETELY. PRODUCTION-READY. NO BLANK PAGES.
