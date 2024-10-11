import { Message } from "../components/Message/types";

export interface Chat {
    messages: Array<Message>,
    activeChatId: string,
    activeMessage: Array<Message>
    infoCurrentChat: Array<object>
}