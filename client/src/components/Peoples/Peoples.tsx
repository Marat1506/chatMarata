import { Box, Typography } from "@mui/material";
import styles from './Peoples.module.css'
import { useEffect, useState } from "react";
import { getUser } from "../../request/request";
import { User } from "../../request/types";

export default function Peoples() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async() => {
      const data = await getUser()
     
      setUsers(data)

      console.log("user = ", users)
    }
    fetchData()
  }, [])
  return (
    <Box className={styles.content}>
        {
          users.map((user) => (
            <Typography className={styles.user}>{user.username}</Typography>
          ))
        }
    </Box>
  )
}
