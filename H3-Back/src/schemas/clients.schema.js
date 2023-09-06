import {z} from 'zod';

export const createClientSchema = z.object ({
    name: z.string({required_error: 'Ingresa un nombre.'}),
    address: z.string({required_error: 'Ingresa una dirección.'}),
    phone: z.number({required_error: 'Ingresa un teléfono.', invalid_type_error: 'El teléfono debe ser numérico'}),
    day: z.string({required_error: 'Selecciona un día de reparto.'}),
    cuit: z.number({invalid_type_error: 'El teléfono debe ser numérico'}).optional()
});