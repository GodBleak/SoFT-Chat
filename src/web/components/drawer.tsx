import type { ParentComponent } from "solid-js";

interface Drawer extends ParentComponent {
    Side?: ParentComponent;
    Button?: ParentComponent;
    Content?: ParentComponent;
}

export const Drawer: Drawer = (props) => {
    return <div class="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        {props.children}
    </div>
};

Drawer.Side = (props) => {
    return <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="bg-base-200 h-full">
            {props.children}
        </div>
    </div>
}

Drawer.Button = (props) => {
    return <label for="my-drawer-2" tabindex="0" role="button" class="btn btn-ghost btn-circle lg:hidden">
        {props.children}
    </label>
}

Drawer.Content = (props) => {
    return <div class="drawer-content flex flex-col max-h-screen">
        {props.children}
    </div>
}