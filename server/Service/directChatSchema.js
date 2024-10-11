import mongoose, { Schema } from "mongoose";
import { User } from "./userService.js";


const directChatSchema = Schema({
    title:String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
}, { timestamps: true })

export const directChats = mongoose.model('directchats', directChatSchema)

export async function directChat(data) {
    try {
        console.log("data.usersId = ", data.usersId)
        
        const chat = await directChats.create({
            users: [...data.usersId],
            messages: []
        })

        return "Установлен контакт с " + data.friend
    } catch (error) {
        return "контакт неустановлен"
    }
}

export async function createDirectChat(req, res) {
    try {
        const token = req.headers.token
        console.log("token = ", token)
        const user = await User.find({ token: token })
        console.log("user = ", user)
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
        console.log("req.body.title = ", req.body.title)
        console.log("req.body.friendId = ",  req.body.friendId)
        console.log("user._id = ", user[0]._id)
        const userId = mongoose.Types.ObjectId(user[0]._id);
        const friendId = mongoose.Types.ObjectId(req.body.friendId);

        const chat = await directChat.create({
            title: req.body.title,
            users: [
                userId,
                friendId
            ],

        })
        console.log("ee")

        // user[0].chats.push(chat._id)
        // await user[0].save()

        return res.status(201).json("Чат создан")


    } catch (error) {
        return res.status(500).json("Ошибка при создании чата")

    }
}
