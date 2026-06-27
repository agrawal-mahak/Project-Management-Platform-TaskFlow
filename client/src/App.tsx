import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProjectHeader from './components/ProjectHeader';
import BoardToolbar from './components/BoardToolbar';
import BoardPage from './pages/BoardPage';
import CreateTaskModal from './components/CreateTaskModal';
import type { Card, Column, TaskFormData } from './types';

// ── Column ID ↔ Status value mapping ──
// Column IDs match the status values used in the form
const INITIAL_COLUMNS: Column[] = [
  { id: 'draft',      title: 'Draft',           cards: [] },
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'ERP-885',  title: 'Enable Import functionality for additional Modules',        status: 'todo',       priority: 'high',   label: { text: 'SALES INVOICE', color: 'red' },       category: 'general',   dueDate: '2025-10-14', isOverdue: true,  assigneeInitials: 'D',  assigneeColor: '#2d8a4e' },
      { id: 'ERP-1146', title: 'Contact Person dropdown incomplete in Tickets',              status: 'todo',       priority: 'medium', category: 'Ticket',                                                            assigneeInitials: 'EY', assigneeColor: '#2d8a4e' },
      { id: 'ERP-1149', title: 'Linked Record validation shows errors one at a time on Delete', status: 'todo',   priority: 'medium', category: 'general' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    cards: [
      { id: 'ERP-1001', title: 'Unify numbering system for Sales & Purchase records',        status: 'inprogress', priority: 'high',   label: { text: 'SALES INVOICE', color: 'red' },       category: 'general',   assigneeInitials: 'EY', assigneeColor: '#2d8a4e' },
      { id: 'ERP-1075', title: 'Auto-fill Discounts from Company settings',                  status: 'inprogress', priority: 'urgent', label: { text: 'COMPANY MANAGEMENT', color: 'purple' }, category: 'company', dueDate: '2026-05-07', isOverdue: true,  assigneeInitials: 'EY', assigneeColor: '#2d8a4e' },
      { id: 'ERP-1101', title: 'Add active/inactive toggle for Inventory Items',              status: 'inprogress', priority: 'easy',   category: 'Inventory' },
      { id: 'ERP-1023', title: 'Fix pagination on Reports module',                            status: 'inprogress', priority: 'medium', label: { text: 'BUG', color: 'orange' },               category: 'general',   assigneeInitials: 'LK', assigneeColor: '#2d6ab0' },
    ],
  },
  {
    id: 'revision',
    title: 'Revision Needed',
    cards: [
      { id: 'ERP-988', title: 'Update tax calculation logic for multi-currency invoices',    status: 'revision',   priority: 'high',   label: { text: 'SALES INVOICE', color: 'red' },       category: 'general',   dueDate: '2026-03-12', isOverdue: true },
    ],
  },
  {
    id: 'intest',
    title: 'In Test',
    cards: [
      { id: 'ERP-1117', title: 'Duplicate tooltip shown on hover',                           status: 'intest',     priority: 'easy',   category: 'general',   assigneeInitials: 'EY', assigneeColor: '#2d8a4e' },
      { id: 'ERP-1200', title: 'List View Column Order Not Saved After Reordering',          status: 'intest',     priority: 'medium', label: { text: 'COMPANY MANAGEMENT', color: 'purple' }, category: 'general', dueDate: '2025-10-22', isOverdue: true },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'ERP-910', title: 'Make service fee editable using html input',                  status: 'done',       priority: 'easy',   label: { text: 'SERVICE FEE', color: 'teal' },        category: 'Service-',  dueDate: '2025-01-01' },
      { id: 'ERP-874', title: 'Export to PDF button missing on mobile view',                 status: 'done',       priority: 'medium', label: { text: 'BUG', color: 'orange' },               category: 'general',   assigneeInitials: 'MA', assigneeColor: '#c43c3c' },
    ],
  },
];

// ── Modal state shape ──
type ModalState =
  | { open: false }
  | { open: true; mode: 'create'; defaultStatus: string }
  | { open: true; mode: 'edit';   card: Card };

