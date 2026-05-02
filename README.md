#  E-Commerce Web App

A full-stack e-commerce product listing application built using the MERN stack (MongoDB, Express, React, Node.js).
URL: https://shopeasy-frontend-sgng.onrender.com/

---

##  Features

* User Authentication (JWT-based)
* Product Listing & Search
* Product Detail Page
* Cart Functionality
* Admin Product Management (Add/Edit/Delete)
* Responsive UI using Bootstrap

---

##  Tech Stack

* **Frontend:** React (Vite) + Bootstrap
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas
* **Authentication:** JWT + bcrypt

---

##  How the App Works

###  1. Authentication

* Users can **register** and **login**
* JWT token is stored in `localStorage`
* Protected routes require authentication
* Admin users have extra privileges and to register as an admin you need ADMIN_SECRET=admin_register_secret

---

###  2. Product Listing

* Home page shows all products
* Each product displays:

  * Name
  * Image
  * Price
  * Category
* Users can search or filter products

---

###  3. Product Details

* Clicking a product opens a detailed page
* Shows full description and product info
* Users can add the product to cart

---

###  4. Cart Functionality

* Users can:

  * Add items to cart
  * Increase/decrease quantity
  * Remove items
* Total price is calculated dynamically
* If a product is deleted by admin, it is automatically removed from all carts

---

###  5. Admin Features

To use admin features:

1. Register as an admin by using ADMIN_SECRET=admin_register_secret

2. Admin can:

   *  Add new products
   *  Edit existing products
   *  Delete products

3. When a product is deleted:

   * It is removed from database
   * It is also removed from all user carts

---

## 📡 API Overview

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products` (admin)
* `PUT /api/products/:id` (admin)
* `DELETE /api/products/:id` (admin)

### Cart

* `GET /api/cart`
* `POST /api/cart/add`
* `DELETE /api/cart/remove`

---

## 📌 Author

Shravan Jain
