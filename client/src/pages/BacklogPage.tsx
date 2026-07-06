import { useState, useEffect } from 'react';
import { fetchCards } from '../api/cardApi';
import type { Card } from '../types';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return { bg: 'rgba(248,113,104,0.15)', color: 'var(--accent-red)' };
    case 'high': return { bg: 'rgba(245,205,71,0.15)', color: 'var(--accent-orange)' };
    case 'medium': return { bg: 'rgba(87,157,255,0.15)', color: 'var(--accent-blue)' };
    case 'easy': return { bg: 'rgba(75,206,151,0.15)', color: 'var(--accent-green)' };
    default: return { bg: 'var(--bg-col)', color: 'var(--text-muted)' };
  }
};

const getStatusColor = (status: string) => {
  if (status === 'draft') return { bg: 'rgba(140,155,171,0.15)', color: 'var(--text-secondary)' };
  if (status === 'todo') return { bg: 'rgba(245,205,71,0.15)', color: 'var(--accent-orange)' };
  return { bg: 'var(--bg-col)', color: 'var(--text-muted)' };
};

export default function BacklogPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCards()
      .then(fetched => {
        // Filter out cards that have been started
        const backlogCards = fetched.filter(c => c.status === 'draft' || c.status === 'todo');
        setCards(backlogCards);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <div className="auth-spinner" style={{ marginRight: 12 }} /> Loading backlog...
      </div>
    );
  }

  return (
    <div className="backlog-page">
      <div className="backlog-header">
        <h2>Backlog</h2>
        <p>Upcoming tasks that are in Draft or To Do status.</p>
      </div>

      <div className="backlog-table-container">
        {cards.length === 0 ? (
          <div className="backlog-empty">No upcoming tasks in the backlog.</div>
        ) : (
          <table className="backlog-table">
            <thead>
              <tr>
                <th>Task No.</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(card => {
                const priorityStyles = getPriorityColor(card.priority);
                const statusStyles = getStatusColor(card.status);

                return (
                  <tr key={card.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{card.id}</td>
                    <td className="backlog-title">{card.title}</td>
                    <td>
                      <span className="backlog-pill" style={{ background: statusStyles.bg, color: statusStyles.color }}>
                        {card.status}
                      </span>
                    </td>
                    <td>
                      <span className="backlog-pill" style={{ background: priorityStyles.bg, color: priorityStyles.color }}>
                        {card.priority}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {card.dueDate ? new Date(card.dueDate).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      {card.assigneeInitials ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            fontSize: '10px', 
                            background: card.assigneeColor, 
                            color: '#fff', 
                            borderRadius: '50%', 
                            width: '24px', 
                            height: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0 
                          }}>
                            {card.assigneeInitials}
                          </div>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{card.assignedTo}</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Unassigned</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
