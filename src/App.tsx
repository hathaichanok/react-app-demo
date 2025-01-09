// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material';
import UsersPage from './pages/users/UserPage';
import PostsPage from './pages/posts/PostPage';
import './App.css';
import { AppProvider, DashboardLayout } from '@toolpad/core';
import { PeopleAlt, Description} from '@mui/icons-material';
import UserForm from './components/UserForm';
import UserDetailPage from './pages/users/UserDetailPage';
import UserPostPage from './pages/users/UserPostPage';
import PostDetailPage from './pages/posts/PostDetailPage';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
});

const App: React.FC = () => {
  return (
      <Router>
        <AppProvider
          navigation={[
            {
              segment: 'app/users',
              title: 'User',
              icon: <PeopleAlt />,
            },
            {
              segment: 'app/posts',
              title: 'Post',
              icon: <Description />,
            },
          ]}
          branding={{
            logo: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqBj0XRBTKgRj0Js9Z_e22k73C3tj_PdUD6soij6hQW7kJBDt_Go66yFiZdm1HYKxeYM&usqp=CAU" alt="BKK logo" />,
            title: 'Bangkok Bank',
            homeUrl: '/app/users',
          }}
          theme={demoTheme}
        >
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/app/users" element={<UsersPage />} />
              <Route path="/app/users/:id" element={<UserDetailPage />} />
              <Route path="/app/users/:id/posts" element={<UserPostPage />} />
              <Route path="/app/users/create" element={<UserForm />} />
              <Route path="/app/posts" element={<PostsPage />} />
              <Route path="/app/posts/:id" element={<PostDetailPage />} />
            </Routes>
          </DashboardLayout>
        </AppProvider>
      </Router>
  );
};

export default App;
