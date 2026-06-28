import { model, Schema } from "mongoose";
import type { IBoard } from "../interfaces/IBoard.js";

const BoardSchema = new Schema<IBoard>({
    taskNo: { type: Number, required: true },
    taskName: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    assignedTo: { type: String, required: false },
});

// CHANGE THIS LINE:
export default model<IBoard>("Board", BoardSchema);