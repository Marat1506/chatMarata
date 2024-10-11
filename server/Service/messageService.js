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

export async function createMessage(data) {
    try {
        console.log("dataaaae = ", data)
        // const token = req.headers.token
        // console.log("token = ", token)
        // const user = await User.findOne({ token: token })
        // if (user.length == 0) {
        //     return res.status(500).json("нет токена")
        // }
        const chat = await Chat.findById(data.chatId)
        console.log("chat = ", chat)
        if (!chat) {
            return res.status(500).json("Чат не найден")
        }

        const newMessage = {
            userToken: data.userToken,
            text: data.text,
            chatId: chat._id,
            date: new Date()
        };

        // chat.messages.push(newMessage);
        const m = await Message.create(newMessage)
        console.log("m = ", m)
        console.log("message = ", newMessage)
        await chat.save();
        return "Сообщение отправлено";
    } catch (error) {
        return 'Ошибка при отправке сообщения';
    }
}

export async function getMessages(req, res) {
    try {
        const token = req.headers.token
        const user = await User.findOne({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const userIds = req.query.users.split(',')
        const chatId = req.query.activeChatId

        console.log("activeChatId = ", chatId)

        console.log("req = ", req.query.users.split(','))
        const tokens = await User.aggregate([
            {$match: {_id: {$in: userIds.map(id => new mongoose.Types.ObjectId(id))}}},
            {$project: {token: 1}}
        ])
        console.log("TOKENS = ", tokens)
        const userTokens = tokens.map(tokenObj => tokenObj.token)
        console.log("userTokens = ", userTokens)
        const messages = await Message.find({
            userToken: {$in: userTokens},
            chatId: {$in: chatId}
        });
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json('ошибка при получении сообщений')
    }
}

