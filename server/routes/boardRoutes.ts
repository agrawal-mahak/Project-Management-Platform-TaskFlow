import { Router } from "express";
import { getBoards, createBoard } from "../controllers/boardController.js";

const router = Router();

// GET /api/boards  → fetch all boards
router.get("/", getBoards);


router.post("/", createBoard);

export default router;