// ── Helper: generate next task number ──
const getNextTaskNumber = (columns: Column[]): number => {
  const allIds = columns.flatMap(c => c.cards.map(card => card.id));
  const numbers = allIds.map(id => parseInt(id.replace('ERP-', ''), 10)).filter(n => !isNaN(n));
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1201;
};

// ── Helper: remove a card from any column ──
const removeCard = (columns: Column[], cardId: string): Column[] =>
  columns.map(col => ({ ...col, cards: col.cards.filter(c => c.id !== cardId) }));

// ── Helper: add a card to the correct column by status ──
const addCardToColumn = (columns: Column[], card: Card): Column[] =>
  columns.map(col => col.id === card.status ? { ...col, cards: [...col.cards, card] } : col);

function App() {
  const [columns,     setColumns]     = useState<Column[]>(INITIAL_COLUMNS);
  const [modalState,  setModalState]  = useState<ModalState>({ open: false });

  // ── Open create modal (optionally pre-select a status) ──
  const openCreateModal = (defaultStatus = 'todo') =>
    setModalState({ open: true, mode: 'create', defaultStatus });

  // ── Open edit modal with the clicked card's data ──
  const openEditModal = (card: Card) =>
    setModalState({ open: true, mode: 'edit', card });

  const closeModal = () => setModalState({ open: false });

  // ── Create a new card ──
  const handleCreate = (data: TaskFormData) => {
    const newCard: Card = {
      id:       data.taskNo,
      title:    data.title,
      status:   data.status,
      priority: data.priority,
      dueDate:  data.dueDate || undefined,
    };
    setColumns(prev => addCardToColumn(prev, newCard));
    closeModal();
  };

  // ── Save edits — move card to new column if status changed ──
  const handleEdit = (data: TaskFormData) => {
    const updatedCard: Card = {
      ...(modalState.open && modalState.mode === 'edit' ? modalState.card : {}),
      id:       data.taskNo,
      title:    data.title,
      status:   data.status,
      priority: data.priority,
      dueDate:  data.dueDate || undefined,
    };
    setColumns(prev => addCardToColumn(removeCard(prev, data.taskNo), updatedCard));
    closeModal();
  };

  // ── Delete a card ──
  const handleDelete = (cardId: string) => {
    setColumns(prev => removeCard(prev, cardId));
    closeModal();
  };

  // ── Build modal defaultValues for edit mode ──
  const editDefaults = (): TaskFormData | undefined => {
    if (!modalState.open || modalState.mode !== 'edit') return undefined;
    const { card } = modalState;
    return {
      taskNo:   card.id,
      title:    card.title,
      status:   card.status,
      priority: card.priority,
      dueDate:  card.dueDate ?? '',
    };
  };

  return (
    <>
      <Navbar onCreateClick={() => openCreateModal()} />
      <ProjectHeader />
      <BoardToolbar />
      <BoardPage
        columns={columns}
        onCardEdit={openEditModal}
        onCardDelete={cardId => handleDelete(cardId)}
        onAddCard={columnId => openCreateModal(columnId)}
      />

      {/* ── Modal ── */}
      {modalState.open && modalState.mode === 'create' && (
        <CreateTaskModal
          mode="create"
          taskNumber={getNextTaskNumber(columns)}
          defaultValues={{
            taskNo:   `ERP-${getNextTaskNumber(columns)}`,
            title:    '',
            status:   modalState.defaultStatus,
            priority: 'medium',
            dueDate:  '',
          }}
          onClose={closeModal}
          onSubmit={handleCreate}
        />
      )}

      {modalState.open && modalState.mode === 'edit' && (
        <CreateTaskModal
          mode="edit"
          defaultValues={editDefaults()}
          onClose={closeModal}
          onSubmit={handleEdit}
          onDelete={() => handleDelete(modalState.card.id)}
        />
      )}
    </>
  );
}

export default App;
