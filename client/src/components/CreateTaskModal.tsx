import { useState } from 'react';
import '../modal.css';

// ── Options ──
const STATUS_OPTIONS = [
  { value: 'draft',      label: 'Draft'       },
  { value: 'todo',       label: 'To Do'       },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'intest',     label: 'In Test'     },
  { value: 'done',       label: 'Done'        },
];

const PRIORITY_OPTIONS = [
  { value: 'easy',   label: 'Easy'   },
  { value: 'medium', label: 'Medium' },
  { value: 'high',   label: 'High'   },
  { value: 'urgent', label: 'Urgent' },
];

interface Props {
  taskNumber: number;  // e.g. 1201 → "ERP-1201"
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
}

export interface TaskFormData {
  taskNo: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
}

const CreateTaskModal = ({ taskNumber, onClose, onSubmit }: Props) => {
  const [title,    setTitle]    = useState('');
  const [status,   setStatus]   = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate,  setDueDate]  = useState('');

  const taskNo = `ERP-${taskNumber}`;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ taskNo, title: title.trim(), status, priority, dueDate });
    onClose();
  };

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create Task</h2>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Auto-generated task number */}
          <div className="form-field">
            <label className="form-label">Task No.</label>
            <div className="task-number-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <polyline points="9 11 12 14 22 4" stroke="#22272b" strokeWidth="2.5" fill="none" />
              </svg>
              <span>{taskNo}</span>
            </div>
          </div>

          {/* Title */}
          <div className="form-field">
            <label className="form-label" htmlFor="task-title">Title</label>
            <input
              id="task-title"
              className="form-input"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Status + Priority in two columns */}
          <div className="form-row">

            {/* Status */}
            <div className="form-field">
              <label className="form-label">Status</label>
              <div className="pill-group">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`pill status-${opt.value} ${status === opt.value ? 'selected' : ''}`}
                    onClick={() => setStatus(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="form-field">
              <label className="form-label">Priority</label>
              <div className="pill-group">
                {PRIORITY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`pill priority-${opt.value} ${priority === opt.value ? 'selected' : ''}`}
                    onClick={() => setPriority(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Due Date */}
          <div className="form-field">
            <label className="form-label" htmlFor="task-date">Due Date</label>
            <input
              id="task-date"
              className="form-input"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Create Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTaskModal;
