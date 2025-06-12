import { NextFunction, Request, Response } from 'express';
import { getIronSession } from 'iron-session';

import { ironOptions, JumperSession } from '../../shared';

declare module 'express' {
  interface Locals {
    isBackend?: boolean;
    iron?: JumperSession;
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.isBackend = false;

  // Check for backend API token
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === process.env.BACKEND_API_TOKEN) {
      res.locals.isBackend = true;
      return next();
    }
  }

  // Check for iron session
  try {
    const session = await getIronSession<JumperSession>(req, res, ironOptions);
    if (session) {
      res.locals.iron = session;
    }
  } catch (error) {
    console.error('Error reading iron session:', error);
  }

  next();
};

export default authMiddleware;
