import { useEffect, useState } from "react";

import { fetchUsers } from "../api/authApi";



const AVATAR_COLORS = ['#c43c3c', '#2d8a4e', '#2d6ab0', '#7b4eb0', '#f5cd47', '#f87168', '#4bce97'];

const BoardToolbar = () => {
  const [team, setTeam] = useState<{ _id: string; name: string; email: string }[]>([]);

  useEffect(() => {
    fetchUsers().then(setTeam).catch(console.error);
  }, []);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');

  const getAvatarColor = (name: string) => {
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  };
  return (

    <div className="board-toolbar">
      {/* Search */}
      <div className="toolbar-search">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="7" cy="7" r="5" />
          <path d="M12 12l3 3" strokeLinecap="round" />
        </svg>
        <input type="text" placeholder="Search board" />
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
      <button className="toolbar-btn">
        Custom filters
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

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
