import type { Document, Types } from "mongoose";

export interface IBoard extends Document {
  title: string;
  userId: Types.ObjectId;
  createdAt: Date;
}