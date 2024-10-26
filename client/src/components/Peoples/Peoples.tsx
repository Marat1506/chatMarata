import { Box, Typography } from "@mui/material";
import styles from './Peoples.module.css'
import { useEffect, useState } from "react";
import { createDirectChat, getDirectChat, getTitlesForDirectChat, getUser, getUserById, getUserByToken, getUsersIndirectChat } from "../../request/request";
import { User } from "../../request/types";
import { useAppDispatch } from "../../hooks/reduxTypes";
import { changeActiveDirectChatId } from "../../store/reducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export default function Peoples() {
  const [users, setUsers] = useState<User[]>([])
  const [userInfo, setUserInfo] = useState([])
  const [titles, setTitles] = useState([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDirectChat()
      console.log("WER = ", data)

      setUsers(data)
      const titles = await getTitlesForDirectChat(data)
      console.log("titles = ", titles)
      setTitles(titles)

      console.log("getDirectChat@@ = ", data)
    }
    fetchData()
  }, [])

  const handleClick = async (id: string) => {
    navigate(`/main/chat/directchat/${id}`)
    dispatch(changeActiveDirectChatId({ id: id }))
  }

  const getTitle = async (id: string) => {
    const title = await getUserById(id)
    console.log("TITLE = ", title)
    return title
  }


  return (
    <Box className={styles.content}>
      {titles.map((user) => (
        <Box
          key={user._id}
          onClick={() => handleClick(user._id)}
          className={styles.user}
        >
          <Typography>{user.title}</Typography>
        </Box>
      ))}
    </Box>
  )
}
