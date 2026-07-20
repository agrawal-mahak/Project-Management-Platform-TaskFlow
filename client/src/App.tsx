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

import SummaryPage from './pages/SummaryPage';
import CalendarPage from './pages/CalendarPage';
import BacklogPage from './pages/BacklogPage';
import ListPage from './pages/ListPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DevelopmentPage from './pages/DevelopmentPage';
import TimesheetPage from './pages/TimesheetPage';
import CodePage from './pages/CodePage';
import TimelinePage from './pages/TimelinePage';

/* ── Board view ── */
const BoardView = () => {
  const user = getUserFromStorage();
  const isManager = user?.role === 'manager' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('board');
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          <BoardToolbar
            filterAssignee={filterAssignee}
            onFilterChange={setFilterAssignee}
            onSearchChange={setSearchQuery}
          />
          <BoardPage
            isManager={isManager}
            filterAssignee={filterAssignee}
            searchQuery={searchQuery}
          />
        </>
      ) : activeTab === 'summary' ? (
        <SummaryPage />
      ) : activeTab === 'calendar' ? (
        <CalendarPage />
      ) : activeTab === 'backlog' ? (
        <BacklogPage />
      ) : activeTab === 'list' ? (
        <ListPage />
      ) : activeTab === 'activities' ? (
        <ActivitiesPage />
      ) : activeTab === 'development' ? (
        <DevelopmentPage />
      ) : activeTab === 'timesheet' ? (
        <TimesheetPage />
      ) : activeTab === 'code' ? (
        <CodePage />
      ) : activeTab === 'timeline' ? (
        <TimelinePage />
      ) : (
        <EmptyTabView tabName={currentTabLabel} />
      )}
    </>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUserFromStorage();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUserFromStorage();
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
      <Route path="/" element={<ProtectedRoute><BoardView /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
