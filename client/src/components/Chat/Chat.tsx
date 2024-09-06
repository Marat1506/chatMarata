import styles from './Chat.module.css'
import { Box } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import GroupsList from "../ChatGroups/GroupsList";
import Peoples from "../Peoples/Peoples";
import ChatHeader from '../ChatHeader/ChatHeader';
import Messages from '../Messages/Messages';
import MenuForSending from '../MenuForSending/MenuForSending';
import { Outlet } from 'react-router-dom';




export default function CHat() {
  return (
    <Box className={styles.content}>

      <Box className={styles.left}>
        <SearchInput />
        <GroupsList />
        <Peoples />
      </Box>
      <Box className={styles.right}>
        <Box>
          <Outlet />
          <hr />
        </Box>

        <Messages />
        <MenuForSending />
      </Box>
    </Box>
  )
}
