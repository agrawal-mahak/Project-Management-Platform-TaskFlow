// ── Card types ──
export type LabelColor =
  | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'pink';

export interface CardLabel {
  text: string;
  color: LabelColor;
}

export interface Card {
  id: string;           // display ID — e.g. "ERP-885"
  _mongoId?: string;    // MongoDB _id — used for update/delete API calls
  title: string;
  status: string;       // 'draft' | 'todo' | 'inprogress' | 'revision' | 'intest' | 'done'
  priority: string;     // 'easy' | 'medium' | 'high' | 'urgent'
  dueDate?: string;     // ISO date string "YYYY-MM-DD"
  label?: CardLabel;
  category?: string;
  isOverdue?: boolean;
  assigneeInitials?: string;
  assigneeColor?: string;
  assignedTo?: string;
  assignedUserId?: string;
  imageUrl?: string;
}

// ── Column types ──
export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

// ── Form data (used by react-hook-form) ──
export interface TaskFormData {
  taskNo:     string;
  title:      string;
  status:     string;
  priority:   string;
  dueDate:    string;
  assignedTo: string;   // visible field in the Create/Edit modal
  image?:     File | null; // For the upload form
  currentImageUrl?: string;
}
