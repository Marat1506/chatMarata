import { Box, Typography } from "@mui/material";
import styles from './Message.module.css'
import type { Message } from "./types";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { User } from "../../request/types";
import { getUserByToken } from "../../request/request";

export default function Message({ props }: Message) {
    const { text, date, userToken } = props
    const [user, setUser] = useState<User[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const responce = await getUserByToken(userToken)
            setUser(responce)
            console.log("responceUser = ", responce)
        }
        fetchData()
    }, [])
    if(!user) return null
    return (
        <Box className={styles.content} key={`${userToken + text}`}>
            <Box className={classNames(styles.message, userToken === Cookies.get('token')? styles.myMessage: '')}>
                <Typography className={styles.username}></Typography>
                <Typography >{text}</Typography>
            </Box>
        </Box>
    )
}
