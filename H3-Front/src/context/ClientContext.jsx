import { createContext, useContext, useState } from "react";
import {createClientRequest, getClientsRequest, deleteClientRequest, getClientRequest, updateClientRequest} from '../api/clients';

import PropTypes from 'prop-types';


const ClientContext = createContext();

export const useClient = () => {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error("useClient must be used an AuthProvider")
    }
    return context;

}

export function ClientProvider({ children }) {

    const [clients, setClients] = useState([]);

    const createClient = async (client) => {
        try {
            await createClientRequest(client)
        } catch (error) {
            console.error(error);
        }
    }

    const getClients = async () => {
        try {
            const res = await getClientsRequest()
            setClients(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteClient = async (id) => {
        try {
            const res = await deleteClientRequest(id);            
            if (res.status == 204 ) setClients(clients.filter(client => client.client._id !== id));            
        } catch (error) {
            console.error(error);
        }
    }

    const getClient = async (id) => {
        try {
            const res = await getClientRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateClient = async (id, client) => {
        try {
            await updateClientRequest(id, client)            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ClientContext.Provider value={{clients, createClient, getClients, deleteClient, getClient, updateClient}}>
            {children}
        </ClientContext.Provider>
    )
}

ClientProvider.propTypes = {
    children: PropTypes.node.isRequired
};