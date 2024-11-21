import * as z from "zod";

// Função personalizada para validar uma string de data
const dateString = z.string().refine(
  (val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()); // Verifica se é uma data válida
  },
  {
    message: "Data de serviço inválida",
  },
);

export const createMaintenanceSchema = z.object({
  vehicle_id: z.string().nonempty("ID do veículo é obrigatório"),
  kilometers_at_service: z.number().int().positive(),
  kilometers_next_service: z.number().int().positive(),
  date_of_service: dateString,
  service_coast: z.number(),
  maintenance_type_id: z
    .string()
    .nonempty("ID do tipo de manutenção é obrigatório"),
});

export const editMaintenanceSchema = z.object({
  kilometers_at_service: z.number().int().positive().optional(),
  kilometers_next_service: z.number().int().positive().optional(),
  date_of_service: dateString,
  service_coast: z.number().optional(),
  maintenance_type_id: z.string().optional(),
});
