import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors.map((err) => err.message) })

      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}
