import { Box, Button } from "@mui/material";
import styles from './Sidebar.module.css'
import MyProfile from '../../assets/MyProfile.png'
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useState } from "react";
import classnames from 'classnames'
import { Link } from "react-router-dom";


export default function Sidebar() {
    const [activeButton, setActiveButton] = useState(0)

    const handleButton = (button: number) => {
        console.log("dfs = ", button)
        setActiveButton(button)
    }
    return (
        <Box className={styles.sidebar}>
            <Box className={styles.profile}>
                <img src={MyProfile} width={"80px"} height={"80px"} />
            </Box>

            <Box className={styles.buttons}>
                <Link to={'/main/home'}>
                    <Button onClick={() => handleButton(0)}>
                        <HomeIcon className={classnames(activeButton === 0 ? styles.activeButton : '',)} sx={{ fontSize: 40 }} />
                    </Button>
                </Link>

                <Link to={'/main/chat'}>
                    <Button onClick={() => handleButton(1)}>
                        <ChatBubbleOutlineIcon className={classnames(activeButton === 1 ? styles.activeButton : '',)} sx={{ fontSize: 40 }} />
                    </Button>
                </Link>

                <Link to={'/main/notifications'}>
                    <Button className={activeButton === 2 ? styles.activeButton : ''} onClick={() => handleButton(2)}>
                        <NotificationsOutlinedIcon className={classnames(activeButton === 2 ? styles.activeButton : '',)} sx={{ fontSize: 40 }} />
                    </Button>
                </Link>

                <Link to={'/main/settings'}>
                    <Button onClick={() => handleButton(3)}>
                        <SettingsOutlinedIcon className={classnames(activeButton === 3 ? styles.activeButton : '',)} sx={{ fontSize: 40 }} />
                    </Button>
                </Link>

            </Box>
            <Link to={'/log-in'}>
                <Button>
                    <LogoutOutlinedIcon sx={{ fontSize: 40, color: 'white' }} />
                </Button>
            </Link>

        </Box>
    )
}
