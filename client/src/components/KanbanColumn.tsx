import type { Card } from '../types';
import KanbanCard from './KanbanCard';

interface Props {
  column:               { id: string; title: string };
  cards:                Card[];
  onCardEdit:           (card: Card) => void;
  onCardDelete:         (card: Card) => void;                         // full card (needs _mongoId)
  onAddCard:            (columnId: string) => void;
  onDragStatusChange?:  (card: Card, newStatus: string) => void;     // drag-and-drop save
}

const KanbanColumn = ({
  column, cards, onCardEdit, onCardDelete, onAddCard, onDragStatusChange,
}: Props) => {

  // ── Drag target: allow drop ────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // ── Drop: find the dragged card and call status change ────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const mongoId = e.dataTransfer.getData('text/plain');
    if (!mongoId || !onDragStatusChange) return;

    // We need the full card to send to patchCardStatus
    // The card comes from a flat list, so we search all cards passed to this column
    // The dragged card might not be in this column yet — the parent passes all cards
    // We'll use a custom event to get the card data
    const cardJson = e.dataTransfer.getData('application/json');
    if (!cardJson) return;
    const card: Card = JSON.parse(cardJson);
    if (card.status !== column.id) {
      onDragStatusChange(card, column.id);
    }
  };

  return (
    <div
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="column-header">
        <div className="column-title">
          {column.title}
          {cards.length > 0 && (
            <span className="column-count">{cards.length}</span>
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

      {/* Cards */}
      <div className="column-cards">
        {cards.map(card => (
          <KanbanCard
            key={card.id}
            card={card}
            onEdit={onCardEdit}
            onDelete={onCardDelete}
          />
        ))}
      </div>

      {/* Add card button */}
      <button className="add-card-btn" onClick={() => onAddCard(column.id)}>
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
