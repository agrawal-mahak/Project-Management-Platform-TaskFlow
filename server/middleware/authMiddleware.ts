// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload { id: string; }

// export const protect = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   // req.headers is an OBJECT — use it to read the authorization header
//   const authHeader = req.headers.authorization;

//   // Authorization header format: "Bearer <token>"
//   const token = authHeader?.split(' ')[1]; // split on SPACE, take index 1

//   if (!token) {
//     res.status(401).json({ message: "No token provided" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//     req.user = { id: decoded.id };
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload { id: string; }

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ message: 'No token' }); return; }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
