import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TodoListPage from './pages/TodoListPage';
import WelcomePage from './pages/WelcomePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <TodoListPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
