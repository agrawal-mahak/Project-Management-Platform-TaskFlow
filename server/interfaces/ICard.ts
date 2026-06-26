import type { Document, Types } from "mongoose";

export interface ICard extends Document {
  title: string;
  description?: string;
  listId: Types.ObjectId;
  position: number;
  createdAt: Date;
}