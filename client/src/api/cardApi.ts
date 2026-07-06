import axiosInstance from "./axiosInstance";
import type { Card, TaskFormData } from "../types";

// ── Map backend document → frontend Card ────────────────────────────────────
export const toCard = (doc: any): Card => ({
  id: `ERP-${doc.taskNo}`,
  _mongoId: doc._id,
  title: doc.taskName,
  status: doc.status,
  priority: doc.priority,
  dueDate: doc.endDate ? String(doc.endDate).slice(0, 10) : undefined,
  assignedTo: doc.assignedTo,
  assigneeInitials: doc.assignedTo
    ? doc.assignedTo.split(' ').map((w: string) => w[0]?.toUpperCase()).join('').slice(0, 2)
    : undefined,
  imageUrl: doc.imageUrl,
});

// ── Map frontend TaskFormData → backend request body ────────────────────────
const toApiBody = (data: TaskFormData) => ({
  taskNo: parseInt(data.taskNo.replace('ERP-', ''), 10),
  taskName: data.title,
  status: data.status,
  priority: data.priority,
  startDate: new Date().toISOString(),
  endDate: data.dueDate ? new Date(data.dueDate).toISOString() : new Date().toISOString(),
  assignedTo: data.assignedTo || 'Unassigned',
});

// ── GET /api/cards — fetch all, returns mapped Card[] ───────────────────────
export const fetchCards = async (): Promise<Card[]> => {
  const res = await axiosInstance.get('/cards', { params: { limit: 100 } });
  return (res.data.data as any[]).map(toCard);
};

// ── GET /api/cards/:id — fetch single card ─────────────────────────────────
export const fetchCardById = async (mongoId: string): Promise<Card> => {
  const res = await axiosInstance.get(`/cards/${mongoId}`);
  return toCard(res.data);
};

// ── POST /api/cards — create a card ─────────────────────────────────────────
export const createCard = async (data: TaskFormData): Promise<Card> => {
  if (data.image) {
    const formData = new FormData();
    formData.append('taskNo', data.taskNo.replace('ERP-', ''));
    formData.append('taskName', data.title);
    formData.append('status', data.status);
    formData.append('priority', data.priority);
    formData.append('startDate', new Date().toISOString());
    formData.append('endDate', data.dueDate ? new Date(data.dueDate).toISOString() : new Date().toISOString());
    formData.append('assignedTo', data.assignedTo || 'Unassigned');
    formData.append('image', data.image);

    const res = await axiosInstance.post('/cards', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return toCard(res.data);
  } else {
    const res = await axiosInstance.post('/cards', toApiBody(data));
    return toCard(res.data);
  }
};

// ── PUT /api/cards/:id — update a card (all fields) ─────────────────────────
export const updateCard = async (mongoId: string, data: TaskFormData): Promise<void> => {
  if (data.image) {
    const formData = new FormData();
    formData.append('taskNo', data.taskNo.replace('ERP-', ''));
    formData.append('taskName', data.title);
    formData.append('status', data.status);
    formData.append('priority', data.priority);
    formData.append('startDate', new Date().toISOString());
    formData.append('endDate', data.dueDate ? new Date(data.dueDate).toISOString() : new Date().toISOString());
    formData.append('assignedTo', data.assignedTo || 'Unassigned');
    formData.append('image', data.image);

    await axiosInstance.put(`/cards/${mongoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } else {
    await axiosInstance.put(`/cards/${mongoId}`, toApiBody(data));
  }
};

// ── PUT /api/cards/:id — status-only update (for drag-and-drop) ─────────────
// Sends the full card payload with just status changed so validators pass
export const patchCardStatus = async (card: Card, newStatus: string): Promise<void> => {
  await axiosInstance.put(`/cards/${card._mongoId}`, {
    taskNo: parseInt(card.id.replace('ERP-', ''), 10),
    taskName: card.title,
    status: newStatus,
    priority: card.priority,
    startDate: new Date().toISOString(),
    endDate: card.dueDate ? new Date(card.dueDate).toISOString() : new Date().toISOString(),
    assignedTo: card.assignedTo || 'Unassigned',
  });
};

// ── DELETE /api/cards/:id — delete a card ───────────────────────────────────
export const deleteCard = async (mongoId: string): Promise<void> => {
  await axiosInstance.delete(`/cards/${mongoId}`);
};