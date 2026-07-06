import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProjectHeader from './components/ProjectHeader';
import BoardToolbar from './components/BoardToolbar';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TeamPage from './pages/TeamPage';

import { getUserFromStorage } from './api/authApi';

/* ── Board view ── */
const BoardView = () => {
  const user = getUserFromStorage();
  const isManager = user?.role === 'manager' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Navbar 
        isManager={isManager}
        isAdmin={isAdmin}
        onCreateClick={() => {
          // Trigger the "Create" button — BoardPage owns the modal, so we use a
          // custom event to open it from the Navbar without prop drilling
          window.dispatchEvent(new CustomEvent('taskflow:open-create'));
        }} 
      />
      <ProjectHeader />
      <BoardToolbar />
      <BoardPage isManager={isManager} />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/team"   element={<TeamPage />} />
      <Route path="/"       element={<BoardView />} />
      <Route path="*"       element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
