import { mockActivities } from '../data/mockData';

export default function ActivitiesPage() {
  const activities = mockActivities;

  return (
    <div className="mockup-page">
      <div className="mockup-header">
        <h2>Activity Log</h2>
        <p>A timeline of all recent actions performed across the project.</p>
      </div>

      <div className="timeline-container">
        {activities.map(act => (
          <div key={act.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-time">{act.time}</div>
              <div className="timeline-text">
                <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{act.user}</span> {act.action} <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>{act.target}</span> {act.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
