import mongoose, { Schema } from "mongoose";
import { User } from "./userService.js";


const directChatSchema = Schema({
    title:String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
}, { timestamps: true })

export const directChats = mongoose.model('directChats', directChatSchema)


export async function getDirectChat(req, res) {
    try {
        
        const token = req.headers.token
        const user = await User.find({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

        
        const chats = await directChats.find({
            _id: {$in: user[0].directChats}
        })

        return res.status(200).json(chats)

    } catch (error) {
        return res.status(500).json("Ошибка при получении личных чатов")
    }
}

export async function createDirectChat(req, res) {
    try {
        const token = req.headers.token
        const user = await User.find({ token: token })
        const friend = await User.find({_id: new mongoose.Types.ObjectId(req.body.friendId)})
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }
        const friendId = new mongoose.Types.ObjectId(req.body.friendId)
        const chat = await directChats.create({
            title: req.body.title,
            users: [
                user[0]._id,
                friendId
            ],

        })

        user[0].directChats.push(chat._id)
        friend[0].directChats.push(chat._id)
        await user[0].save()
        await friend[0].save()

        return res.status(201).json(chat)


    } catch (error) {
        return res.status(500).json("Ошибка при создании чата")

    }
}


export async function getUsersIndirectChat(req, res) {
    try {
        const token = req.headers.token
        const user = await User.find({ token: token })
        if (user.length == 0) {
            return res.status(500).json("нет токена")
        }

       
        const directChatId = req.query.id
        
        if(directChatId){
            const users = await directChats.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(directChatId)}},
                {$project: {users: 1, _id: 0}}
            ])
            
            return res.status(200).json(users)

        }else{
            return res.status(200).json("id не валиден")
        }

       
    } catch (error) {
        return res.status(200).json("ошибка при получении пользователей личного чата: " + error)
    }
}

export async function getTitlesForDirectChat(req, res) {
    try {
        const token = req.headers.token
    let TitlesDirectChat = []
    let flag = false
    const user = await User.find({ token: token })
    if (user.length == 0) {
        return res.status(500).json("нет токена")
    }
    console.log("dd")
    const users = req.body
    console.log("my = ", user)
    console.log("users = ", users)


    for(let i of users){
        let items = i.users
        console.log("i = ", i)
        console.log("gr = ", items)
        for (let j of items){
            console.log("j  = ",new mongoose.Types.ObjectId(j) )
            console.log("user._id = ",user[0]._id)
            if(new mongoose.Types.ObjectId(j).equals(user[0]._id))
                continue
            else {
                const userName = await User.findOne({_id: j})
                console.log("username = ", userName)
                TitlesDirectChat.push({_id: i._id, title: userName.username})
                
            }
        }
    }

    console.log("title = ", TitlesDirectChat)

    return res.status(201).json(TitlesDirectChat)
    } catch (error) {
        return res.status(500).json("Ошибка при получении title директ чатов")
    }
    
    
}