import { body } from "express-validator";


export const checkUser = [
    body('email', "Отсутствует поле email").trim().isLength({min: 5}),
    body("username", "Отсутствует поле username").trim().isLength({min: 5}),
]

export const checkMessage = [
    body("text", "Отсутствует полу text").trim().isLength({min: 1}),
    body("chatId", "Не передан chatId")
]


