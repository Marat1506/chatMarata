import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { createFotoUser, createUser, getUsers, getUserById, getUserByToken, logIn } from './Service/userService.js'
import { createMessage, getMessages } from './Service/messageService.js'
import { addUserToGroup, createGroup, getGroup, getGroupById, getUsersInGroup, removeUserFromGroup } from './Service/groupsService.js'
import { checkMessage, checkUser } from './Middleware/validate.js'
import { validationResult } from 'express-validator'
import { Server } from 'socket.io'
import http from 'http'
import { createDirectChat, getDirectChat, getTitlesForDirectChat, getUsersIndirectChat } from './Service/directChatSchema.js'
import fileUpload from 'express-fileupload'

const app = express()
const port = 3000

const url = 'mongodb://localhost:27017/chat'
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
})

io.on('connection', (socket) => {
    console.log('User connected');


    socket.on('sendMessage', (data) => {
        console.log("socket сообщение = ", data)
        io.emit('responce', data)
        createMessage(data)// временно 
    })

    // socket.on('directContact', async (data) => {
    //     try {
    //         const response = await directChat(data);
    //         socket.emit('contactEstablished', response);
    //     } catch (error) {
    //         socket.emit('error', { message: "Error establishing contact" });
    //     }
    // });

    socket.on('join', ({ name, room }) => {
        socket.join(room);
        console.log(`${name} joined room ${room}`);
    });
});
mongoose.connect(url)

app.use(express.json())
app.use(cors())
app.use(fileUpload())


app.get('/getUser', async (req, res) => {
    getUsers(req, res)
})
app.get('/getUserByToken', async (req, res) => {
    getUserByToken(req, res)
})
app.get("/getUserById", async (req, res) => {
    getUserById(req, res)
})
app.get('/getMessages', async (req, res) => {
    getMessages(req, res)
})

app.get('/getUsersInGroup', async (req, res) => {

    getUsersInGroup(req, res)
})

app.get('/getDirectChat', async (req, res) => {
    getDirectChat(req, res)
})
app.get('/getUsersIndirectChat', async (req, res) => {
    getUsersIndirectChat(req, res)
})
app.post('/getTitlesForDirectChat', async (req, res) => {
    getTitlesForDirectChat(req, res)
})
app.post('/createUser', checkUser, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    createUser(req, res)
})

app.post('/createFotoUser', async (req, res) => {
    createFotoUser(req, res)
})


app.post('/logIn', async (req, res) => {
    logIn(req, res)
})
app.post('/createMessage', checkMessage, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    createMessage(req, res)
})

app.get('/getGroup', async (req, res) => {
    getGroup(req, res)
})
app.get('/getGroupById', async (req, res) => {
    getGroupById(req, res)
})
app.post('/createGroup', async (req, res) => {
    createGroup(req, res)
})
app.post('/createDirectChat', async (req, res) => {
    createDirectChat(req, res)
})
app.post('/addUserToGroup', async (req, res) => {
    addUserToGroup(req, res)
})
app.post('/removeUserFromGroup', async (req, res) => {
    removeUserFromGroup(req, res)
})

// app.get('/agregate', async(req, res) => {
//     console.log("agregate")
//     aggregate(req, res)
// })
server.listen(port, () => {
    console.log("conncet to 3000 port")
})
