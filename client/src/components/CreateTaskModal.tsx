import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import type { TaskFormData } from '../types';
import { fetchUsers } from '../api/authApi';
import '../modal.css';

// ── Static options ──
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
  mode: 'create' | 'edit';
  defaultValues?: TaskFormData;   // pre-filled when editing
  taskNumber?: number;            // used only in create mode
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  onDelete?: () => void;          // only shown in edit mode
}

const CreateTaskModal = ({ mode, defaultValues, taskNumber, onClose, onSubmit, onDelete }: Props) => {
  const isEdit = mode === 'edit';

  // ── react-hook-form setup ──
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: defaultValues ?? {
      taskNo:     `ERP-${taskNumber ?? 1201}`,
      title:      '',
      status:     'todo',
      priority:   'medium',
      dueDate:    '',
      assignedTo: '',
    },
  });

  // Watch pill fields so the UI reacts to their value
  const selectedStatus   = watch('status');
  const selectedPriority = watch('priority');

  // Register hidden fields for status + priority so RHF tracks them
  register('status',   { required: true });
  register('priority', { required: true });
  register('taskNo');

  const taskNo = watch('taskNo');

  // ── Fetch users for dropdown ──
  const [users, setUsers] = useState<{ _id: string; name: string; email: string }[]>([]);
  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  // Close when clicking the backdrop
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">

        {/* ── Header ── */}
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Task' : 'Create Task'}</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Delete button — edit mode only */}
            {isEdit && onDelete && (
              <button
                className="modal-delete-btn"
                onClick={onDelete}
                title="Delete task"
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
                Delete
              </button>
            )}

            <button className="modal-close-btn" onClick={onClose} type="button" title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">

            {/* Task No — read-only badge */}
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
              <label className="form-label" htmlFor="task-title">
                Title <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <input
                id="task-title"
                className={`form-input ${errors.title ? 'input-error' : ''}`}
                type="text"
                placeholder="What needs to be done?"
                autoFocus
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <span className="field-error">{errors.title.message}</span>
              )}
            </div>

            {/* Status + Priority — two columns */}
            <div className="form-row">

              {/* Status pills */}
              <div className="form-field">
                <label className="form-label">Status</label>
                <div className="pill-group">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`pill status-${opt.value} ${selectedStatus === opt.value ? 'selected' : ''}`}
                      onClick={() => setValue('status', opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority pills */}
              <div className="form-field">
                <label className="form-label">Priority</label>
                <div className="pill-group">
                  {PRIORITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`pill priority-${opt.value} ${selectedPriority === opt.value ? 'selected' : ''}`}
                      onClick={() => setValue('priority', opt.value)}
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
                {...register('dueDate')}
              />
            </div>

            {/* Assigned To */}
            <div className="form-field">
              <label className="form-label" htmlFor="task-assigned">
                Assigned To
              </label>
              <select
                id="task-assigned"
                className="form-input"
                {...register('assignedTo')}
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user._id} value={user.name}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
