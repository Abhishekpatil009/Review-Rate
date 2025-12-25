# Review & Rating Web App

A full-stack **Review & Rating application** where users can view companies, read reviews, add new reviews, and like reviews. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

* View company details with average rating
* List all reviews for a company
* Add a new review with rating & comment
* Like / Unlike reviews
* Form validation
* Responsive UI

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* dotenv

---

## 📂 Project Structure

```
reviewandrateweb/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Navigate to Backend

```bash
cd Backend
```

### 2️⃣ Create `.env` File

Create a `.env` file inside the **Backend** folder and add:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

#### Example

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/reviewapp
JWT_SECRET=mySecretJWTKey
PORT=5000
```

⚠️ **Do not commit `.env` to GitHub**. Add it to `.gitignore`.

---

### 3️⃣ Install Backend Dependencies

```bash
npm install
```

### 4️⃣ Run Backend Server

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### 1️⃣ Navigate to Frontend

```bash
cd Frontend
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

### 3️⃣ Run Frontend Server

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints (Sample)

### Companies

* `GET /api/companies/:id` – Get company details

### Reviews

* `GET /api/reviews/company/:id` – Get reviews for a company
* `POST /api/reviews` – Add a review
* `POST /api/reviews/:id/like` – Like / Unlike a review

---

## ✅ Environment Checklist

* [x] MongoDB Atlas URL added
* [x] JWT Secret added
* [x] Backend `npm install`
* [x] Frontend `npm install`
* [x] Both servers running

---

## 🧪 Common Issues

* **MongoDB connection error** → Check `MONGODB_URL`
* **CORS error** → Ensure backend allows frontend origin
* **Hooks error** → Never use hooks inside loops or conditions

---

## 📌 Future Improvements

* User authentication
* Prevent multiple likes per user
* Admin dashboard
* Edit / Delete reviews
* Deployment (Vercel + Render)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the **MIT License**.

---

### ⭐ If you like this project, give it a star on GitHub!
