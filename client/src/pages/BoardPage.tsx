import type { Card, Column } from '../types';
import KanbanColumn from '../components/KanbanColumn';

interface Props {
  columns:      Column[];
  onCardEdit:   (card: Card) => void;
  onCardDelete: (cardId: string) => void;
  onAddCard:    (columnId: string) => void;
}

const BoardPage = ({ columns, onCardEdit, onCardDelete, onAddCard }: Props) => {
  return (
    <div className="board">
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          column={column}
          onCardEdit={onCardEdit}
          onCardDelete={onCardDelete}
          onAddCard={onAddCard}
        />
      ))}
    </div>
  );
};

export default BoardPage;
