import Client from "../models/client.model.js"

export const getClients = async (req, res) => {
    const clients = await Client.find({ user: req.user.id}).populate('user')
    res.json(clients)
};

export const createClient = async (req, res) => {
    const { name, address, phone, day, cuit } = req.body;

    const newClient = new Client ({ name, address, phone, day, cuit, user: req.user.id });
    const savedClient = await newClient.save();
    res.json(savedClient);
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