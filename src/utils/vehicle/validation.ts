import * as z from 'zod';

const currentYear = new Date().getFullYear();

export const createVehicleSchema = z.object({
  brandId: z.string({
    required_error: 'A marca é obrigatória',
  }),
  model: z.string({
    required_error: 'O modelo é obrigatório',
  }).min(3, 'O modelo deve ter pelo menos 3 caracteres'),
  licensePlate: z.string({
    required_error: 'A placa é obrigatória',
  }).min(7, 'A placa deve ter 7 caracteres').max(7, 'A placa deve ter 7 caracteres'),
  year: z.number({
    required_error: 'O ano é obrigatório',
  }).int().refine((val) => val >= 1886 && val <= currentYear, {
    message: `O ano deve estar entre 1886 e ${currentYear}`,
  }),
  kilometersDriven: z.number({
    required_error: 'Os quilômetros rodados são obrigatórios',
  }).int().min(0, 'Os quilômetros rodados devem ser maior ou igual a 0'),
  dailyMileage: z.number({
    required_error: 'Os quilômetros diários rodados são obrigatórios',
  }).int().min(0, 'Os quilômetros rodados diários devem ser maior ou igual a 0'),
  stateVehicleId: z.string({
    required_error: 'O estado do veículo é obrigatório',
  }),
})

export const editVehicleSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres').optional(),
  brandId: z.string().optional(),
  model: z.string().min(3, 'O modelo deve ter pelo menos 3 caracteres').optional(),
  licensePlate: z.string().min(7, 'A placa deve 7 caracteres').max(7).optional(),
  year: z.number().int().optional(),
  kilometersDriven: z.number().int().min(0, 'Os quilômetros rodados devem ser maior ou igual a 0').optional(),
  dailyMileage: z.number().int().min(0, 'Os quilômetros rodados diários devem ser maior ou igual a 0').optional(),
  stateVehicleId: z.string().optional(),
})