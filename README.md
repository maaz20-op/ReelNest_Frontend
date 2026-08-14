# 🎬 ReelNest

**ReelNest is a full-stack social media platform built for sharing posts and reels, connecting with users, real-time communication, and interactive content sharing.**

It combines a modern **React-based frontend** with a scalable **Node.js and Express.js backend**, providing features such as **real-time chat, WebRTC video calling, private accounts, user blocking, authentication, AI-powered post creation, comments, likes, followers/following, premium subscriptions, and personalized profile management**.

The platform is designed with a strong focus on **real-time interactions, secure authentication, scalable backend architecture, media handling, and optimized feed performance** through infinite scrolling and list virtualization.

---

## 🎥 ReelNest Demo

Watch ReelNest in action:

https://github.com/user-attachments/assets/1f3a4020-ddcc-4ebf-80fb-0b43fa030a8e

## 🌐 Live Demo

**ReelNest:** https://reel-nest-frontend.vercel.app/

---

## Related Repository

**Frontend**
https://github.com/maaz20-op/ReelNest_Frontend

**Backend**
https://github.com/maaz20-op/ReelNest_Backend

---

## ✨ Features

- 💬 Real-Time Chat with Socket.IO
- 🎥 WebRTC Video Calling
- 🔐 Local Authentication
- 🔵 Google OAuth Login
- 🔑 Forgot / Reset Password
- 🔒 Private Account System
- 🚫 Block / Unblock Users
- ❤️ Like System
 - 🌓 Light / Dark Mode
- 👥 Followers / Following
- 🎬 Posts & Reels
- 💭 Comments System
- 💻 Responsive
- 🤖 AI-Powered Post Creation
- ☁️ Cloudinary Media Storage
- 💳 Stripe Premium Subscription / Payments
- ⚡ Redis + BullMQ
- 📜 Infinite Scrolling
- 🚀 List Virtualization with React Virtuoso
- 🔔 Real-Time User & Chat Events
- 🛡️ Private & Access-Controlled Content
- ⚙️ Profile & Account Settings
  - Update Username
  - Update Full Name
  - Update Bio
  - Update Profile Image / Avatar
  - Update Password
  - Secure Logout

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS + Vanilla CSS
- Framer Motion (For Animations)
- React Router -> React Router DOM (Routing)
- Redux Toolkit / RTK Query (API Calling)
- React Virtuoso (Virtualization)
- Socket.IO Client (to Connect with Backend Socket Server)
- WebRTC (Peer-to-Peer Connection)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Redis
- BullMQ
- Passport.js
- Google OAuth

### Services & Integrations for Backend

- Cloudinary
- Stripe
- Google OAuth
- AI / Hugging Face
- Railway

---

## 🏗️ Folder Architecture Overview For Frontend

