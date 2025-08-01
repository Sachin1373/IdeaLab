# IdeaLab

**Innovate, Collaborate, and Showcase**  
Welcome to **IdeaLab**, a platform where creativity meets collaboration. Share your ideas, showcase projects, and engage with like-minded individuals to build the future.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Authentication](#authentication)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **Post and Share Projects**: Users can upload projects with details to showcase their work.
- **Share Innovative Ideas**: A dedicated section for brainstorming and sharing ideas.
- **Tech Blogs**: Get inspired by reading technical blogs and project ideas.
- **Dual Authentication**: Secure login/signup system with both email/password and Google OAuth.
- **Dynamic Content**: Explore projects, ideas, and blogs fetched from APIs.
- **Responsive Design**: Fully responsive UI for seamless experience across devices.

---

## Technologies Used

### Frontend:
- **React JS**: Component-based architecture for dynamic UI.
- **CSS Modules**: Scoped styling for clean and maintainable styles.
- **React Toastify**: For user notifications.
- **@react-oauth/google**: Google OAuth integration.
- **jwt-decode**: JWT token decoding.

### Backend:
- **Node.js & Express.js**: Backend server for APIs.
- **MongoDB**: Database for storing users, projects, and ideas.
- **JWT (JSON Web Token)**: Secure token-based authentication.
- **google-auth-library**: Google OAuth verification.

### APIs:
- **Custom Backend APIs**: For managing projects and ideas.
- **Dev.to API**: For fetching blogs with the "projects" tag.
- **Google OAuth API**: For secure authentication.

---

## Setup and Installation

### Prerequisites:
- **Node.js** and **npm** installed
- **MongoDB** instance running locally or hosted
- **Google Cloud Console** account for OAuth setup

### Environment Variables:

#### Backend (.env):
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/idealab
JWT_SECRET_KEY=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

#### Frontend (.env):
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_BACKEND_URL=http://localhost:5000
```

### Installation Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/idealab.git
   cd idealab
   ```

2. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

4. Set up Google OAuth (see [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md))

5. Start the backend server:
   ```bash
   cd ../Backend
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd ../Frontend
   npm run dev
   ```

---

## Authentication

IdeaLab supports two authentication methods:

### 1. Email/Password Authentication
- Traditional signup/login with email and password
- Secure password hashing with bcrypt
- JWT token-based session management

### 2. Google OAuth Authentication
- One-click login with Google account
- Automatic user creation for new Google users
- Seamless integration with existing email/password users

### Features:
- **Dual Login Options**: Users can choose between email/password or Google OAuth
- **Account Linking**: Google accounts are linked to existing email accounts
- **Secure Token Management**: JWT tokens with 12-hour expiration
- **User Profile Management**: Consistent user experience across authentication methods

For detailed Google OAuth setup instructions, see [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md).

---

## Usage

1. **Sign Up/Login**: Choose between email/password or Google OAuth
2. **Explore Projects**: Browse and search through user-submitted projects
3. **Share Ideas**: Post innovative ideas and get feedback from the community
4. **Read Blogs**: Discover tech blogs and project inspiration
5. **Create Content**: Share your own projects and ideas with the community

---

## API Endpoints

### Authentication:
- `POST /api/v1/auth/signup` - Email/password registration
- `POST /api/v1/auth/login` - Email/password login
- `POST /api/v1/auth/google-login` - Google OAuth login

### Projects:
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project (protected)
- `PUT /api/v1/projects/:id` - Update project (protected)
- `DELETE /api/v1/projects/:id` - Delete project (protected)

### Ideas:
- `GET /api/v1/ideas` - Get all ideas
- `POST /api/v1/ideas` - Create new idea (protected)
- `PUT /api/v1/ideas/:id` - Update idea (protected)
- `DELETE /api/v1/ideas/:id` - Delete idea (protected)

---

## Screenshots

[Add screenshots here]

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
