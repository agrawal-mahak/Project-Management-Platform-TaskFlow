// ── Card types ──
export type LabelColor =
  | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'pink';

export interface CardLabel {
  text: string;
  color: LabelColor;
}

export interface Card {
  id: string;         // e.g. "ERP-885"
  title: string;
  label?: CardLabel;
  category?: string;
  dueDate?: string;   // e.g. "Oct 14, 2025"
  isOverdue?: boolean;
  assigneeInitials?: string;
  assigneeColor?: string;
}

// ── Column types ──
export interface Column {
  id: string;
  title: string;
  count?: number;     // shown next to the title
  cards: Card[];
}
