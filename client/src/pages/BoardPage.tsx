import { useEffect, useState } from 'react';
import type { Card, Column, TaskFormData } from '../types';
import KanbanColumn from '../components/KanbanColumn';
import CreateTaskModal from '../components/CreateTaskModal';
import { fetchCards, createCard, updateCard, deleteCard, patchCardStatus } from '../api/cardApi';
import toast from 'react-hot-toast';

// ── Static column definitions ──────────────────────────────────────────────
const COLUMN_DEFS: { id: string; title: string }[] = [
  { id: 'draft', title: 'Draft' },
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'revision', title: 'Revision Needed' },
  { id: 'intest', title: 'In Test' },
  { id: 'done', title: 'Done' },
];

// ── Modal state ────────────────────────────────────────────────────────────
type ModalState =
  | { open: false }
  | { open: true; mode: 'create'; defaultStatus: string }
  | { open: true; mode: 'edit'; card: Card };

const BoardPage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ open: false });

  // ── Load all cards from API ───────────────────────────────────────────────
  const loadCards = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const data = await fetchCards();
      setCards(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // ── Listen for Navbar "Create" button click ────────────────────────────────
  useEffect(() => {
    const handler = () => setModalState({ open: true, mode: 'create', defaultStatus: 'todo' });
    window.addEventListener('taskflow:open-create', handler);
    return () => window.removeEventListener('taskflow:open-create', handler);
  }, []);

  // ── Next display task number ───────────────────────────────────────────────
  const nextNum = (): number => {
    const nums = cards
      .map(c => parseInt(c.id.replace('ERP-', ''), 10))
      .filter(n => !isNaN(n));
    return nums.length > 0 ? Math.max(...nums) + 1 : 1201;
  };

  // ── Create ────────────────────────────────────────────────────────────────
  const handleCreate = async (data: TaskFormData) => {
    try {
      const created = await createCard(data);
      setCards(prev => [...prev, created]);
      toast.success('Task created ✓');
      setModalState({ open: false });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create task');
    }
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const handleEdit = async (data: TaskFormData) => {
    if (!modalState.open || modalState.mode !== 'edit') return;
    const { card } = modalState;
    if (!card._mongoId) return;
    try {
      await updateCard(card._mongoId, data);
      const updated: Card = {
        ...card,
        title: data.title,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate || undefined,
        assignedTo: data.assignedTo,
      };
      setCards(prev => prev.map(c => c._mongoId === card._mongoId ? updated : c));
      toast.success('Task updated ✓');
      setModalState({ open: false });
      // page should be refreshed by call getallcards api
      await loadCards(false);

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update task');
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (card: Card) => {
    if (!card._mongoId) return;
    try {
      await deleteCard(card._mongoId);
      setCards(prev => prev.filter(c => c._mongoId !== card._mongoId));
      toast.success('Task deleted');
      setModalState({ open: false });
      await loadCards(false);
    } catch {
      toast.error('Failed to delete task');
    }
  };

  // ── Drag-and-drop: optimistic status update + API save ────────────────────
  const handleDragStatusChange = async (card: Card, newStatus: string) => {
    // Optimistic — move card immediately so the UI feels instant
    setCards(prev => prev.map(c =>
      c._mongoId === card._mongoId ? { ...c, status: newStatus } : c
    ));
    try {
      await patchCardStatus(card, newStatus);
    } catch {
      // Revert if the API call fails
      setCards(prev => prev.map(c =>
        c._mongoId === card._mongoId ? { ...c, status: card.status } : c
      ));
      toast.error('Failed to save status change');
    }
  };

  // ── Edit modal default values ─────────────────────────────────────────────
  const editDefaults = (): TaskFormData | undefined => {
    if (!modalState.open || modalState.mode !== 'edit') return undefined;
    const { card } = modalState;
    return {
      taskNo: card.id,
      title: card.title,
      status: card.status,
      priority: card.priority,
      dueDate: card.dueDate ?? '',
      assignedTo: card.assignedTo ?? '',
    };
  };

  const n = nextNum();



  return (
    <>
      {/* ── Loading spinner ── */}
      {isLoading && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '60vh', color: 'var(--text-secondary)', gap: 12, fontSize: 14,
        }}>
          <div className="auth-spinner" />
          Loading tasks...
        </div>
      )}

      {/* ── Kanban board ── */}
      {!isLoading && (
        <div className="board">
          {COLUMN_DEFS.map(col => (
            <KanbanColumn
              key={col.id}
              column={col}
              cards={cards.filter(c => c.status === col.id)}
              onCardEdit={card => setModalState({ open: true, mode: 'edit', card })}
              onCardDelete={card => handleDelete(card)}
              onAddCard={colId => setModalState({ open: true, mode: 'create', defaultStatus: colId })}
              onDragStatusChange={handleDragStatusChange}
            />
          ))}
        </div>
      )}

      {/* ── Create modal ── */}
      {modalState.open && modalState.mode === 'create' && (
        <CreateTaskModal
          mode="create"
          taskNumber={n}
          defaultValues={{
            taskNo: `ERP-${n}`,
            title: '',
            status: modalState.defaultStatus,
            priority: 'medium',
            dueDate: '',
            assignedTo: '',
          }}
          onClose={() => setModalState({ open: false })}
          onSubmit={handleCreate}
        />
      )}

      {/* ── Edit modal ── */}
      {modalState.open && modalState.mode === 'edit' && (
        <CreateTaskModal
          mode="edit"
          defaultValues={editDefaults()}
          onClose={() => setModalState({ open: false })}
          onSubmit={handleEdit}
          onDelete={() => handleDelete(modalState.card)}
        />
      )}
    </>
  );
};

export default BoardPage;
