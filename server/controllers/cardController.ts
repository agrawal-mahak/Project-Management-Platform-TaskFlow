import { type Request, type Response } from "express";
import Card from "../models/Card.js";

// ── GET /api/cards ──────────────────────────────────────────────────────────
export const getCards = async (req: Request, res: Response) => {
    try {
        const { search, page, limit } = req.query;
        console.log(`[GET /api/cards] Query params → search: "${search || ''}", page: ${page || 1}, limit: ${limit || 10}`);

        let query = {};
        if (search) {
            query = { taskName: { $regex: search, $options: "i" } };
            console.log(`[GET /api/cards] Applying search filter: "${search}"`);
        }

        const pageNumber  = parseInt(page  as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip        = (pageNumber - 1) * limitNumber;

        const totalCards = await Card.countDocuments(query);
        console.log(`[GET /api/cards] Total matching cards: ${totalCards}`);

        const cards = await Card.find(query).skip(skip).limit(limitNumber);

        if (cards.length === 0) {
            console.log(`[GET /api/cards] No cards found — returning empty result`);
            return res.status(200).json({
                meta: {
                    totalItems:  0,
                    totalPages:  0,
                    currentPage: pageNumber,
                    limit:       limitNumber
                },
                data: []
            });
        }

        console.log(`[GET /api/cards] Returning ${cards.length} cards (page ${pageNumber})`);

        return res.status(200).json({
            meta: {
                totalItems:  totalCards,
                totalPages:  Math.ceil(totalCards / limitNumber),
                currentPage: pageNumber,
                limit:       limitNumber
            },
            data: cards
        });

    } catch (error) {
        console.error(`[GET /api/cards] Error:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ── POST /api/cards ─────────────────────────────────────────────────────────
export const createCard = async (req: Request, res: Response) => {
    try {
        console.log(`[POST /api/cards] Creating card with data:`, req.body);
        const newCard = new Card(req.body);
        await newCard.save();
        console.log(`[POST /api/cards] Card created successfully → ID: ${newCard._id}`);
        return res.status(201).json(newCard);
    } catch (error: any) {
        if (error.name === "ValidationError") {
            const errors = Object.keys(error.errors).map(key => {
                const errorDetails = error.errors[key];
                if (errorDetails.name === "CastError") {
                    return { field: key, message: `${key} must be a valid ${errorDetails.kind}` };
                }
                return { field: key, message: errorDetails.message };
            });
            return res.status(400).json({ message: "Validation failed", errors });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ── GET /api/cards/:cardId ──────────────────────────────────────────────────
export const getCardById = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        console.log(`[GET /api/cards/${cardId}] Fetching card by ID`);
        const card = await Card.findById(cardId);
        if (!card) {
            console.log(`[GET /api/cards/${cardId}] Card not found`);
            return res.status(404).json({ message: "Card not found" });
        }
        console.log(`[GET /api/cards/${cardId}] Card found → "${card.taskName ?? cardId}"`);
        return res.status(200).json(card);
    } catch (error) {
        console.error(`[GET /api/cards/:cardId] Error:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ── DELETE /api/cards/:cardId ───────────────────────────────────────────────
export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        console.log(`[DELETE /api/cards/${cardId}] Attempting to delete card`);
        const card = await Card.findByIdAndDelete(cardId);
        if (!card) {
            console.log(`[DELETE /api/cards/${cardId}] Card not found`);
            return res.status(400).json({ message: "Card not found" });
        }
        console.log(`[DELETE /api/cards/${cardId}] Card deleted successfully`);
        return res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(`[DELETE /api/cards/:cardId] Error:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
