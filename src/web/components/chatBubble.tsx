import type { JSX, Component } from "solid-js";

interface ChatBubbleProps {
    children: JSX.Element;
    date: Date | string | number;
    username: string;
    avatar: string;
    direction?: "start" | "end";
}

export const ChatBubble: Component<ChatBubbleProps> = (props) => {
    const dateFormat = new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: 'numeric' }).format;
    return <div class="chat group" classList={{ "chat-start": props.direction === "start", "chat-end": props.direction === "end" }}>
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img alt={`${props.username} avatar`} src={props.avatar} />
            </div>
        </div>
        <div class="chat-header inline-flex items-center gap-2">
            {props.username}
            <time class="text-xs opacity-50 hidden group-hover:block">{dateFormat(new Date(props.date))}</time>
        </div>
        <div class="chat-bubble">{props.children}</div>
    </div>
};