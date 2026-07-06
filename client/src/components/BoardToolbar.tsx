import { useEffect, useState } from "react";

import { fetchUsers } from "../api/authApi";
import { getAvatarColor, getInitials } from "../utils/helpers";

interface BoardToolbarProps {
  filterAssignee?: string | null;
  onFilterChange: (assignee: string | null) => void;
  onSearchChange: (search: string) => void;
}

const BoardToolbar = ({ filterAssignee, onFilterChange, onSearchChange }: BoardToolbarProps) => {
  const [team, setTeam] = useState<{ _id: string; name: string; email: string }[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    fetchUsers().then(setTeam).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  return (
    <div className="board-toolbar">
      {/* Search */}
      <div className="toolbar-search">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="7" cy="7" r="5" />
          <path d="M12 12l3 3" strokeLinecap="round" />
        </svg>
        <input 
          type="text" 
          placeholder="Search board" 
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
        />
      </div>

      {/* Avatar stack */}
      <div className="avatar-stack">
        {team.slice(0, 5).map(member => {
          const initials = getInitials(member.name);
          const color = getAvatarColor(member.name);
          return (
            <div key={member._id} className="avatar" style={{ background: color }} title={member.name}>
              {initials}
            </div>
          );
        })}
        {team.length > 5 && <div className="avatar-more">+{team.length - 5}</div>}
      </div>

      {/* Filter */}
      <button className="toolbar-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filter
      </button>

      {/* Custom filters */}
      <div style={{ position: 'relative' }}>
        <button 
          className={`toolbar-btn ${filterAssignee ? 'active' : ''}`} 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {filterAssignee ? `Filter: ${filterAssignee}` : 'Custom filters'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isFilterOpen && (
          <div className="filter-dropdown">
            <div className="filter-dropdown-header">Filter by Assignee</div>
            <div 
              className={`filter-item ${filterAssignee === null ? 'selected' : ''}`}
              onClick={() => {
                onFilterChange(null);
                setIsFilterOpen(false);
              }}
            >
              <div className="avatar" style={{ background: '#596773' }}>All</div>
              <span>All Users</span>
            </div>
            
            {team.map(member => (
              <div 
                key={member._id}
                className={`filter-item ${filterAssignee === member.name ? 'selected' : ''}`}
                onClick={() => {
                  onFilterChange(member.name);
                  setIsFilterOpen(false);
                }}
              >
                <div className="avatar" style={{ background: getAvatarColor(member.name) }}>
                  {getInitials(member.name)}
                </div>
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-spacer" />

      {/* Complete sprint */}
      <button className="complete-sprint-btn">
        Complete sprint
      </button>

      {/* Group */}
      <button className="toolbar-btn">
        Group
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* More options */}
      <button className="nav-icon-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
    </div>
  );
};

export default BoardToolbar;
