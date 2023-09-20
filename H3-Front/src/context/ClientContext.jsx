import { createContext, useContext, useState } from "react";
import {createClientRequest, getClientsRequest} from '../api/clients';

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
        const res = await createClientRequest(client)
        console.log(res);
    }

    const getClients = async () => {
        try {
            const res = await getClientsRequest()
            setClients(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ClientContext.Provider value={{clients, createClient, getClients}}>
            {children}
        </ClientContext.Provider>
    )
}

ClientProvider.propTypes = {
    children: PropTypes.node.isRequired
};