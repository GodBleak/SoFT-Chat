import { type Component, createSignal, Show } from "solid-js";
import { useAuthentication } from "../contexts/authentication";
import { Alert } from "../components/alert";

export const Login: Component = () => {
    let email!: HTMLInputElement;
    let password!: HTMLInputElement;
    const [alert, setAlert] = createSignal<{ type: "info" | "success" | "warning" | "error", message: string } | null>(null);
    const [loading, setLoading] = createSignal(false);

    const authentication = useAuthentication();
    if (!authentication) throw new Error('Authentication Context not found');
    const { login, register } = authentication;

    async function doLogin() {
        if (!email.value || !password.value) return setAlert({ type: "error", message: 'Email and password are required' });
        try {
            setLoading(true);
            await login(email.value, password.value);
        } catch (e) {
            console.error(e);

            if (e instanceof Error) setAlert({ type: "error", message: e.message });
            else setAlert({ type: "error", message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    async function doRegistration() {
        if (!email.value || !password.value) return setAlert({ type: "error", message: 'Email and password are required' });
        try {
            setLoading(true);
            const result = await register(email.value, password.value);
            if (result) setAlert({ type: "success", message: 'Account created successfully! You may now login.' });
        } catch (e) {
            console.error(e);

            if (e instanceof Error) setAlert({ type: "error", message: e.message });
            else setAlert({ type: "error", message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    return <div class="w-full h-full flex items-center justify-center">
        <div class="card w-96 bg-base-300 shadow-xl h-min relative">
            <div class="card-body items-center text-center">
                <Show when={alert()}>
                    {(alert) => <div class="absolute top-2 w-full px-2">
                        <Alert type={alert().type} onDismiss={() => setAlert(null)}>{alert().message}</Alert>
                    </div>}
                </Show>
                <h1 class="card-title uppercase mb-4">Login</h1>
                <div class="form-control gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input aria-label="Email" ref={email} type="text" class="grow" placeholder="Email" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
                            <input aria-label="Password" ref={password} type="password" class="grow" placeholder="••••••••" />
                        </label>
                    </div>
                    <div class="w-full">
                        <div class="w-full join justify-center">
                            <button class="btn btn-primary mt-2 join-item" onClick={doLogin} classList={{ "btn-disabled": loading() }} disabled={loading()}>
                                Login
                            </button>
                            <button class="btn btn-secondary mt-2 join-item" onClick={doRegistration} classList={{ "btn-disabled": loading() }} disabled={loading()}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};