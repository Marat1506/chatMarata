import { Box, Typography } from "@mui/material";
import styles from './Peoples.module.css'
import { useEffect, useState } from "react";
import { createDirectChat, getUser } from "../../request/request";
import { User } from "../../request/types";
import { useAppDispatch } from "../../hooks/reduxTypes";
import { changeActiveChatId } from "../../store/reducer";

export default function Peoples() {
  const [users, setUsers] = useState<User[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async() => {
      const data = await getUser()
     
      setUsers(data)

      console.log("user = ", users)
    }
    fetchData()
  }, [])

  const handleClick = async(id: string, username: string) => {
    // const direct = await createDirectChat({title: username, friendId: id})
    // console.log("direct = ", direct)
    dispatch(changeActiveChatId({id: id}))
  }


  return (
    <Box className={styles.content}>
    {users.map((user) => (
      <Box
        key={user._id}
        onClick={() => handleClick(user._id, user.username)}
        className={styles.user}
      >
        <Typography>{user.username}</Typography>
      </Box>
    ))}
  </Box>
  )
}
