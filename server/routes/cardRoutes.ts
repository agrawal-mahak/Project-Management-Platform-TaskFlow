import { Router } from "express";
import { getCards, createCard, getCardById, deleteCard, updateCard } from "../controllers/cardController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

// Apply protect middleware to all card routes
router.use(protect);

// GET  /api/cards          → fetch all cards (with pagination & search)
router.get("/", getCards);

// GET  /api/cards/:cardId  → fetch a single card
router.get("/:cardId", getCardById);

// POST /api/cards          → create a new card (Only managers and admins can create)
router.post("/", authorizeRoles('manager', 'admin'), createCard);

// DELETE /api/cards/:cardId → delete a card (Only managers and admins can delete)
router.delete("/:cardId", authorizeRoles('manager', 'admin'), deleteCard);

// PUT /api/cards/:cardId → update a card
router.put("/:cardId", updateCard);

export default router;
