import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getUserFromStorage } from '../api/authApi';
import toast from 'react-hot-toast';

interface Props {
  onCreateClick: () => void;
  isManager?: boolean;
  isAdmin?: boolean;
}

// Derive initials from a full name, e.g. "Jane Doe" → "JD"
const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

// Pick a consistent color from the name
const AVATAR_COLORS = ['#c43c3c', '#2d8a4e', '#2d6ab0', '#7c3aed', '#b45309', '#0e7490'];
const getAvatarColor = (name: string): string =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const Navbar = ({ onCreateClick, isManager = true, isAdmin = false }: Props) => {
  const navigate = useNavigate();
  const user = getUserFromStorage();
  const initials = user ? getInitials(user.name) : '?';
  const avatarColor = user ? getAvatarColor(user.name) : '#596773';

  const [openDropdown, setOpenDropdown] = useState<'grid' | 'help' | 'settings' | 'avatar' | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [settingsView, setSettingsView] = useState<'main' | 'theme'>('main');

  useEffect(() => {
    if (user) {
      const savedTheme = localStorage.getItem(`theme_${user._id}`) as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        // Fallback to default dark
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }, [user]);

  const toggleDropdown = (type: 'grid' | 'help' | 'settings' | 'avatar') => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    if (user) {
      localStorage.setItem(`theme_${user._id}`, newTheme);
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    toast.success(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme enabled`);
  };

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left: grid icon + logo */}
      <div className="navbar-left">
        <div style={{ position: 'relative' }}>
          <button className="nav-icon-btn" title="Grid menu" onClick={() => toggleDropdown('grid')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="5" height="5" rx="1" />
              <rect x="10" y="1" width="5" height="5" rx="1" />
              <rect x="1" y="10" width="5" height="5" rx="1" />
              <rect x="10" y="10" width="5" height="5" rx="1" />
            </svg>
          </button>

          {openDropdown === 'grid' && (
            <div className="dropdown-menu dropdown-menu-left">
              <div className="dropdown-header">Workspaces</div>
              <div className="dropdown-item">📁 Jira Integration</div>
              <div className="dropdown-item">💬 Slack Notifications</div>
              <div className="dropdown-item">📝 Confluence Wiki</div>
              <div className="dropdown-item">📊 PowerBI Dashboard</div>
            </div>
          )}
        </div>

        <a href="#" className="navbar-logo">
          <div className="logo-icon">T</div>
          TaskFlow
        </a>
      </div>

      {/* Center: search */}
      <div className="navbar-search">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="7" cy="7" r="5" />
            <path d="M12 12l3 3" strokeLinecap="round" />
          </svg>
          <input type="text" placeholder="Search tasks..." />
        </div>
      </div>

      {/* Right: create + icons + avatar + logout */}
      <div className="navbar-right">
        {isManager && (
          <button className="create-btn" onClick={onCreateClick}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Create
          </button>
        )}

        {isAdmin && (
          <button
            className="nav-icon-btn"
            title="Team Dashboard"
            onClick={() => navigate('/team')}
            style={{ width: 'auto', padding: '0 8px', fontSize: 13, fontWeight: 600, background: 'transparent', border: '1px solid #3a4450' }}
          >
            Team
          </button>
        )}

        <button className="nav-icon-btn" title="Notifications (Disabled)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="nav-icon-btn" title="Help" onClick={() => toggleDropdown('help')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="currentColor" />
            </svg>
          </button>

          {openDropdown === 'help' && (
            <div className="dropdown-menu">
              <div className="dropdown-header">Help & Resources</div>
              <div className="dropdown-item">📖 Documentation</div>
              <div className="dropdown-item">⌨️ Keyboard Shortcuts</div>
              <div className="dropdown-item">💬 Contact Support</div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button className="nav-icon-btn" title="Settings" onClick={() => {
            toggleDropdown('settings');
            setSettingsView('main');
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          {openDropdown === 'settings' && (
            <div className="dropdown-menu">
              {settingsView === 'main' ? (
                <>
                  <div className="dropdown-header">User Settings</div>
                  <div className="dropdown-item">👤 Profile Setup</div>
                  <div className="dropdown-item" onClick={(e) => {
                    e.stopPropagation();
                    setSettingsView('theme');
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span>🎨 Theme Preferences</span>
                      <span>›</span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSettingsView('main'); }}
                      style={{ padding: 0, background: 'transparent', color: 'var(--text-secondary)' }}
                    >
                      ‹
                    </button>
                    Theme Preferences
                  </div>
                  <div className="dropdown-item" onClick={() => handleSetTheme('light')}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span>🔆 Light</span>
                      {theme === 'light' && <span style={{ color: 'var(--accent-blue)' }}>✓</span>}
                    </span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleSetTheme('dark')}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span>🌙 Dark</span>
                      {theme === 'dark' && <span style={{ color: 'var(--accent-blue)' }}>✓</span>}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Avatar Dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <div
              className="avatar"
              style={{ background: avatarColor, cursor: 'pointer' }}
              title={user?.name ?? 'Account'}
              onClick={() => toggleDropdown('avatar')}
            >
              {initials}
            </div>

            {openDropdown === 'avatar' && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{user.name}</span>
                    <span style={{ fontSize: '10px', background: 'var(--accent-red)', padding: '2px 6px', borderRadius: '4px', textTransform: 'capitalize', color: '#ffffff', fontWeight: 600 }}>
                      {user.role}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '4px' }}>{user.email}</div>
                </div>
                <div className="dropdown-item">✏️ Edit Profile</div>
                <div className="dropdown-item" onClick={handleLogout} style={{ color: 'var(--accent-red)' }}>➜] Logout</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
