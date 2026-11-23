# 🚀 LOVOKIT BACKEND & DASHBOARD HANDOVER DOCUMENTATION

> **Project:** Lovokit B2B E-Commerce & Laboratory Instruments Procurement Platform  
> **Handover Date:** November 2026  
> **Parent Company:** Lovosis Technology Private Limited  
> **Front-end Stack:** Next.js 14.2 (App Router), React 18, Tailwind CSS, Lucide Icons  

---

## 📋 Table of Contents
1. [Project Overview & Handover Goal](#1-project-overview--handover-goal)
2. [Folder Structure & Key File Map](#2-folder-structure--key-file-map)
3. [Admin Dashboard (`/admin`)](#3-admin-dashboard-admin)
4. [Ready-to-Use API Endpoints (`/api/...`)](#4-ready-to-use-api-endpoints-api)
5. [Database Schemas & Models](#5-database-schemas--models)
   - [A. PostgreSQL / MySQL (Prisma Schema)](#a-postgresql--mysql-prisma-schema)
   - [B. MongoDB (Mongoose Blueprints)](#b-mongodb-mongoose-blueprints)
6. [Environment Variables (`.env.example`)](#6-environment-variables-envexample)
7. [Step-by-Step Backend Integration Guide](#7-step-by-step-backend-integration-guide)
8. [Important Guidelines for the Incoming Developer](#8-important-guidelines-for-the-incoming-developer)

---

## 1. Project Overview & Handover Goal

The user-facing storefront of **Lovokit** is fully designed, styled, responsive, and operational with mock data. 

### Handover Objective:
Enable the incoming backend developer to immediately:
1. Connect a real database (MongoDB or PostgreSQL/MySQL).
2. Take full control of **adding, editing, and deleting products**.
3. Create and manage **Categories and Subcategories**.
4. Manage **Brand partners** (LOVOSIS, MATRIX, OWON, RIGOL, SIGLENT, etc.).
5. Process incoming **B2B Bulk Quotation RFPs** from clients.
6. Use the ready-made **Admin Dashboard (`/admin`)** to manage everything via an intuitive UI.

---

## 2. Folder Structure & Key File Map

```bash
Lovokit/
├── app/
│   ├── admin/                      # 🛠️ READY-MADE ADMIN DASHBOARD
│   │   ├── layout.jsx              # Admin sidebar, sticky top header, store link
│   │   ├── page.jsx                # Admin KPI Overview & recent instruments
│   │   ├── products/page.jsx       # Product Catalog Table + "Add Product" Modal
│   │   ├── categories/page.jsx     # Categories & Subcategories Manager
│   │   ├── brands/page.jsx         # Brand Partners Manager
│   │   └── quotes/page.jsx         # B2B Quotation RFPs Manager
│   ├── api/                        # ⚡ NEXT.JS API ROUTE HANDLERS
│   │   ├── products/route.js       # GET (filtered list) & POST (create product)
│   │   ├── products/[id]/route.js  # GET (single), PUT (update), DELETE (remove)
│   │   ├── categories/route.js     # GET & POST categories/subcategories
│   │   ├── brands/route.js         # GET & POST brands
│   │   └── quotes/route.js         # GET & POST B2B RFPs
│   ├── products/page.jsx           # Storefront Catalog with live filters
│   ├── products/[id]/page.jsx      # Storefront Product Detail with Specs & RFP
│   ├── hot-deals/page.jsx          # Flash Sales & Clearance Products (8 items)
│   ├── industrial-hub/page.jsx     # Industrial Labs, EV Bench, Sector Tabs
│   └── brands/page.jsx             # Brand Showcase & Filtering
├── components/
│   ├── Navbar.jsx                  # Main Storefront Nav, Live Search, Auth Modal
│   ├── Footer.jsx                  # Main Storefront Footer
│   ├── CartDrawer.jsx              # Flyout slide-over cart
│   └── ...
├── context/
│   └── ShopContext.jsx             # Cart, Wishlist, Toast, LocalStorage hydration
├── data/                           # 📦 CURRENT MOCK DATA (Migrate to DB)
│   ├── products.js                 # Initial productsData, categoriesData, brandsData
│   └── productDetails.js           # Deep specs & multi-angle gallery lookup
├── lib/
│   └── models/                     # 🗄️ MONGOOSE / MONGODB BLUEPRINTS
│       ├── Product.js
│       ├── Category.js
│       ├── Brand.js
│       └── Quote.js
├── prisma/
│   └── schema.prisma               # 🐘 POSTGRESQL / MYSQL PRISMA SCHEMA
└── .env.example                    # 🔑 Environment Variables Template
```

---

## 3. Admin Dashboard (`/admin`)

The Admin Panel is fully built and ready to test by navigating to **`http://localhost:3000/admin`**.

| Route | Purpose | Key Features |
|---|---|---|
| `/admin` | Overview & Metrics | Total products, In-stock items, Categories count, Pending RFPs, Shortcuts. |
| `/admin/products` | Catalog Management | Search, category filter, brand filter, stock badge, **Add New Product Modal Form**, Edit modal, and Delete actions. |
| `/admin/categories` | Categories & Subcategories | View all categories, add new categories, add subcategories to existing categories, delete. |
| `/admin/brands` | Brand Partners | View OEM brands, product count, add new brand modal, delete brand. |
| `/admin/quotes` | B2B Quotes / RFPs | Manage quotation requests submitted by enterprise clients with status dropdown (`PENDING`, `IN_REVIEW`, `QUOTED`, `CLOSED`). |

---

## 4. Ready-to-Use API Endpoints (`/api/...`)

All endpoints are built using Next.js 14 App Router Route Handlers (`app/api/.../route.js`):

### 1. Products API
- **`GET /api/products`**
  - **Query Params:**
    - `?category=oscilloscopes` (Filter by category slug)
    - `?brand=OWON` (Filter by brand)
    - `?search=300mhz` (Search by model, title, or description)
    - `?featured=true` (Filter homepage featured items)
    - `?page=1&limit=20` (Pagination support)
  - **Response:** `{ success: true, total: 25, products: [...] }`

- **`POST /api/products`**
  - **Body Payload (JSON):**
    ```json
    {
      "model": "XDS3302",
      "title": "14-bit High-Resolution Digital Storage Oscilloscope",
      "brand": "OWON",
      "category": "oscilloscopes",
      "categoryName": "Oscilloscopes",
      "subcategory": "Benchtop Scopes",
      "price": "145000",
      "originalPrice": "175000",
      "stockQuantity": 15,
      "inStock": true,
      "featured": true,
      "image": "/images/featured/owon-exact-transparent.png",
      "description": "Precision laboratory oscilloscope...",
      "specs": [
        { "label": "Bandwidth", "value": "300 MHz" },
        { "label": "Channels", "value": "2 Channels" }
      ]
    }
    ```

- **`GET /api/products/[id]`**
  - Returns single product details including deep technical specifications.

- **`PUT /api/products/[id]`**
  - Updates existing product fields.

- **`DELETE /api/products/[id]`**
  - Deletes product from catalog.

### 2. Categories API
- **`GET /api/categories`** - Returns all categories with subcategories and item counts.
- **`POST /api/categories`** - Creates new category or subcategory.

### 3. Brands API
- **`GET /api/brands`** - Returns all registered OEM brand names.
- **`POST /api/brands`** - Adds a new brand.

### 4. B2B Quotes API
- **`GET /api/quotes`** - Returns all submitted RFPs for the admin dashboard.
- **`POST /api/quotes`** - Submits a new quotation request from clients.

---

## 5. Database Schemas & Models

Both major database paradigms are pre-configured:

### A. PostgreSQL / MySQL (Prisma Schema)
Location: `prisma/schema.prisma`
Contains fully typed models:
- `Brand`
- `Category`
- `Subcategory`
- `Product`
- `QuoteRequest`
- `User`

To initialize with Prisma:
```bash
npx prisma generate
npx prisma db push
```

### B. MongoDB (Mongoose Blueprints)
Location: `lib/models/`
- `lib/models/Product.js`
- `lib/models/Category.js`
- `lib/models/Brand.js`
- `lib/models/Quote.js`

---

## 6. Environment Variables (`.env.example`)

Copy `.env.example` to `.env.local` to configure your database and authentication keys:

```bash
cp .env.example .env.local
```

Key variables:
- `MONGODB_URI` or `DATABASE_URL`
- `JWT_SECRET` / `NEXTAUTH_SECRET`
- `CLOUDINARY_...` or AWS S3 credentials for image uploads.

---

## 7. Step-by-Step Backend Integration Guide

### Step 1: Database Setup
1. Open `.env.local` and paste your MongoDB URI or PostgreSQL connection string.
2. If using Prisma, run `npx prisma db push` to generate the database schema automatically.
3. If using MongoDB, create a `lib/db.js` helper using `mongoose.connect(process.env.MONGODB_URI)`.

### Step 2: Seed Initial Data
Write a quick seed script (e.g., `scripts/seed.js`) importing `productsData` and `categoriesData` from `data/products.js` to insert into your database.

### Step 3: Replace In-Memory Handlers in `app/api/`
In `app/api/products/route.js`, replace:
```js
// Currently:
let dynamicProducts = [...productsData];
```
With your real database query:
```js
// Prisma:
const products = await prisma.product.findMany({ ... });

// Mongoose:
const products = await Product.find({ ... });
```

### Step 4: Add Media Uploads
Integrate Cloudinary, AWS S3, or local storage inside `app/api/upload/route.js` so admins can upload instrument photos directly from the dashboard instead of pasting image paths.

### Step 5: Secure the `/admin` Route
Add authentication middleware (`middleware.js` or NextAuth) to restrict access to `/admin/*` only to users with the `ADMIN` role.

---

## 8. Important Guidelines for the Incoming Developer

1. **Brand Identity:** The brand colors are **Electric Yellow (`#FFC400`)** and **Dark Charcoal/Obsidian (`#0B0E14`)**.
2. **Strict Project Rule:** **DO NOT RUN `git push`** without explicit user confirmation.
3. **No Breaking Changes to Client Views:** `app/products/page.jsx` and `app/products/[id]/page.jsx` rely on product properties (`id`, `model`, `brand`, `category`, `title`, `price`, `specs`, `image`). Keep these property names consistent in the database schema.

---

**Handover Ready! All UI components, API handlers, admin controllers, and database blueprints are in place.**
