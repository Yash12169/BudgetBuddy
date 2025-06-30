# 💸 BudgetBuddy

**BudgetBuddy** is your personal budgeting assistant and financial goal-setting tool, designed to help users manage expenses, track financial goals, and stay on top of their money — all in one place.

> Built with **Next.js**, **Supabase**, **Prisma**, **Clerk**, and hosted on **Vercel**.

---

## 🚀 Features

- ✅ Simple and clean budgeting dashboard  
- 🎯 Set and manage financial goals  
- 🔐 User authentication with Clerk  
- 🌐 Hosted with Vercel  
- 🛢️ Supabase as the database (PostgreSQL)  
- 🧠 Prisma for database access and schema management  

---

## 🧩 Tech Stack

| Tech         | Role                          |
|--------------|-------------------------------|
| **Next.js**  | Full-stack React framework     |
| **Prisma**   | ORM (Object Relational Mapper) |
| **Supabase** | Database hosting (Postgres)    |
| **Clerk**    | Authentication + user profiles |
| **Vercel**   | Frontend + backend deployment  |

---

## 📦 Getting Started

### 1. 🧾 Clone the repository

```bash
git clone https://github.com/your-username/budgetbuddy.git
cd budgetbuddy
```

### 2. 📥 Install dependencies

```bash
npm install
```

### 3. ⚙️ Set up environment variables

Create a `.env` file in the root of the project and paste the following:

```env
# Clerk settings
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/user/dashboard"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/user/dashboard"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET=YOUR_CLERK_WEBHOOK_SECRET

# Database (Supabase)
DATABASE_URL=YOUR_DATBASE_CONNECTION_STRING
DIRECT_URL=YOUR_DATABASE_DIRECT_URL
```


### 4. 🛠️ Push the Prisma schema (if needed)

If you're starting fresh or updating schema:

```bash
npx prisma db push
```

To open Prisma Studio (visual DB editor):

```bash
npx prisma studio
```

### 5. 🏃 Start the dev server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing production build (optional)

```bash
npm run build
npm start
```

---

## 🌍 Deployment

The project is already set up for Vercel deployment. Just connect your GitHub repo to Vercel, add the same environment variables in the Vercel dashboard, and deploy.

---

