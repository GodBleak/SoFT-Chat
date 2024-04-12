import { createContext, useContext, type ParentComponent } from "solid-js";
import { isServer } from 'solid-js/web';
import { createClient, type ClientApplication } from "../../client";
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const ClientContext = createContext<ClientApplication>()

export const ClientProvider: ParentComponent = (props) => {
    const hostAddress = isServer ? "http://localhost:3030" : `${window?.location.hostname}:${window?.location.port}`
    const socket = io(hostAddress);
    const connection = socketio(socket);
    const client = createClient(connection);

    return <ClientContext.Provider value={client}>
        {props.children}
    </ClientContext.Provider>
};

export const useClient = () => {
    return useContext(ClientContext);
};