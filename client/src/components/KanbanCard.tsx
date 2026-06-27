import type { Card } from '../types';

// Maps label color names → CSS class names
const LABEL_CLASS: Record<string, string> = {
  blue:   'label-blue',
  green:  'label-green',
  orange: 'label-orange',
  red:    'label-red',
  purple: 'label-purple',
  teal:   'label-teal',
  pink:   'label-pink',
};

interface Props {
  card: Card;
}

const KanbanCard = ({ card }: Props) => {
  return (
    <div className="kanban-card">
      {/* Colored label badge */}
      {card.label && (
        <div className={`card-label ${LABEL_CLASS[card.label.color] ?? ''}`}>
          {card.label.text}
        </div>
      )}

      {/* Card title */}
      <div className="card-title">{card.title}</div>

      {/* Category pill */}
      {card.category && (
        <div className="card-category">{card.category}</div>
      )}

      {/* Footer: due date, ticket id, assignee */}
      <div className="card-footer">
        <div className="card-meta">
          {/* Due date */}
          {card.dueDate && (
            <div className={`card-due-date ${card.isOverdue ? 'overdue' : 'normal'}`}>
              {card.isOverdue && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
              {card.dueDate}
            </div>
          )}

          {/* Ticket ID */}
          <div className="card-id">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <polyline points="9 11 12 14 22 4" stroke="#22272b" strokeWidth="2.5" fill="none" />
            </svg>
            {card.id}
          </div>
        </div>

        {/* Assignee avatar */}
        {card.assigneeInitials && (
          <div
            className="avatar card-assignee"
            style={{ width: 24, height: 24, fontSize: 10, background: card.assigneeColor ?? '#596773' }}
            title={card.assigneeInitials}
          >
            {card.assigneeInitials}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
