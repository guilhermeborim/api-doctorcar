import * as z from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(4, "A senha deve ter pelo menos 4 caracteres"),
  profilePicture: z
    .string()
    .url("A URL da imagem de perfil é inválida")
    .optional(),
});

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(4, "A senha deve ter pelo menos 4 caracteres"),
});

export const changePasswordUserSchema = z.object({
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email("Email inválido"),
  oldPassword: z.string({
    required_error: "A senha antiga é obrigatória",
  }),
  newPassword: z
    .string({
      required_error: "A nova senha é obrigatória",
    })
    .min(4, "A nova senha deve ter pelo menos 4 caracteres"),
});
