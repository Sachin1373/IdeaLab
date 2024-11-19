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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postproject" element={<Post_Project />} />
        <Route path="/postidea" element={<Post_Idea />} />
        <Route path="/postedit" element={<Project_Edit />} />
        <Route path="/ideaedit" element={<Idea_Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
