import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'



const UserSchema = Schema({
    email: String,
    username: String,
    token: String,
    groupChats: [{ // поле для групповых чатов
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats',
        default: []
    }],
    directChats: [{ // поле для личных чатов
        type: mongoose.Schema.Types.ObjectId,
        ref: 'directChats', // ссылка на модель личных чатов
        default: []
    }]
})

export const User = mongoose.model('users', UserSchema)

export async function createUser(req, res) {
    try {
        const user = await User.find({ email: req.body.email })

        if (user.length === 0) {
            const token = await jwt.sign({ email: req.body.email }, 'secret')
            const user2 = await User.create({
                email: req.body.email,
                username: req.body.username,
                token: `Bearer ${token}`,
                chats: req.body.chats
            })

            return res.status(201).json({ status: 201, message: "Пользователь создан", user: user2 })
        }
        return res.status(500).json("Пользователь с таким email уже существует")
    } catch (error) {
        return res.status(500).json("Ошибка при создании пользователя")

    }
}

export async function logIn(req, res) {
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length === 0) {
            return res.status(500).json({ status: 500, message: "Неверный логин" })
        }
        return res.status(201).json({ status: 201, message: "Вход разрешен", user: user })
    } catch (error) {
        return res.status(500).json("Ошибка при входе")
    }
}

export async function getUser(req, res) {
    try {
        const token = req.headers.token
        const user = await User.find({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json("Ошибка при получении пользователей")

    }
}

export async function getUserByToken(req, res) {
    try {
        const token = req.headers.token
        const user = await User.find({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        const users = await User.find({ token: req.query.userToken })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json("Ошибка при получении пользователей")

    }
}