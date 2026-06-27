import type { Column } from '../types';
import KanbanCard from './KanbanCard';

interface Props {
  column: Column;
}

const KanbanColumn = ({ column }: Props) => {
  return (
    <div className="kanban-column">
      {/* Column header */}
      <div className="column-header">
        <div className="column-title">
          {column.title}
          {column.count !== undefined && (
            <span className="column-count">{column.count}</span>
          )}
        </div>
        <button className="column-more-btn nav-icon-btn" title="Column options">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* Cards list */}
      <div className="column-cards">
        {column.cards.map(card => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add card button */}
      <button className="add-card-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create
      </button>
    </div>
  );
};

export default KanbanColumn;
