import type { Document, Types } from "mongoose";

export interface IBoard extends Document {
  taskNo: number;
  taskName: string;
  status: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  assignedTo: string;
}