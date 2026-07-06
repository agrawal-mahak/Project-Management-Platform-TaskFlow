import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload { id: string; role: string; }

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ message: 'No token' }); return; }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied: insufficient permissions' });
      return;
    }
    next();
  };
};
