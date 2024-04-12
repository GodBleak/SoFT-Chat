import { Accessor, createSignal, createContext, type ParentComponent, useContext } from "solid-js";
import { useClient } from "./client";
import type { AuthenticationResult } from "@feathersjs/authentication";
import type { User } from "../../client";

interface AuthenticationContextValue {
    isAuthenticated: Accessor<boolean>;
    login: (email: string, password: string) => Promise<AuthenticationResult | null>;
    logout: () => void;
    register: (email: string, password: string) => Promise<RegistrationResult>;
    me: Accessor<User | null>;
}

const AuthenticationContext = createContext<AuthenticationContextValue>();

export const AuthenticationProvider: ParentComponent = (props) => {
    const client = useClient();
    const [isAuthenticated, setIsAuthenticated] = createSignal(false);
    const [me, setMe] = createSignal<User | null>(null);

    async function login(email: string, password: string) {
        if (!client) throw new Error('Client not found');
        const result = await client.authenticate({
            strategy: 'local',
            email,
            password
        });
        if (result) setIsAuthenticated(true);
        if ("user" in result) setMe(result.user);
        return result;
    }

    async function logout() {
        try {
            if (!client) throw new Error('Client not found');
            const result = await client.logout();
            setIsAuthenticated(false);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    async function register(email: string, password: string) {
        if (!client) throw new Error('Client not found');
        const result = await client.service('users').create({
            email,
            password
        });
        return result;
    }

    return <AuthenticationContext.Provider value={{ isAuthenticated, login, logout, register, me }}>
        {props.children}
    </AuthenticationContext.Provider>
};

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
}


type RegistrationResult = {
    password?: string | undefined;
    avatar?: string | undefined;
    email: string;
    id: number;
}