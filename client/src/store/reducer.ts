import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "./types";

const initialState: Chat = {
    messages: [],
    activeGroupId: '',
    activeDirectChatId: '',
    activeMessage: [],
    infoCurrentChat: [],
    currentChatType: ''
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeMessages: () => {

        },
        changeActiveChatId: (state, action) => {
            state.activeGroupId = action.payload.id
            state.currentChatType = 'group';
        },
        changeActiveDirectChatId: (state, action) => {
            state.activeDirectChatId = action.payload.id
            state.currentChatType = 'direct';
        },
        changeActiveMessage: (state, action) => {
            console.log("dfdfrere = ", action.payload.messages)
            state.activeMessage = action.payload.messages
        },
        changeInfoCurrentChat: (state, action) => {
            state.infoCurrentChat = action.payload
        }
    }
})

export const { changeMessages, changeActiveChatId, changeActiveMessage, changeInfoCurrentChat, changeActiveDirectChatId } = chatSlice.actions
export default chatSlice.reducer