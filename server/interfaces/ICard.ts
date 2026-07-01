import type { Document } from "mongoose";

export interface ICard extends Document {
  taskNo:     number;
  taskName:   string;
  status:     string;
  priority:   string;
  startDate:  Date;
  endDate:    Date;
  assignedTo: string;
}