# Google OAuth Setup Guide for IdeaLab

This guide will help you set up Google OAuth authentication for both frontend and backend of the IdeaLab project.

## Prerequisites

1. A Google Cloud Console account
2. Node.js and npm installed
3. MongoDB instance running

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### 1.2 Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "IdeaLab"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email addresses)

### 1.3 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:5174` (if port 5173 is in use)
   - `https://idea-lab-chi.vercel.app` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:5174`
   - `https://idea-lab-chi.vercel.app`
6. Copy the **Client ID** and **Client Secret**

## Step 2: Environment Configuration

### 2.1 Backend Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/idealab

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here_make_it_long_and_secure

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# CORS Configuration
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://idea-lab-chi.vercel.app
```

### 2.2 Frontend Environment Variables

Create a `.env` file in the `Frontend` directory with the following variables:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

## Step 3: Implementation Details

### 3.1 Backend Implementation

The backend already has the Google OAuth implementation in `Backend/src/Routes/AuthRoute.js`:

- **Endpoint**: `POST /api/v1/auth/google-login`
- **Functionality**: 
  - Verifies Google ID token
  - Creates or finds user in database
  - Returns JWT token for authentication

### 3.2 Frontend Implementation

The frontend has been updated with Google OAuth in:

- **Login Component**: `Frontend/src/pages/Login.jsx`
- **SignUp Component**: `Frontend/src/pages/SignUp.jsx`
- **Main App**: `Frontend/src/main.jsx` (GoogleOAuthProvider wrapper)

### 3.3 User Schema

The user schema in `Backend/src/Models/UserSchema.js` includes:
- `googleId`: For storing Google user ID
- `name`, `username`, `email`, `password`: Standard user fields

## Step 4: Testing the Implementation

### 4.1 Start the Backend

```bash
cd Backend
npm install
npm run dev
```

### 4.2 Start the Frontend

```bash
cd Frontend
npm install
npm run dev
```

### 4.3 Test Google Login

1. Navigate to `http://localhost:5173/login`
2. Click the "Continue with Google" button
3. Complete the Google OAuth flow
4. Verify successful login and redirection

## Step 5: Security Considerations

### 5.1 Environment Variables

- Never commit `.env` files to version control
- Use strong, unique JWT secret keys
- Keep Google client secrets secure

### 5.2 CORS Configuration

The backend is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: `https://idea-lab-chi.vercel.app`

### 5.3 Token Validation

- Google ID tokens are verified on the backend
- JWT tokens are used for subsequent API calls
- Tokens expire after 12 hours

## Step 6: Troubleshooting

### Common Issues

1. **"Invalid Google token" error**:
   - Check if Google Client ID matches in both frontend and backend
   - Verify authorized origins in Google Cloud Console

2. **CORS errors**:
   - Ensure frontend URL is in the backend CORS configuration
   - Check if the correct port is being used

3. **"User already exists" error**:
   - This is normal for existing users
   - The system will log them in instead of creating a new account

### Debug Steps

1. Check browser console for frontend errors
2. Check backend console for server errors
3. Verify environment variables are loaded correctly
4. Test with different Google accounts

## Step 7: Production Deployment

### 7.1 Update Environment Variables

For production, update the environment variables with:
- Production Google Client ID
- Production MongoDB URL
- Production frontend URL

### 7.2 Update CORS Configuration

Ensure the production frontend URL is included in the backend CORS configuration.

### 7.3 SSL/HTTPS

Google OAuth requires HTTPS in production. Ensure your deployment uses SSL certificates.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure Google Cloud Console configuration matches your setup
4. Test with a fresh Google account

---

**Note**: This implementation supports both email/password and Google OAuth authentication methods. Users can choose either method to sign up or log in. 