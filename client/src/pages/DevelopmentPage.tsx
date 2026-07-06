import { mockDevelopmentPRs } from '../data/mockData';

export default function DevelopmentPage() {
  const prs = mockDevelopmentPRs;

  return (
    <div className="mockup-page">
      <div className="mockup-header">
        <h2>Development</h2>
        <p>Linked branches, commits, and pull requests from GitHub/GitLab.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {prs.map(pr => (
          <div key={pr.id} className="dev-pr-card">
            <div className="dev-pr-icon">
              {/* Branch icon SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="3" x2="6" y2="15"></line>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
            </div>
            <div className="dev-pr-info">
              <div className="dev-pr-title">{pr.title} <span style={{ color: 'var(--text-secondary)' }}>{pr.id}</span></div>
              <div className="dev-pr-meta">
                <span className={`pr-badge ${pr.status === 'merged' ? 'pr-merged' : 'pr-open'}`}>
                  {pr.status.toUpperCase()}
                </span>
                <span>{pr.repo}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                  {pr.branch}
                </span>
                <span>{pr.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
