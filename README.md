# IdeaLab

**Innovate, Collaborate, and Showcase**  
Welcome to **IdeaLab**, a platform where creativity meets collaboration. Share your ideas, showcase projects, and engage with like-minded individuals to build the future.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **Post and Share Projects**: Users can upload projects with details to showcase their work.
- **Share Innovative Ideas**: A dedicated section for brainstorming and sharing ideas.
- **Tech Blogs**: Get inspired by reading technical blogs and project ideas.
- **Authentication**: Secure login/signup system with JWT-based authentication.
- **Dynamic Content**: Explore projects, ideas, and blogs fetched from APIs.
- **Responsive Design**: Fully responsive UI for seamless experience across devices.

---

## Technologies Used

### Frontend:
- **React JS**: Component-based architecture for dynamic UI.
- **CSS Modules**: Scoped styling for clean and maintainable styles.
- **React Toastify**: For user notifications.

### Backend:
- **Node.js & Express.js**: Backend server for APIs.
- **MongoDB**: Database for storing users, projects, and ideas.
- **JWT (JSON Web Token)**: Secure token-based authentication.

### APIs:
- **Custom Backend APIs**: For managing projects and ideas.
- **Dev.to API**: For fetching blogs with the "projects" tag.

---

## Setup and Installation

### Prerequisites:
- **Node.js** and **npm** installed
- **MongoDB** instance running locally or hosted
- Environment variables (`.env`) file configured with:
  - `MONGO_URI`: MongoDB connection string
  - `JWT_SECRET_KEY`: Secret key for JWT
  - `PORT`: Port for the backend server

### Installation Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/idealab.git
   cd idealab
