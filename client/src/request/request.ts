import Cookies from "js-cookie"
import type { Message, User } from "./types"

export async function createUser(params: User) {
    try {
        console.log("data = ", params)
        const responce = await fetch('http://localhost:3000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(params)
        })
        const data = await responce.json()
        return data
    } catch (error) {
        console.log("Ошибка при создании пользователя: " + error)
    }
}

export async function logIn(params:{email: string}) {
    try {
        console.log("data = ", params)
        const responce = await fetch('http://localhost:3000/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(params)
        })
        const data = await responce.json()
        return data
    } catch (error) {
        console.log("Ошибка при входе: " + error)
    }
}

export async function getMessages({users, activeChatId}) {
    try {
        const responce = await fetch(`http://localhost:3000/getMessages?users=${users}&activeChatId=${activeChatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })
        const data = await responce.json()
        return data
    } catch (error) {
        console.log("Ошибка при входе: " + error)
    }
}


export async function sendMessage(params: Message) {
    try {
        const responce = await fetch('http://localhost:3000/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
            body: JSON.stringify(params)
        })

        const data = await responce.json()
        console.log("dataMessage = ", data)
        return data

    } catch (error) {
        console.log("Ошибка при отправке сообщения: ", error)
        
    }
}


export async function getGroup() {
    try {
        const responce = await fetch('http://localhost:3000/getGroup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })

        const data = await responce.json()
        console.log("dataGroup = ", data)
        return data
    } catch (error) {
        console.log("Ошибка при получении групп")
    }
}
export async function getUsersInGroup(id: string) {
    try {
        const responce = await fetch(`http://localhost:3000/getUsersInGroup?id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })
        const data = await responce.json()
        console.log("userGroup = ", data)
        return data
    } catch (error) {
        console.log("Ошибка при получении пользователей группы")
    }
}

export async function getGroupById(id: string) {
    try {
        const responce = await fetch(`http://localhost:3000/getGroupById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })
        const data = await responce.json()
        return data
    } catch (error) {
        console.log("Ошибка при получении группы")
    }
}

export async function getUser() {
    try {
        const responce = await fetch('http://localhost:3000/getUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })
        const data = await responce.json()
        console.log("rrr= ", data)
        return data
    } catch (error) {
        console.log("Ошибка при получении пользователей")
    }
}

export async function getUserByToken(userToken: string) {
    try {
        const responce = await fetch(`http://localhost:3000/getUserByToken?userToken=${userToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
        })
        const data = await responce.json()
        console.log("rrr= ", data)
        return data
    } catch (error) {
        console.log("Ошибка при получении пользователей")
    }
}


export async function createDirectChat(params) {
    try {
        const responce = await fetch('http://localhost:3000/createDirectChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "token": `${Cookies.get('token')}`
            },
            body: JSON.stringify(params)

        })
        const data = await responce.json()
        console.log("firectData = ", data)
        return data

    } catch (error) {
        console.log("Ошибка при создании личного чата")
    }
}