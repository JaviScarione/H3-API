import {z} from 'zod';

export const registerSchema = z.object ({
    name: z.string({required_error: 'Ingresa un nombre.'}),
    lastname: z.string({required_error: 'Ingresa un apellido.'}),
    email: z.string({required_error: 'Ingresa un email.'}).email({message: 'El email es inválido.'}),
    password: z.string({required_error: 'Ingresa una contraseña.'}).min(6, {message: 'La contraseña debe tener al menos 6 caracteres.'})
});

export const loginSchema = z.object({
    email: z.string({required_error: 'El email es requerido.'}).email({message: 'Credenciales inválidas.'}),
    password: z.string({required_error: 'La contraseña es requerida.'}).min(6, {message: 'Credenciales inválidas.'})
});