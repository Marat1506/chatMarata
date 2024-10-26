import { Message } from "../components/Message/types";

export interface Chat {
    messages: Array<Message>,
    activeGroupId: string,
    activeDirectChatId: string,
    activeMessage: Array<Message>
    infoCurrentChat: Array<object>,
    currentChatType: string
}