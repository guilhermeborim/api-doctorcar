import { Request, Response } from "express";

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    }).json({ message: 'Usuário deslogado' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deslogar usuário' });
  }
}