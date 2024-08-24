import * as z from 'zod';

// Função personalizada para validar uma string de data
const dateString = z.string().refine((val) => {
  const date = new Date(val);
  return !isNaN(date.getTime()); // Verifica se é uma data válida
}, {
  message: "Data de serviço inválida"
});

export const createMaintenanceSchema = z.object({
  vehicleId: z.string().nonempty('ID do veículo é obrigatório'),
  kilometersAtService: z.number().int().positive(),
  kilometersNextService: z.number().int().positive(),
  dateOfService: dateString,
  serviceCoast: z.number(),
  maintenanceTypeId: z.string().nonempty('ID do tipo de manutenção é obrigatório')
});
