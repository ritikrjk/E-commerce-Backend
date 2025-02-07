# E-Commerce Backend API

This repository contains the backend for a comprehensive e-commerce platform built using **Node.js**, **Express**, and **MongoDB**. The API supports both administrator and user functionalities, including secure authentication, product management, shopping cart operations, payment processing, and product reviews.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication & Authorization**

  - **User & Admin Authentication:** Secure registration and login for both regular users and administrators.
  - **Role-Based Access Control:** Ensures that only admins can perform certain actions like adding or modifying products.

- **Product Management**

  - **Admin CRUD Operations:** Administrators can add, update, and delete products.
  - **Categorization:** Products are organized based on type, making it easier for users to browse and search.
  - **Search Functionality:** Both users and admins can search for products using various criteria.

- **User Interactions**
  - **Shopping Cart:** Users can add products to their cart for a seamless shopping experience.
  - **Secure Payment Processing:** Enables users to safely complete transactions.
  - **Product Ratings:** Users can rate products and share their feedback.

## Technologies

- **Node.js:** JavaScript runtime built on Chrome's V8 engine.
- **Express:** Minimal and flexible Node.js web application framework.
- **MongoDB:** NoSQL database used for storing product data, user information, and orders.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) and npm installed on your machine.
- A running instance of [MongoDB](https://www.mongodb.com/) (local or hosted via MongoDB Atlas).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend
   ```
