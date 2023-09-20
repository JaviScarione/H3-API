import Client from "../models/client.model.js"
import Envases from "../models/envases.model.js"


export const getClients = async (req, res) => {
    const envases = await Envases.find().populate('client')
    res.json(envases)
};

export const createClient = async (req, res) => {
    const { name, address, phone, day, cuit, h320, h312, lgm, lgbs, soda, fc } = req.body;

    const newClient = new Client ({ name, address, phone, day, cuit, user: req.user.id });
    const savedClient = await newClient.save();
    
    const newEnvases = new Envases ({ h320, h312, lgm, lgbs, soda, fc, client: savedClient._id })
    const savedEnvases = await newEnvases.save();
    console.log(savedEnvases);
    res.json({savedClient, savedEnvases});
};

export const getClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json({message: 'Cliente no encontrado'})
    res.json(client)
};

export const deleteClient = async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) return res.status(404).json({message: 'Cliente no encontrado'})
    res.sendStatus(204);
};

export const updateClient = async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!client) return res.status(404).json({message: 'Cliente no encontrado'})
    res.json(client)
};