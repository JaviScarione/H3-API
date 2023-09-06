import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getClients, createClient, getClient, updateClient, deleteClient } from '../controllers/clients.controller.js';
import { validateSchema } from '../middlewares/validator.middlware.js';
import { createClientSchema } from "../schemas/clients.schema.js";


const router = Router()

router.get('/clients', authRequired, getClients);

router.get('/clients/:id', authRequired, getClient);

router.post('/clients', authRequired, validateSchema(createClientSchema), createClient);

router.delete('/clients/:id', authRequired, deleteClient);

router.put('/clients/:id', authRequired, updateClient);

export default router