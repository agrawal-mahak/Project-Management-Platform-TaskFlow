import { getAvatarColor, getInitials } from '../utils/helpers';
import { mockTimesheets } from '../data/mockData';

export default function TimesheetPage() {
  const timesheets = mockTimesheets;

  return (
    <div className="mockup-page">
      <div className="mockup-header">
        <h2>Timesheet</h2>
        <p>Logged hours vs capacity for all team members this week.</p>
      </div>

      <div className="backlog-table-container">
        <table className="backlog-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Logged Hours</th>
              <th>Capacity</th>
              <th style={{ width: '40%' }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map(ts => {
              const percentage = Math.min(100, (ts.logged / ts.capacity) * 100);
              const isOver = ts.logged > ts.capacity;
              
              return (
                <tr key={ts.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        fontSize: '10px', 
                        background: getAvatarColor(ts.name), 
                        color: '#fff', 
                        borderRadius: '50%', 
                        width: '24px', 
                        height: '24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0 
                      }}>
                        {getInitials(ts.name)}
                      </div>
                      <span className="backlog-title">{ts.name}</span>
                    </div>
                  </td>
                  <td style={{ color: isOver ? 'var(--accent-red)' : 'var(--text-primary)', fontWeight: 500 }}>
                    {ts.logged}h
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{ts.capacity}h</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="ts-progress-bar">
                        <div 
                          className="ts-progress-fill" 
                          style={{ 
                            width: `${percentage}%`, 
                            background: isOver ? 'var(--accent-red)' : 'var(--accent-blue)' 
                          }} 
                        />
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
