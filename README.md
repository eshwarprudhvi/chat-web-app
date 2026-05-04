# 💬 Real-Time  Chat Application

A high-performance, real-time messaging platform built with **Next.js 16**, **React 19**, and **Pusher**. This project features a modern, responsive UI and a full-stack architecture designed for seamless communication.

### 🔗 [Live Demo](https://prudhvi-chat-app.netlify.app/)

---

## 🚀 Features

-   **Real-Time Messaging**: Instant message delivery and updates using Pusher.
-   **Full Authentication**: Secure login via Google, GitHub, and Credentials (Email/Password).
-   **Rich Messaging**: Support for text and image messages (powered by Cloudinary).
-   **Conversation Management**: Create individual direct chats and dynamic group conversations.
-   **Interactive UI**: "Seen" status indicators, real-time active user status, and typing indicators.
-   **Modern Design**: Sleek, mobile-first interface built with Tailwind CSS and Framer Motion.
-   **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile.

---

## 🛠 Tech Stack

-   **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, Headless UI
-   **Backend**: Next.js API Routes, NextAuth.js
-   **Database**: PostgreSQL with Prisma ORM
-   **Real-time**: Pusher Channels
-   **Storage**: Cloudinary (Image management)
-   **Deployment**: Netlify

---

## 📦 Getting Started

### Prerequisites

-   Node.js 20+
-   PostgreSQL database
-   Pusher, Cloudinary, and Google OAuth credentials

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/eshwarprudhvi/chat-web-app.git
    cd chat-web-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="your_postgresql_url"
    NEXTAUTH_SECRET="your_nextauth_secret"
    
    GOOGLE_CLIENT_ID="your_google_id"
    GOOGLE_CLIENT_SECRET="your_google_secret"
    
    GITHUB_ID="your_github_id"
    GITHUB_SECRET="your_github_secret"
    
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
    CLOUDINARY_API_KEY="your_api_key"
    CLOUDINARY_API_SECRET="your_api_secret"
    
    NEXT_PUBLIC_PUSHER_APP_KEY="your_pusher_key"
    PUSHER_APP_ID="your_app_id"
    PUSHER_SECRET="your_secret"
    ```

4.  **Initialize the database**:
    ```bash
    npx prisma db push
    ```

5.  **Run the application**:
    ```bash
    npm run dev
    ```

---

## 🛡️ Security Features

-   **Password Hashing**: Securely handled via `bcryptjs`.
-   **Account Linking**: Safe OAuth account merging for a smoother user experience.
-   **Server-side Validation**: Robust data validation for all API endpoints.

---

## 👤 Author

**Prudhvishwar**
-   GitHub: [@eshwarprudhvi](https://github.com/eshwarprudhvi)
-   Live App: [Prudhvi Chat App](https://prudhvi-chat-app.netlify.app/)

---

*This project was built for portfolio purposes to demonstrate proficiency in full-stack Next.js development, real-time architecture, and modern web aesthetics.*
