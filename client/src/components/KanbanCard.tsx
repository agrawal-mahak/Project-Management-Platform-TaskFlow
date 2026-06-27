import type { Card } from '../types';

const LABEL_CLASS: Record<string, string> = {
  blue:   'label-blue',
  green:  'label-green',
  orange: 'label-orange',
  red:    'label-red',
  purple: 'label-purple',
  teal:   'label-teal',
  pink:   'label-pink',
};

// Priority → color mapping for the badge
const PRIORITY_COLOR: Record<string, string> = {
  easy:   '#4bce97',
  medium: '#579dff',
  high:   '#f5cd47',
  urgent: '#f87168',
};

interface Props {
  card: Card;
  onEdit:   (card: Card) => void;
  onDelete: (cardId: string) => void;
}

const KanbanCard = ({ card, onEdit, onDelete }: Props) => {
  // Format ISO date "YYYY-MM-DD" → "Oct 14, 2025" for display
  const formattedDate = card.dueDate
    ? new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click (edit) from firing
    onDelete(card.id);
  };

  return (
    <div className="kanban-card" onClick={() => onEdit(card)}>

      {/* ── Hover action bar (edit + delete) ── */}
      <div className="card-actions">
        <button
          className="card-action-btn"
          onClick={() => onEdit(card)}
          title="Edit"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="card-action-btn card-action-btn--delete"
          onClick={handleDeleteClick}
          title="Delete"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>

      {/* Label badge */}
      {card.label && (
        <div className={`card-label ${LABEL_CLASS[card.label.color] ?? ''}`}>
          {card.label.text}
        </div>
      )}

      {/* Title */}
      <div className="card-title">{card.title}</div>

      {/* Category */}
      {card.category && (
        <div className="card-category">{card.category}</div>
      )}

      {/* Footer: priority + due date + ticket id + assignee */}
      <div className="card-footer">
        <div className="card-meta">

          {/* Priority dot */}
          {card.priority && (
            <div
              className="card-priority-dot"
              style={{ background: PRIORITY_COLOR[card.priority] ?? '#596773' }}
              title={card.priority}
            />
          )}

          {/* Due date */}
          {formattedDate && (
            <div className={`card-due-date ${card.isOverdue ? 'overdue' : 'normal'}`}>
              {card.isOverdue && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
              {formattedDate}
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
