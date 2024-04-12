import { type Component, onMount } from "solid-js";

interface ErrorModalProps {
    error: Error;
    reset: () => void;
}

export const ErrorModal: Component<ErrorModalProps> = (props) => {
    let dialog!: HTMLDialogElement;

    onMount(() => {
        console.error(props.error);
        dialog.showModal();
    })

    function close() {
        props.reset();
        dialog.close();
    }

    return <dialog ref={dialog} id="my_modal_1" class="modal">
        <div class="modal-box min-h-1">
            <h3 class="font-bold text-lg text-error whitespace-nowrap inline-flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Error!
            </h3>
            <p class="py-4 overflow-y-scroll">{props.error.message}</p>
            <div class="modal-action">
                <form method="dialog">
                    <button onClick={close} class="btn">Close & Reset</button>
                </form>
            </div>
        </div>
    </dialog>
};