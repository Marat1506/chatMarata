import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "./types";

const initialState: Chat = {
    messages: [],
    activeChatId: '',
    activeMessage: [],
    infoCurrentChat: [],
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeMessages: () => {

        },
        changeActiveChatId: (state, action) => {
            state.activeChatId = action.payload.id
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

export const {changeMessages, changeActiveChatId, changeActiveMessage, changeInfoCurrentChat} = chatSlice.actions
export default chatSlice.reducer