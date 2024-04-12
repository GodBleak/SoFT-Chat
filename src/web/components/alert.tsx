import { type Component, Match, Switch } from "solid-js";

interface AlertProps {
    children: string;
    type: "info" | "success" | "warning" | "error";
    onDismiss?: () => void;
}

export const Alert: Component<AlertProps> = (props) => {
    return <div role="alert" class="alert w-full" classList={{ "alert-info": props.type === "info", "alert-success": props.type === "success", "alert-warning": props.type === "warning", "alert-error": props.type === "error" }}>
        <Switch>
            <Match when={props.type === "info"}>
                <Icon.Info />
            </Match>
            <Match when={props.type === "success"}>
                <Icon.Success />
            </Match>
            <Match when={props.type === "warning"}>
                <Icon.Warning />
            </Match>
            <Match when={props.type === "error"}>
                <Icon.Error />
            </Match>
        </Switch>

        <span>{props.children}</span>
        <div>
            <button onClick={() => props.onDismiss?.()} class="btn btn-sm btn-ghost btn-outline" classList={{ "text-info-content": props.type === "info", "text-success-content": props.type === "success", "text-warning-content": props.type === "warning", "text-error-content": props.type === "error" }}>Dismiss</button>
        </div>
    </div>
};

const Icon = {
    Info: () => {
        return <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    },
    Success: () => {
        return <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    Warning: () => {
        return <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    },
    Error: () => {
        return <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
}
