import { mockTimelineTasks } from '../data/mockData';

export default function TimelinePage() {
  const ganttTasks = mockTimelineTasks;

  return (
    <div className="mockup-page">
      <div className="mockup-header">
        <h2>Timeline</h2>
        <p>A Gantt chart view of your project schedule.</p>
      </div>

      <div className="gantt-container">
        <div style={{ display: 'flex', marginBottom: '16px', color: 'var(--text-muted)', fontSize: '12px' }}>
          <div style={{ width: '200px' }}>Task Name</div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
        
        {ganttTasks.map((task, i) => (
          <div key={i} className="gantt-row">
            <div className="gantt-label">{task.name}</div>
            <div className="gantt-track">
              <div 
                className="gantt-bar" 
                style={{ 
                  left: `${task.start}%`, 
                  width: `${task.width}%`, 
                  background: task.color 
                }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
