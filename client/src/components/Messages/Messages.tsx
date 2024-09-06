import { Box } from "@mui/material";
import Message from "../Message/Message";
import styles from './Messages.module.css'
import { useEffect, useState } from "react";
import { getMessages } from "../../request/request";
import { useAppSelector } from "../../hooks/reduxTypes";

export default function Messages() {
    const [data, setData] = useState([])
    const store = useAppSelector(state => state.chat.activeMessage)

    useEffect(() => {
        setData(store)
    }, [store])
    if (!data) {
        return <div>
            isLoading
        </div>
    }
    console.log("data = ", data)
    return (
        <Box className={styles.messages}>
            {data.map((prop) => (
                <Message props={prop} />
            ))}
        </Box>
    )
}
