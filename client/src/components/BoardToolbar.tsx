// Team members shown in the avatar stack
const TEAM = [
  { initials: 'MA', color: '#c43c3c' },
  { initials: 'EY', color: '#2d8a4e' },
  { initials: 'LK', color: '#2d6ab0' },
  { initials: 'MP', color: '#7b4eb0' },
];

const BoardToolbar = () => {
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
        {TEAM.map(member => (
          <div key={member.initials} className="avatar" style={{ background: member.color }} title={member.initials}>
            {member.initials}
          </div>
        ))}
        <div className="avatar-more">+2</div>
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