```text
ReelNest_Frontend/
│
├── 📁 public/
│
├── 📁 src/
│   │
│   ├── 📁 app/
│   │   ├── 📁 config/
│   │   ├── 📁 providers/
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   │
│   ├── 📁 assets/
│   │   ├── 📄 ReelNest_Logo.png
│   │   └── 📄 icons.jsx
│   │
│   ├── 📁 components/
│   │   ├── 📁 desktop/
│   │   ├── 📁 mobile/
│   │   ├── 📁 reusableComponents/
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 RedirectNavActionIcons.jsx
│   │   └── 📄 reelNestWelcomePage.jsx
│   │
│   ├── 📁 contexts/
│   │   ├── 📄 authContext.jsx
│   │   ├── 📄 hideHeaderOnScroll.jsx
│   │   ├── 📄 incomingCallPopupContext.jsx
│   │   ├── 📄 loginUserContext.jsx
│   │   ├── 📄 peerContext.jsx
│   │   ├── 📄 searchContext.jsx
│   │   ├── 📄 socketContext.jsx
│   │   ├── 📄 theme.jsx
│   │   ├── 📄 toast.jsx
│   │   └── 📄 useConnections.jsx
│   │
│   ├── 📁 features/
│   │   ├── 📁 accountSettings/
│   │   ├── 📁 auth/
│   │   ├── 📁 blockUser/
│   │   ├── 📁 comments/
│   │   ├── 📁 feed/
│   │   ├── 📁 forgotPassword/
│   │   ├── 📁 message/
│   │   ├── 📁 notFound/
│   │   ├── 📁 polices/
│   │   ├── 📁 postCreation/
│   │   ├── 📁 posts/
│   │   ├── 📁 profile/
│   │   ├── 📁 savedPosts/
│   │   ├── 📁 searchResultsPage/
│   │   ├── 📁 upgrade/
│   │   └── 📁 videoCall/
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 protectedRoute.jsx
│   │   ├── 📄 savePost.js
│   │   ├── 📄 useBlockUnblockUser.js
│   │   ├── 📄 useFollowUser.jsx
│   │   ├── 📄 useLike.js
│   │   └── 📄 userConnectionData.js
│   │
│   ├── 📁 layouts/
│   │   ├── 📄 SocketLayout.jsx
│   │   └── 📄 mainLayout.jsx
│   │
│   ├── 📁 routes/
│   │   └── 📄 AppRoutes.jsx
│   │
│   ├── 📁 services/
│   │   ├── 📁 Ai-features/
│   │   ├── 📁 auth/
│   │   ├── 📁 comments/
│   │   ├── 📁 message/
│   │   ├── 📁 pins/
│   │   ├── 📁 posts/
│   │   ├── 📁 users/
│   │   └── 📄 baseApi.js
│   │
│   ├── 📁 skeleton/
│   │   ├── 📁 comments/
│   │   ├── 📁 connections/
│   │   ├── 📁 displayBlockedUsers/
│   │   ├── 📁 homeFeed/
│   │   ├── 📁 message/
│   │   ├── 📁 profile/
│   │   ├── 📁 video/
│   │   ├── 📄 friendSectionSkeleton.jsx
│   │   ├── 📄 header.jsx
│   │   └── 📄 leftDesktopPanel.jsx
│   │
│   ├── 📁 socketConnection/
│   │   └── 📄 messagesSocket.js
│   │
│   ├── 📁 styles/
│   │   └── 📄 index.css
│   │
│   └── 📁 utils/
│       ├── 📄 BorderDiv.jsx
│       ├── 📄 ErrorBoundary.jsx
│       ├── 📄 MapElements.jsx
│       ├── 📄 checkisFollowed.js
│       ├── 📄 contextSetup.js
│       ├── 📄 debounce.js
│       ├── 📄 handleRedirectToUserProfile.js
│       ├── 📄 navigate.js
│       ├── 📄 optimisticDeletePost.js
│       ├── 📄 showSideBarOnHover.jsx
│       ├── 📄 tooltip.jsx
│       ├── 📄 useIncomingCallContext.jsx
│       ├── 📄 useInfiniteScroll.js
│       ├── 📄 usePeerContext.jsx
│       ├── 📄 useVirtualization.jsx
│       └── 📄 videoControls.jsx
│
├── 📄 .gitignore
├── 📄 README.md
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tailwind.config.js
├── 📄 vercel.json
└── 📄 vite.config.js
```

---

### ScreenShots

**Feed page**
<img width="1920" height="1030" alt="New Tab - Google Chrome 8_14_2026 8_08_23 PM" src="https://github.com/user-attachments/assets/45a03dc7-0419-4263-ace8-0680b4d46376" />


**Profile Page**
<img width="1920" height="1030" alt="client - Google Chrome 8_14_2026 8_11_25 PM" src="https://github.com/user-attachments/assets/fbe1fa24-9f30-421e-909c-e5bd66cf7d4d" />


**Comments**

**Video Calling**
<img width="1920" height="1030" alt="New Tab - Google Chrome 8_14_2026 10_18_37 PM" src="https://github.com/user-attachments/assets/7275b527-6c8e-4e35-94ef-e24f5e211231" />

**Real-Time Messaging**
<img width="1920" height="1030" alt="New Tab - Google Chrome 8_14_2026 8_17_02 PM" src="https://github.com/user-attachments/assets/8cedd994-d146-4172-960e-b2f5b7117bcf" />

**ReelNest Responsive**
<img width="1280" height="1600" alt="WhatsApp Image 2026-08-14 at 8 59 04 PM" src="https://github.com/user-attachments/assets/4a10043f-5039-4e20-9a41-d74f178d1eec" />


---

## ⚡ Performance

ReelNest uses several techniques to keep the feed responsive as the amount of content grows:

- **Infinite scrolling** for incremental data loading.
- **React Virtuoso** for list virtualization.
- Paginated backend APIs.
- RTK Query caching and cache updates.
- Optimized media delivery through Cloudinary.
- Redis-based background processing and queues where required.

---

## 🔐 Authentication & Security

