import type { Column } from '../types';
import KanbanColumn from '../components/KanbanColumn';

// ── Mock data matching the screenshot ──
const COLUMNS: Column[] = [
  {
    id: 'draft',
    title: 'Draft',
    cards: [],
  },
  {
    id: 'todo',
    title: 'To Do',
    count: 4,
    cards: [
      {
        id: 'ERP-885',
        title: 'Enable Import functionality for additional Modules',
        label: { text: 'SALES INVOICE', color: 'red' },
        category: 'general',
        dueDate: 'Oct 14, 2025',
        isOverdue: true,
        assigneeInitials: 'D',
        assigneeColor: '#2d8a4e',
      },
      {
        id: 'ERP-1146',
        title: 'Contact Person dropdown incomplete in Tickets',
        category: 'Ticket',
        assigneeInitials: 'EY',
        assigneeColor: '#2d8a4e',
      },
      {
        id: 'ERP-1149',
        title: 'Linked Record validation shows errors one at a time on Delete',
        category: 'general',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    count: 16,
    cards: [
      {
        id: 'ERP-1001',
        title: 'Unify numbering system for Sales & Purchase records',
        label: { text: 'SALES INVOICE', color: 'red' },
        category: 'general',
        assigneeInitials: 'EY',
        assigneeColor: '#2d8a4e',
      },
      {
        id: 'ERP-1075',
        title: 'Auto-fill Discounts from Company settings',
        label: { text: 'COMPANY MANAGEMENT', color: 'purple' },
        category: 'company',
        dueDate: 'May 7, 2026',
        isOverdue: true,
        assigneeInitials: 'EY',
        assigneeColor: '#2d8a4e',
      },
      {
        id: 'ERP-1101',
        title: 'Add active/inactive toggle for Inventory Items',
        category: 'Inventory',
      },
      {
        id: 'ERP-1023',
        title: 'Fix pagination on Reports module',
        label: { text: 'BUG', color: 'orange' },
        category: 'general',
        assigneeInitials: 'LK',
        assigneeColor: '#2d6ab0',
      },
    ],
  },
  {
    id: 'revision',
    title: 'Revision Needed',
    cards: [
      {
        id: 'ERP-988',
        title: 'Update tax calculation logic for multi-currency invoices',
        label: { text: 'SALES INVOICE', color: 'red' },
        category: 'general',
        dueDate: 'Mar 12, 2026',
        isOverdue: true,
      },
    ],
  },
  {
    id: 'intest',
    title: 'In Test',
    count: 127,
    cards: [
      {
        id: 'ERP-1117',
        title: 'Duplicate tooltip shown on hover',
        category: 'general',
        assigneeInitials: 'EY',
        assigneeColor: '#2d8a4e',
      },
      {
        id: 'ERP-1200',
        title: 'List View Column Order Not Saved After Reordering',
        label: { text: 'COMPANY MANAGEMENT', color: 'purple' },
        category: 'general',
        dueDate: 'Oct 22, 2025',
        isOverdue: true,
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    count: 8,
    cards: [
      {
        id: 'ERP-910',
        title: 'Make service fee editable using html input',
        label: { text: 'SERVICE FEE', color: 'teal' },
        category: 'Service-',
        dueDate: 'Jan 1, 2025',
      },
      {
        id: 'ERP-874',
        title: 'Export to PDF button missing on mobile view',
        label: { text: 'BUG', color: 'orange' },
        category: 'general',
        assigneeInitials: 'MA',
        assigneeColor: '#c43c3c',
      },
    ],
  },
];

const BoardPage = () => {
  return (
    <div className="board">
      {COLUMNS.map(column => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  );
};

export default BoardPage;
