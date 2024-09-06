import { Box, Button, TextField, Typography } from "@mui/material"
import logo from '../../assets/image.png'
import styles from "./Sign-in.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser } from "../../request/request"
export default function SignIn() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [isEmail, setIsEmail] = useState(false)

  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("submit")
    console.log("email = ", email)
    const user = await createUser({email: email, username: username})
    console.log("user = ", user)

    if(user.status === 201){
      navigate('/main/home')
    }else{
      console.log("Ошибка при создании пользователя ", user.data)
      setIsEmail(true)
      console.log("isEmail = ", isEmail)
    }


  }
  return (
    <Box className={styles.content}>
        <Box className={styles.header}>
            <img src={logo} width={"100px"}/>
            <Typography variant="h3">Чат Марата</Typography>
       
        </Box>

        <form onSubmit={handleSubmit}>
          {isEmail && <Typography sx={{color: 'red'}}>почта уже зарегистрирована</Typography>}
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" fullWidth/>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="username" variant="outlined" fullWidth/>
            <Button type="submit" variant="contained">Зарегистрироваться</Button>
        </form>
        <Link to={"/log-in"}>Уже есть аккаунт ?</Link>
    </Box>
  )
}