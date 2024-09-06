import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "./types";

const initialState: Chat = {
    messages: [],
    activeChatId: '',
    activeMessage: []
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
        }
    }
})

export const {changeMessages, changeActiveChatId, changeActiveMessage} = chatSlice.actions
export default chatSlice.reducer