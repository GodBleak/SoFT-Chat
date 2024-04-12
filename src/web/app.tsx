import { type Component, Show } from 'solid-js';
import { useAuthentication } from './contexts/authentication';
import { Drawer } from './components/drawer';
import { Navbar } from './components/header';
import { Login } from './views/login';
import { MessageList } from './views/messageList';
import { UserList } from './views/userList';


export const App: Component = () => {
    const authentication = useAuthentication();
    if (!authentication) throw new Error('Authentication context not found');
    const { isAuthenticated, me, logout } = authentication;

    return (<div class='w-screen h-screen bg-base-100'>
        <Show when={isAuthenticated()} fallback={<Login />}>
            <Drawer>
                <Drawer.Content>
                    <Navbar>
                        <Navbar.Start>
                            <Drawer.Button>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </Drawer.Button>
                        </Navbar.Start>
                        <Navbar.Center>
                            <h1 class="text-xl font-bold">SoFT Chat</h1>
                        </Navbar.Center>
                        <Navbar.End>
                            <div class="dropdown dropdown-end">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                                    <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt="Tailwind CSS Navbar component" src={me()?.avatar} />
                                    </div>
                                </div>
                                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
                                    <li><a onClick={logout}>Logout</a></li>
                                </ul>
                            </div>
                        </Navbar.End>
                    </Navbar>
                    <MessageList />
                </Drawer.Content>
                <Drawer.Side>
                    <h2 class="text-center py-2 text-xl">Users</h2>
                    <div class="divider my-0"></div>
                    <UserList />
                </Drawer.Side>
            </Drawer>
        </Show>
    </div>);
};
