import { useState } from 'react';

// Sub-navigation tabs shown below the project name
const TABS = [
  { id: 'summary',    label: 'Summary'    },
  { id: 'timeline',   label: 'Timeline'   },
  { id: 'backlog',    label: 'Backlog'    },
  { id: 'board',      label: 'Board'      },
  { id: 'calendar',   label: 'Calendar'   },
  { id: 'list',       label: 'List'       },
  { id: 'code',       label: 'Code'       },
  { id: 'activities', label: 'Activities' },
  { id: 'development',label: 'Development'},
  { id: 'timesheet',  label: 'Timesheet'  },
];

const ProjectHeader = () => {
  const [activeTab, setActiveTab] = useState('board');

  return (
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
          <button className="nav-icon-btn" title="Add member">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>
          <button className="nav-icon-btn" title="More options">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

        <div className="project-title-actions">
          <button className="nav-icon-btn" title="Share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          <button className="nav-icon-btn" title="Lightning">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </button>
          <button className="nav-icon-btn" title="Chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="nav-icon-btn" title="Expand">
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
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <button className="subnav-tab">+</button>
      </div>
    </div>
  );
};

export default ProjectHeader;
