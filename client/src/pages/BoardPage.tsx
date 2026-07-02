import type { Card, Column } from '../types';
import KanbanColumn from '../components/KanbanColumn';
import { useEffect, useState } from 'react';
import { fetchCards } from '../api/cardApi';
import toast from 'react-hot-toast';

// ── Static column definitions (order + display titles) ────────────────────
const COLUMN_DEFS: { id: string; title: string }[] = [
  { id: 'draft',      title: 'Draft' },
  { id: 'todo',       title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'revision',   title: 'Revision Needed' },
  { id: 'intest',     title: 'In Test' },
  { id: 'done',       title: 'Done' },
];

interface Props {
  columns:      Column[];
  onCardEdit:   (card: Card) => void;
  onCardDelete: (cardId: string) => void;
  onAddCard:    (columnId: string) => void;
}

const BoardPage = ({ onCardEdit, onCardDelete, onAddCard }: Props) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCards({});
        // API returns: { meta: {...}, data: [...] }
        const raw: any[] = res.data.data;

        const formatted: Card[] = raw.map((card) => ({
          id:       card._id,
          title:    card.taskName,
          status:   card.status,
          priority: card.priority,
          dueDate:  card.endDate,
        }));

        setCards(formatted);
      } catch (err) {
        console.error(err);
        toast.error('Error fetching cards');
      }
    };
    load();
  }, []);

  return (
    <div className="board">
      {COLUMN_DEFS.map(col => (
        <KanbanColumn
          key={col.id}
          column={col}
          cards={cards.filter(c => c.status === col.id)}
          onCardEdit={onCardEdit}
          onCardDelete={onCardDelete}
          onAddCard={onAddCard}
        />
      ))}
    </div>
  );
};

export default BoardPage;
