import { type Component, createSignal, For, onMount, onCleanup, Show } from "solid-js";
import type { User } from "../../client";
import { useClient } from "../contexts/client";
import { useAuthentication } from "../contexts/authentication";

export const UserList: Component = () => {
    const [users, setUsers] = createSignal<User[]>([])
    const client = useClient();

    if (!client) throw new Error('Client not found');
    const authentication = useAuthentication();
    if (!authentication) throw new Error('Authentication context not found');
    const { me } = authentication;

    const userService = client.service('users')
    userService.on("created", addUser);

    onMount(async () => {
        const users = await userService.find();
        setUsers(users.data);
    })

    onCleanup(() => {
        userService.removeListener("created", addUser);
    })

    function addUser(user: User) {
        setUsers(prev => [...prev, user]);
    }

    return <ul class="menu p-4 w-80 h-fit text-base-content gap-2">
        <For each={users()}>
            {(user) => <div class="card card-compact card-side bg-base-100 shadow-xl">
                <div class="card-body flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center gap-2">
                        <div class="w-8 h-8">
                            <figure class="avatar"><img class="rounded-full" src={user.avatar} alt={`${user.email}'s avatar`} /></figure>
                        </div>
                        {user.email}
                    </div>
                    <Show when={user.id === me()?.id}>
                        <div class="badge badge-primary">You</div>
                    </Show>
                </div>
            </div>}
        </For>
    </ul>
};