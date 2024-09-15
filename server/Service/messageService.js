import mongoose, { Schema } from "mongoose";
import { User } from "./userService.js";
import { Chat } from "./groupsService.js";


const messageSchema = Schema({
    userToken: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats'
    },
    date: {
        type: Date,
    }
})

const Message = mongoose.model('messages', messageSchema)

export async function createMessage(req, res) {// переделать через socket.io
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log("token = ", token)
        const user = await User.findOne({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
        const chat = await Chat.findById(req.body.chatId)
        if (!chat) {
            return res.status(500).json("Чат не найден")
        }

        const newMessage = {
            userToken: token,
            text: req.body.text,
            chatId: chat._id,
            date: new Date()
        };

        chat.messages.push(newMessage);
        await chat.save();
        return res.status(201).json("Сообщение отправлено");
    } catch (error) {
        return res.status(500).json('Ошибка при отправке сообщения')
    }
}

export async function getMessages(req, res) {
    try {
        const token = req.headers.token
        const user = await User.findOne({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const messages = await Message.find();
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json('ошибка при получении сообщений')
    }
}