import { Box } from "@mui/material";
import Message from "../Message/Message";
import styles from './Messages.module.css'
import { useEffect, useState } from "react";
import { getGroupById, getMessages, getUsersInGroup } from "../../request/request";
import { useAppSelector } from "../../hooks/reduxTypes";

export default function Messages({ socket }) {
    const [data, setData] = useState<Array<object>>([])
    const store = useAppSelector(state => state.chat.activeMessage)
    const activeChatId = useAppSelector(state => state.chat.activeChatId)

    useEffect(() => {
        const fetchData = async () => {
            const responce = await getUsersInGroup(activeChatId)
            console.log("responce = ", responce)
            const data = await getMessages({ users: responce[0].users, activeChatId: activeChatId })
            console.log("Messages = ", data)
            setData(data)
        }
        fetchData()
    }, [activeChatId])

    useEffect(() => {
        const handleResponse = (value) => {
            console.log("responceSocket = ", value);
            setData(prevData => [...prevData, value]);
        };

        socket.on("responce", handleResponse);

        // Очистка обработчика при размонтировании
        return () => {
            socket.off("responce", handleResponse);
        };


    }, [socket])
    if (!data) {
        return <div>
            isLoading
        </div>
    }

    console.log("data = ", data)
    if (data.length <= 0) return <div>пока нет сообщений</div>
    return (
        <Box className={styles.messages}>
            {data.map((prop) => (
                <Message props={prop} />
            ))}
        </Box>
    )
}
