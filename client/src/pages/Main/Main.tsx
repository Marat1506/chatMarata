import { Box } from "@mui/material";
import styles from './Main.module.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Chat({socket}) {

   useEffect(() => {
    // Отправляем данные на сервер при рендере компонента
    socket.emit("gg", { user: "USERrrr" });
    
  }, [socket]);
  return (
    <Box className={styles.content}>
      <Box className={styles.left}>
        <Sidebar />
      </Box>
      <Outlet />
    </Box>
  )
}
