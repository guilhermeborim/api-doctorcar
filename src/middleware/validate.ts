import { NextFunction, Request, Response } from "express";
import { z, ZodError, ZodIssue } from "zod";

export function validateData(schema: z.AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const formattedError = formatZodError(error);

        return res.status(400).json({ message: formattedError });
      }
    }
  };
}

const formatZodIssue = (issue: ZodIssue): string => {
  const { message } = issue;

  return `${message}`;
};

export const formatZodError = (error: ZodError): string => {
  const { issues } = error;

  if (issues.length) {
    return issues.map(formatZodIssue).join(", ");
  }

  return "Invalid input data";
};
