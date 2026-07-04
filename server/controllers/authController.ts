import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Helper: sign a JWT ──────────────────────────────────────────────────────
const signToken = (id: string): string =>
    jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

// ── Helper: build the safe user object (no password) ───────────────────────
const safeUser = (user: any) => ({   // ← ( ) wraps the object — required for arrow functions
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,        // ← createdAt (with 'd'), not createAt
});


// ----google login------
// POST /api/auth/google
// Body: { credential: "<google-id-token>" }

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "No google token provided" })
        }
        // verify the google token — throws if invalid or expired
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID!,  // ! = non-null assertion, env is guaranteed set
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(401).json({ message: "Invalid google token" })
        }

        // Destructure what we need FROM payload (they aren't in scope otherwise)
        const { name, email, sub: googleId } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            // New user — random password (never used, they log in via Google)
            const randomPassword = await bcrypt.hash(googleId + process.env.JWT_SECRET, 10);
            user = await User.create({
                name: name ?? email,   // fallback to email if Google didn't return a name
                email,
                password: randomPassword,
            });
        }

        // Sign your jwt 
        const token = signToken(String(user._id));
        res.status(200).json({
            token,
            user: safeUser(user),
            message: "Login successful"
        });


    } catch (error) {
        console.error("[googleAuth]", error);
        res.status(500).json({ message: "Google authentication failed2" })
    }
}




// POST /api/auth/register

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        //check if user exists
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        // check pswd length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be atleast 8 characters long' })
        }

        // check if email already exi
        const existing = await User.findOne({ email: email })
        if (existing) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // hash password and (salt round 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user in mongodb
        const user = await User.create({
            name, email, password: hashedPassword
        });

        // Sign the jwt
        const token = signToken(String(user._id));
        res.status(201).json({
            token,
            user: safeUser(user),
            message: "User registered successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// login -------

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // validate fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        // check user exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' })
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        // sign jwt
        const token = signToken(String(user._id))
        res.status(200).json({ token, user: safeUser(user), message: "Login successful" })

    }
    catch (error) {
        console.error("[login]", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// get me------------
export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user!.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(user)
    }
    catch (error) {
        console.error("[getMe]", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// ── GET /api/auth/users — list all users (for dropdown) ─────────────────────
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Return only safe fields — never the password hash
        const users = await User.find({}).select('_id name email').lean();
        res.status(200).json(users);
    } catch (error) {
        console.error("[getUsers]", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
