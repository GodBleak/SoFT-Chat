import { type Component, createSignal, For, onMount, onCleanup } from "solid-js";
import type { Message } from "../../client";
import { ChatBubble } from "../components/chatBubble";
import { useClient } from "../contexts/client";
import { useAuthentication } from "../contexts/authentication";

export const MessageList: Component = () => {
    let messageInput!: HTMLInputElement;
    const [messages, setMessages] = createSignal<Message[]>([])
    const client = useClient();
    if (!client) throw new Error('Client not found');

    const authentication = useAuthentication();
    if (!authentication) throw new Error('Authentication context not found');
    const { me } = authentication;

    const messagesService = client.service('messages')
    messagesService.on("created", addMessage);

    onMount(async () => {
        const messages = await messagesService.find({
            query: {
                $sort: { createdAt: -1 },
                $limit: 25
            }
        });
        setMessages(messages.data.reverse());
    })

    onCleanup(() => {
        messagesService.removeListener("created", addMessage);
    })


    function addMessage(message: Message) {
        setMessages(prev => [...prev, message]);
    }

    function sendMessage() {
        const message = messageInput.value;
        if (!message.length) return;
        messagesService.create({ text: message });
        messageInput.value = '';
    }

    return <>
        <div class="w-full h-full p-4 overflow-y-scroll">
            <For each={messages()}>
                {(message) => <ChatBubble avatar={message.user.avatar} date={message.createdAt} username={message.user.email} direction={message.userId === me()?.id ? "end" : "start"}>
                    {message.text}
                </ChatBubble>}
            </For>
        </div>
        <div class="w-full p-2 join">
            <input ref={messageInput} type="text" class="input input-ghost w-full join-item input-bordered" placeholder="Type a message..." />
            <button class="btn join-item btn-outline btn-ghost" onClick={sendMessage}>Send</button>
        </div>
    </>
};