/* Left panel: animated kanban board preview + branding */
const AuthLeftPanel = () => (
  <div className="auth-left">
    {/* Animated background blobs */}
    <div className="auth-blob auth-blob-1" />
    <div className="auth-blob auth-blob-2" />
    <div className="auth-blob auth-blob-3" />

    {/* Branding */}
    <div className="auth-brand">
      <div className="auth-brand-logo">
        <div className="auth-brand-icon">T</div>
        <span className="auth-brand-name">TaskFlow</span>
      </div>
      <p className="auth-brand-tagline">
        Manage your projects with ease. Plan sprints, track issues, and ship faster — all in one place.
      </p>
    </div>

    {/* Floating Kanban Preview */}
    <div className="auth-kanban-preview">
      {/* TO DO */}
      <div className="auth-mini-col">
        <div className="auth-mini-col-header">To Do</div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip blue" />
          <div className="auth-mini-text w80" />
          <div className="auth-mini-text w60" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#579dff' }} />
            <div className="auth-mini-avatar" style={{ background: '#2d8a4e' }} />
          </div>
        </div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip red" />
          <div className="auth-mini-text w70" />
          <div className="auth-mini-text w50" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#f87168' }} />
            <div className="auth-mini-avatar" style={{ background: '#c43c3c' }} />
          </div>
        </div>
      </div>

      {/* IN PROGRESS */}
      <div className="auth-mini-col">
        <div className="auth-mini-col-header">In Progress</div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip orange" />
          <div className="auth-mini-text w80" />
          <div className="auth-mini-text w60" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#f5cd47' }} />
            <div className="auth-mini-avatar" style={{ background: '#2d6ab0' }} />
          </div>
        </div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip purple" />
          <div className="auth-mini-text w70" />
          <div className="auth-mini-text w80" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#9f8fef' }} />
          </div>
        </div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip teal" />
          <div className="auth-mini-text w60" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#60c6d2' }} />
            <div className="auth-mini-avatar" style={{ background: '#2d8a4e' }} />
          </div>
        </div>
      </div>

      {/* DONE */}
      <div className="auth-mini-col">
        <div className="auth-mini-col-header">Done</div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip green" />
          <div className="auth-mini-text w70" />
          <div className="auth-mini-text w50" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#4bce97' }} />
            <div className="auth-mini-avatar" style={{ background: '#2d8a4e' }} />
          </div>
        </div>
        <div className="auth-mini-card">
          <div className="auth-mini-chip blue" />
          <div className="auth-mini-text w80" />
          <div className="auth-mini-footer">
            <div className="auth-mini-dot" style={{ background: '#579dff' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLeftPanel;
