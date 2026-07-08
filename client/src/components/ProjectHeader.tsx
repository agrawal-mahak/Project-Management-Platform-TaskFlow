import { useState } from 'react';
import toast from 'react-hot-toast';

// Sub-navigation tabs shown below the project name
export const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'board', label: 'Board' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'list', label: 'List' },
  { id: 'code', label: 'Code' },
  { id: 'activities', label: 'Activities' },
  { id: 'development', label: 'Development' },
  { id: 'timesheet', label: 'Timesheet' },
];

interface Props {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ProjectHeader = ({ activeTab, onTabChange }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<'add_member' | 'more' | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const toggleDropdown = (type: 'add_member' | 'more') => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Project link copied to clipboard!');
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleInvite = () => {
    if (inviteEmail) {
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setOpenDropdown(null);
    }
  };

  return (
    <>
      <div className="project-header">
        {/* Breadcrumb */}
        <div className="project-breadcrumb">
          <span>Spaces</span>
          <span>/</span>
          <span>ERP Project</span>
        </div>

        {/* Project name + action icons */}
        <div className="project-title-row">
          <div className="project-name">
            <div className="project-icon">📋</div>
            ERP Project

            <div style={{ position: 'relative' }}>
              <button className="nav-icon-btn" title="Add member" onClick={() => toggleDropdown('add_member')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </button>

              {openDropdown === 'add_member' && (
                <div className="dropdown-menu dropdown-menu-left" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Invite Team Member</div>
                  <input
                    type="email"
                    placeholder="Email address..."
                    className="form-input"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    style={{ marginBottom: '12px' }}
                  />
                  <button
                    onClick={handleInvite}
                    style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
                  >
                    Send Invite
                  </button>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button className="nav-icon-btn" title="More options" onClick={() => toggleDropdown('more')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>

              {openDropdown === 'more' && (
                <div className="dropdown-menu dropdown-menu-left">
                  <div className="dropdown-header">Project Options</div>
                  <div className="dropdown-item">⚙️ Project Settings</div>
                  <div className="dropdown-item">📊 Export Data (CSV)</div>
                  <div className="dropdown-item" style={{ color: 'var(--accent-red)' }}>🗑️ Archive Project</div>
                </div>
              )}
            </div>
          </div>

          <div className="project-title-actions">
            <button className="nav-icon-btn" title="Share" onClick={handleShare}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <button className="nav-icon-btn" title="Activity Logs" onClick={() => onTabChange('activities')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </button>
            <button className="nav-icon-btn" title="Chat" onClick={() => setIsChatOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="nav-icon-btn" title="Fullscreen" onClick={handleFullscreen}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sub-nav tabs */}
        <div className="subnav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`subnav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slide-out Chat Drawer */}
      {isChatOpen && (
        <div className="chat-drawer-overlay" onClick={() => setIsChatOpen(false)}>
          <div className="chat-drawer" onClick={e => e.stopPropagation()}>
            <div className="chat-header">
              <h3>Project Chat</h3>
              <button className="chat-close-btn" onClick={() => setIsChatOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="chat-messages">
              <div className="chat-message">
                <div className="chat-message-meta">Jane Smith • 10:42 AM</div>
                <div className="chat-bubble">Hey everyone! I just updated the ERP tasks for this week.</div>
              </div>
              <div className="chat-message">
                <div className="chat-message-meta">Divya Jain • 11:15 AM</div>
                <div className="chat-bubble">Awesome, I will take a look at the Navbar layout bug today.</div>
              </div>
              <div className="chat-message">
                <div className="chat-message-meta">Admin User • 12:00 PM</div>
                <div className="chat-bubble">Please make sure to link your PRs to the task tickets.</div>
              </div>
              <div className="chat-message">
                <div className="chat-message-meta" style={{ alignSelf: 'flex-end' }}>You • Just now</div>
                <div className="chat-bubble me">Will do!</div>
              </div>
            </div>

            <div className="chat-input-area">
              <input type="text" className="chat-input" placeholder="Type a message..." />
              <button className="chat-send-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectHeader;
