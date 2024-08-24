import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { prisma } from '../../../prisma';

const saltRounds = 10;

export const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário nao existe' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha antiga incorreta' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword },
    });

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Senha alterada com sucesso, faça o login novamente' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};