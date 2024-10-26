import { Box } from "@mui/material";
import Message from "../Message/Message";
import styles from './Messages.module.css'
import { useEffect, useState } from "react";
import { getGroupById, getMessages, getUsersIndirectChat, getUsersInGroup } from "../../request/request";
import { useAppSelector } from "../../hooks/reduxTypes";

export default function Messages({ socket }) {
    const [data, setData] = useState<Array<object>>([])
    const store = useAppSelector(state => state.chat.activeMessage)
    const activeGroupId = useAppSelector(state => state.chat.activeGroupId)
    const activeDirectChatId = useAppSelector(state => state.chat.activeDirectChatId)
    const currentChatType = useAppSelector(state => state.chat.currentChatType);

    useEffect(() => {
        setData([]); // Очищаем данные при смене типа чата
        if (currentChatType === 'group') {
            const fetchData = async () => {
                const response = await getUsersInGroup(activeGroupId);
                console.log("response = ", response);
                const data = await getMessages({ users: response[0].users, activeChatId: activeGroupId });
                console.log("Messages = ", data);
                setData(data);
            };
            fetchData();
        }
    }, [activeGroupId, currentChatType]);
    
    useEffect(() => {
        setData([]); // Очищаем данные при смене типа чата
        if (currentChatType === 'direct') {
            const fetchData = async () => {
                console.log("ERT = ", activeDirectChatId);
                if (activeDirectChatId) {
                    const response = await getUsersIndirectChat(activeDirectChatId);
                    console.log("responseD = ", response);
                    const data = await getMessages({ users: response[0].users, activeChatId: activeDirectChatId });
                    console.log("MessagesD = ", data);
                    setData(data);
                }
            };
            fetchData();
        }
    }, [activeDirectChatId, currentChatType]);

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
