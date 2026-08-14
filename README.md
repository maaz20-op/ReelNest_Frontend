# 🎬 ReelNest

**ReelNest is a full-stack social media platform built for sharing posts and reels, connecting with users, real-time communication, and interactive content sharing.**

It combines a modern **React-based frontend** with a scalable **Node.js and Express.js backend**, providing features such as **real-time chat, WebRTC video calling, private accounts, user blocking, authentication, AI-powered post creation, comments, likes, followers/following, premium subscriptions, and personalized profile management**.

The platform is designed with a strong focus on **real-time interactions, secure authentication, scalable backend architecture, media handling, and optimized feed performance** through infinite scrolling and list virtualization.

---

## 🎥 ReelNest Demo

Watch ReelNest in action:

## 🎬 ReelNest Demo




https://github.com/user-attachments/assets/1f3a4020-ddcc-4ebf-80fb-0b43fa030a8e






## 🌐 Live Demo

**ReelNest:** https://reel-nest-frontend.vercel.app/

---

## Github Repositries

**Frontend**
https://github.com/maaz20-op/ReelNest_Frontend

**Backend**
https://github.com/maaz20-op/ReelNest_Backend

---

## ✨ Features

- 🔐 Local Authentication
- 🔵 Google OAuth Login
- 🔑 Forgot / Reset Password
- 🔒 Private Account System
- 🚫 Block / Unblock Users
- 💬 Real-Time Chat with Socket.IO
- 🎥 WebRTC Video Calling
- ❤️ Like System
- 👥 Followers / Following
- 🎬 Posts & Reels
- 💭 Comments System
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

### 3. Configure environment variables

**_Important_**
Must add /api/v1 with base URL eg http://localhost:3000 --> http://localhost:3000/api/v1 for APi Caling, **_but for Websockets write Base_URL http://localhost:3000_**

Create a `.env` file and add the required credentials for:

**For Development**
VITE_BACKEND_URL_DEVELOPMENT=YOUR_URL/api/v1
VITE_BACKEND_DEVELOPMENT_SOCKET_SERVER=YOUR_SERVER_BASE_URL eg http://localhost:3000

**For Production**
VITE_BACKEND_SOCKET_SERVER_RAILWAY=YOUR_SERVER_BASE_URL eg https://railway.example.com
VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER=YOUR_URL/api/v1

**TURN SERVER For Video Call Feature**
VITE_TURN_SERVER_USERNAME=YOUR_TURN_SERVER_USERNAME
VITE_TURN_SERVER_API_KEY=YOUR_TURN_SERVER_API_KEY

### 4. Start the development server

```bash
npm run dev
```

> The exact setup commands may differ between the frontend and backend repositories.

---

## 📸 Screenshots

Screenshots and application previews can be added here.

---

## 👨‍💻 Author

**Maaz Javed**

- GitHub: https://github.com/maaz20-op
- LinkedIn: https://www.linkedin.com/in/maaz-javed-4793b9363/
- Portfolio: https://my-portfolio-e.vercel.app/

---

## 📄 License

This project is developed for educational and portfolio purposes.
