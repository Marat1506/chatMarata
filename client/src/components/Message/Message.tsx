import { Box, Typography } from "@mui/material";
import styles from './Message.module.css'
import type { Message } from "./types";
import classNames from "classnames";
import Cookies from "js-cookie";

export default function Message({ props }: Message) {
    const { text, date, userToken } = props
    return (
        <Box className={styles.content}>
            <Box className={classNames(styles.message, userToken === Cookies.get('token')? styles.myMessage: '')}>
                <Typography >{text}</Typography>
            </Box>
        </Box>
    )
}
