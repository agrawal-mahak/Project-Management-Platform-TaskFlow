import { Router } from "express";
import { getCards, createCard, getCardById, deleteCard } from "../controllers/cardController.js";

const router = Router();

// GET  /api/cards          → fetch all cards (with pagination & search)
router.get("/", getCards);

// GET  /api/cards/:cardId  → fetch a single card
router.get("/:cardId", getCardById);

// POST /api/cards          → create a new card
router.post("/", createCard);

// DELETE /api/cards/:cardId → delete a card
router.delete("/:cardId", deleteCard);

export default router;