ReelNest supports multiple authentication and account-management flows:

- Local email/password authentication.
- Google OAuth authentication.
- Forgot password and password reset.
- Password update from account settings.
- Private account controls.
- Block / unblock functionality.
- Protected routes and access-controlled content.
- Secure logout.

---

## 💬 Real-Time Communication

ReelNest provides real-time communication using **Socket.IO**.

### Chat

- Real-time private messaging.
- Real-time user/chat events.
- Socket-based communication between connected users.

### Video Calling

ReelNest uses **WebRTC** for browser-to-browser video communication, while Socket.IO is used for the signaling layer required to establish the connection.

```text
User A
  │
  │ Signaling
  ▼
Socket.IO / Backend
  │
  │ Signaling
  ▼
User B

User A ◄──────── WebRTC ────────► User B
          🎥 Video + 🔊 Audio
```

---

## 🤖 AI-Powered Post Creation

ReelNest includes AI-assisted post creation capabilities, allowing users to generate content through an integrated AI service of HuggyFace API through Backend.

---

## ☁️ Media Management

Media uploaded to ReelNest is handled through **Cloudinary**, providing optimized cloud-based storage and delivery for profile images, posts, reels, and other supported media.

---

## ⚙️ Profile & Account Management

Users can manage their account through dedicated profile settings.

Available settings include:

- Username
- Full Name
- Bio
- Profile Image / Avatar
- Password
- Logout

---

## 🚀 Deployment

The ReelNest backend is deployed on **Railway**.

The frontend can be deployed independently as a modern Vite-based React application.

---

## 📦 Getting Started ( ReelNest Frontend Setup )

### 1. Clone the repository

```bash
git clone https://github.com/maaz20-op/ReelNest_Frontend

```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the ReelNest frontend project.

> **Important:**
> - For REST API requests, the backend URL must include `/api/v1`.
> - For Socket.IO connections, use the backend base URL without `/api/v1`.
> - Never commit your `.env` file to GitHub.
> - Never expose secret keys or credentials in the frontend source code.

#### Development Environment

```env
VITE_BACKEND_URL_DEVELOPMENT=http://localhost:3000/api/v1
VITE_BACKEND_DEVELOPMENT_SOCKET_SERVER=http://localhost:3000
```

#### Production Environment

```env
VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER=https://your-backend-url/api/v1
VITE_BACKEND_SOCKET_SERVER_RAILWAY=https://your-backend-url
```

#### TURN Server Configuration

The TURN server is required for WebRTC video calling when a direct peer-to-peer connection cannot be established.

```env
VITE_TURN_SERVER_USERNAME=YOUR_TURN_SERVER_USERNAME
VITE_TURN_SERVER_API_KEY=YOUR_TURN_SERVER_API_KEY
```

### Complete `.env` Example

```env
# ==========================================
# Development
# ==========================================

VITE_BACKEND_URL_DEVELOPMENT=http://localhost:3000/api/v1
VITE_BACKEND_DEVELOPMENT_SOCKET_SERVER=http://localhost:3000

# ==========================================
# Production
# ==========================================

VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER=https://your-backend-url/api/v1
VITE_BACKEND_SOCKET_SERVER_RAILWAY=https://your-backend-url

# ==========================================
# TURN Server - WebRTC Video Calling
# ==========================================

VITE_TURN_SERVER_USERNAME=YOUR_TURN_SERVER_USERNAME
VITE_TURN_SERVER_API_KEY=YOUR_TURN_SERVER_API_KEY
```

### API URL Configuration

For API requests, use:

```text
http://localhost:3000/api/v1
```

For example:

```text
http://localhost:3000/api/v1/auth/login
```

For production:

```text
https://your-backend-url/api/v1
```

### Socket.IO Server Configuration

For Socket.IO connections, do **not** add `/api/v1`.

Development:

```text
http://localhost:3000
```

Production:

```text
https://your-backend-url
```

> **Note:** `/api/v1` is only used for REST API endpoints. Socket.IO connects directly to the backend server base URL.
---

### 4. Start the development server

```bash
npm run dev
```

> The exact setup commands may differ between the frontend and backend repositories.

---

## 👨‍💻 Author

**Maaz Javed**

- GitHub: https://github.com/maaz20-op
- LinkedIn: https://www.linkedin.com/in/maaz-javed-4793b9363/
- Portfolio: https://my-portfolio-e.vercel.app/

---

## 📄 License

This project is developed for educational and portfolio purposes.
