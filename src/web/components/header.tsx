import type { ParentComponent } from "solid-js";

interface Navbar extends ParentComponent {
    Start?: ParentComponent;
    Center?: ParentComponent;
    End?: ParentComponent;
}

export const Navbar: Navbar = (props) => {
    return <div class="navbar bg-base-100">
        {props.children}
    </div>
};

Navbar.Start = (props) => {
    return <div class="navbar-start">
        {props.children}
    </div>
}

Navbar.Center = (props) => {
    return <div class="navbar-center">
        {props.children}
    </div>
}

Navbar.End = (props) => {
    return <div class="navbar-end">
        {props.children}
    </div>
}