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
        ref: 'directChats',
        default: []
    }]
}, {timestamps: true})

export const User = mongoose.model('users', UserSchema)
// export async function aggregate(req, res) {
//     try {
//         const result = await User.updateMany(
//             {},
//             [
//                 {
//                     $set: {
//                         groupChats: [],  // Переименовываем поле chats в groupChats
//                         directChats: []        // Добавляем новое поле с массивом ObjectId
//                     }
//                 },
//                 {
//                     $unset: "chats"           // Удаляем старое поле chats
//                 }
//             ]
//         );
//         console.log('Aggregation result:', result);
//         return res.status(200).json(result)
//     } catch (error) {
//         console.error('Error during aggregation:', error);
//     }
// }
export async function createUser(req, res) {
    try {
        const user = await User.find({ email: req.body.email })

        if (user.length === 0) {
            const token = await jwt.sign({ email: req.body.email }, 'secret')
            const user2 = await User.create({
                email: req.body.email,
                username: req.body.username,
                token: `Bearer ${token}`,
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

export async function getUsers(req, res) {
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

export async function getUserById(req, res) {
    console.log("rr")
    const token = req.headers.token
    const user = await User.find({ token: token })
    if (user.length == 0) {
        return res.status(500).json("нет токена")
    }

    console.log("req.body.users = ", req.query.id)
    const userOne = await User.findOne({ _id: req.query.id})
    console.log('userOne = ', userOne)

    return res.json(userOne)
}

export async function createFotoUser(req, res) {
    console.log("Пришел запрос File")
    if (!req.files) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file
    console.log("file = ", file)

    const base64Data = file.data.toString('base64')
    const fileType = file.mimetype
    const imageUrl = `data${fileType};base64,${base64Data}`

    return res.json({ imageUrl })

    // if(!file) return res.json({error: 'Incorrect input name'})

    // const newFileName = encodeURI(Date.now() + '-' + file.name)
    // console.log("newFileName = ", newFileName)

}