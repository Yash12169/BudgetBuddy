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
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW5jbHVkZWQtbGFicmFkb3ItMS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_lApOplVJgbrFRR74lESWTeR4R7ixDvO7lal0D8MmCi
CLERK_WEBHOOK_SECRET=whsec_/qvF00v9XW91ugersHFsNbvbDSe8IENb

# Database (Supabase)
DATABASE_URL="postgresql://postgres.anribuwynoygtiemzicj:qwertyasdfgzxcvbpoiulhk@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=30&pool_timeout=30"
DIRECT_URL="postgresql://postgres.anribuwynoygtiemzicj:qwertyasdfgzxcvbpoiulhk@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?connect_timeout=30"
```

🛑 **Important**: Never commit `.env` files to public repositories.

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

## 🙋 FAQ

**Why is Prisma used if we have Supabase?**  
Supabase hosts the database (PostgreSQL), while Prisma gives us a powerful, type-safe way to interact with the database in our code.

**Why two database URLs?**  
- `DATABASE_URL` uses connection pooling (for app runtime).
- `DIRECT_URL` connects directly to the DB (for migrations or prisma studio).

---

## 🧑‍💻 Author

Made with 💙 by [Your Name]

---

## 📄 License

MIT License – feel free to fork and build on this.
