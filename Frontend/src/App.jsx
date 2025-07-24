import React from 'react';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx'
import Ideas from './pages/Ideas.jsx';
import Blog from './pages/Blog.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Post_Project from './Components/Post_Project.jsx';
import Profile from './pages/Profile.jsx';
import Project_Edit from './Components/Project_Edit.jsx';
import Idea_Edit from './Components/Idea_Edit.jsx';
import Post_Idea from './Components/Post_Idea.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/postproject" element={<PrivateRoute><Post_Project /></PrivateRoute>} />
        <Route path="/postidea" element={<PrivateRoute><Post_Idea /></PrivateRoute>} />
        <Route path="/postedit" element={<PrivateRoute><Project_Edit /></PrivateRoute>} />
        <Route path="/ideaedit" element={<PrivateRoute><Idea_Edit /></PrivateRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;