import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProjectHeader, { TABS } from './components/ProjectHeader';
import BoardToolbar from './components/BoardToolbar';
import BoardPage from './pages/BoardPage';
import EmptyTabView from './components/EmptyTabView';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TeamPage from './pages/TeamPage';

import { getUserFromStorage } from './api/authApi';

/* ── Board view ── */
const BoardView = () => {
  const user = getUserFromStorage();
  const isManager = user?.role === 'manager' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('board');

  const currentTabLabel = TABS.find(t => t.id === activeTab)?.label || 'Unknown';

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
      <ProjectHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'board' ? (
        <>
          <BoardToolbar />
          <BoardPage isManager={isManager} />
        </>
      ) : (
        <EmptyTabView tabName={currentTabLabel} />
      )}
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
