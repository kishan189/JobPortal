# Job Portal

## **Introduction**

In today’s competitive job market, finding the right opportunity and managing applications efficiently can be challenging for both job seekers and recruiters. **Job Portal** is a full-stack web application designed to simplify the hiring process by providing a modern and responsive platform for job searching, application tracking, and profile management.

The platform allows users to:

* Search and explore job opportunities.
* Apply for jobs and track application status.
* Save jobs for future applications.
* Manage personal profiles and resumes.
* Filter jobs based on location and industry.

Built using modern technologies like React, Redux Toolkit, Tailwind CSS, Node.js, Express.js, and MongoDB, the application delivers a seamless and user-friendly experience.

---

## **Project Type**

**Full Stack Web Application**

---

## **Project Snapshots**

### **Home Page**

<img width="1875" height="860" alt="Screenshot 2026-05-21 133130" src="https://github.com/user-attachments/assets/8f6cc66a-5321-4f77-bb3c-be6f5f8b317d" />

### **Browse Jobs & Filters**
<img width="1897" height="863" alt="Screenshot 2026-05-21 133237" src="https://github.com/user-attachments/assets/3b6d2cf5-8a3b-4c8b-b29e-bee223a4594f" />


### **Profile & Applied Jobs**
<img width="1865" height="853" alt="Screenshot 2026-05-21 133321" src="https://github.com/user-attachments/assets/ff1a1aa8-b097-4ed4-b990-cf6fe267f8e8" />

<img width="1869" height="852" alt="Screenshot 2026-05-21 133357" src="https://github.com/user-attachments/assets/87cb0645-f958-4e13-9f43-53febff263f2" />

---

## **Directory Structure**

```bash
Job-Portal/
├─ backend/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  ├─ index.js
│  ├─ package.json
│
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  ├─ pages/
│  │  ├─ redux/
│  │  ├─ services/
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ index.css
│  │
│  ├─ package.json
│  ├─ vite.config.js
│
├─ README.md
```

---

## **Features**

### **Core Features**

### **1. User Authentication**

* Secure authentication using JWT and cookies.
* User login and registration functionality.
* Protected routes for authenticated users.

### **2. Job Search & Browse**

* Search jobs using keywords.
* Browse available job listings.
* Responsive job cards with detailed information.

### **3. Advanced Filtering**

* Filter jobs by:

  * Location
  * Industry
  * Remote opportunities
  * Job category

### **4. Apply for Jobs**

* Apply directly to job postings.
* Track applied jobs and application status.
* Save jobs for future applications.

### **5. User Profile Management**

* Update profile information.
* Upload and manage resumes.
* Add skills and professional details.

### **6. Responsive Modern UI**

* Fully responsive design using Tailwind CSS.
* Clean and modern user interface.
* Optimized user experience across devices.

---

## **Advanced Features**

### **7. State Management**

* Centralized state management using Redux Toolkit.
* Efficient handling of authentication and job data.

### **8. RESTful APIs**

* Built scalable REST APIs using Express.js.
* Modular backend architecture.

### **9. Resume & Image Upload**

* File upload support using Multer and Cloudinary.
* Secure media handling for resumes and profile images.

### **10. Secure Backend**

* Password hashing using bcryptjs.
* JWT-based authorization system.
* Environment variable management using dotenv.

---

## **Design Decisions and Assumptions**

* **MongoDB** is used for scalable and flexible database management.
* **Redux Toolkit** simplifies global state management.
* **Tailwind CSS** ensures rapid and responsive UI development.
* **JWT Authentication** provides secure user sessions.
* **Cloudinary** is used for efficient media storage and optimization.
* **REST Architecture** ensures maintainable backend services.

---

## **Installation & Getting Started**

### **Clone Repository**

```bash
git clone <your-github-repository-link>
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

### **Backend Setup**

```bash
cd backend
npm install
npm run dev
```

---

## **Environment Variables**

Create a `.env` file inside the backend folder and add:

```env
PORT=8000
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## **Usage**

### **User Features**

1. Register/Login to the platform.
2. Browse and search available jobs.
3. Apply to jobs directly.
4. Save jobs for later.
5. Manage profile and upload resumes.
6. Track application history.

### **Admin Features**

1. Manage job postings.
2. View applications.
3. Manage users and recruiters.
4. Update company information.

---

## **Technology Stack**

### **Frontend**

* **React.js**
* **Redux Toolkit**
* **React Router DOM**
* **Tailwind CSS**
* **Axios**
* **Radix UI**
* **Lucide React**
* **React Icons**
* **Vite**

### **Backend**

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcryptjs**
* **Multer**
* **Cloudinary**
* **Cookie Parser**
* **CORS**

### **Tools**

* **VS Code**
* **Git & GitHub**
* **Postman**
* **Nodemon**

---

## **Deployment**

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway
* **Database:** MongoDB Atlas

---

## **Future Enhancements**

* Real-time chat between recruiters and candidates.
* AI-based job recommendations.
* Email notifications for applications.
* Interview scheduling system.
* Admin analytics dashboard.

---

## **Conclusion**

This Job Portal project demonstrates the implementation of a modern full-stack web application with authentication, REST APIs, state management, responsive UI design, and scalable backend architecture. It focuses on delivering a smooth and efficient job-hunting experience for users while maintaining clean and maintainable code architecture.

**Feel free to explore, contribute, and provide feedback! 🚀**
