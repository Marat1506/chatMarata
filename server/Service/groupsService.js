import mongoose, { Schema } from "mongoose";
import { User } from "./userService.js";



const chatSchema = Schema({
    title: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    messages: [],
});
export const Chat = mongoose.model('groups', chatSchema)


export async function createGroup(req, res) {
    try {
        const token = req.headers.token
        console.log("token = ", token)
        const user = await User.findOne({ token: token })
        console.log("user = ", user)
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
        console.log("req = ", req.body.title)
        const chat = await Chat.create({
            title: req.body.title,
            users: [user._id],
            admins: [user._id],
            messages: []

        })
        console.log("ee")

        user.groupChats.push(chat._id)
        console.log("aa")
        await user.save()

        return res.status(201).json("Чат создан")


    } catch (error) {
        return res.status(500).json("Ошибка при создании чата")

    }
}


export async function addUserToGroup(req, res) {
    try {
        const token = req.headers.token
        console.log("token = ", token)
        const user = await User.findOne({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const chatId = req.body.chatId
        console.log("chatId = ", chatId)
        if (!chatId) {
            return res.status(500).json("неверный id чата")
        }

        const userId = req.body.userId
        console.log("userId = ", userId)

        const result = await Chat.updateOne(
            { _id: chatId },
            { $addToSet: { users: userId } }
        )
        console.log("result = ", result)

        if (!result) return res.status(500).json("Не удалось добавить пользователя в чат")

        res.status(200).json("Пользователь успешно добавлен в чат")


    } catch (error) {
        res.status(500).json("Не удалось добавить пользователя в чат")
    }
}

export async function removeUserFromGroup(req, res) {
    try {
        const token = req.headers.token
        console.log("token = ", token)
        const user = await User.findOne({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const chatId = req.body.chatId
        console.log("chatId = ", chatId)
        if (!chatId) {
            return res.status(500).json("неверный id чата")
        }
        const userId = req.body.userId
        console.log("userId = ", userId)
        if (!userId) {
            return res.status(400).json("Неверный id пользователя");
        }

        const result = await Chat.updateOne(
            { _id: chatId },
            { $pull: { users: userId } }
        )

        console.log("result = ", result)


        if (!result) return res.status(500).json("Не удалось удалить пользователя из чата")

        res.status(200).json("Пользователь успешно удален из чата")
    } catch (error) {
        res.status(500).json("Не удалось удалить пользователя из чата")
    }

}


export async function getGroup(req, res) {
    try {
        const token = req.headers.token
        
        const user = await User.findOne({ token: token })
      
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
      
        const chats = await Chat.find()
     
        return res.status(200).json(chats)
    } catch (error) {
        return res.status(500).json("Ошибка при получении групп")
    }
}

export async function getGroupById(req, res) {
    try {
        const token = req.headers.token
        
        const user = await User.findOne({ token: token })
        console.log("user = ", user)
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
        const groupId = req.query.id
        const group = await Chat.find({_id: groupId})
        
        return res.status(200).json(group)
    } catch (error) {
        return res.status(500).json("Ошибка при получении группы")
    }
}

export async function getUsersInGroup(req, res) {
    try {
        // const token = req.headers.token
        // console.log("token = ", token)
        // const user = await User.findOne({ token: token })
        // console.log("user = ", user)
        // if (user.length == 0) {
        //     return res.status(500).json("нет токена")
        // }
        const groupId = req.query.id
        console.log("e = ", req.query.id)
        const group = await Chat.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(groupId)}},
            {$project: {users: 1, _id: 0}}
        ])
        if (group.length === 0) {
            return res.status(404).json("Группа не найдена");
        }
        return res.status(200).json(group);
    } catch (error) {
        
    }
}