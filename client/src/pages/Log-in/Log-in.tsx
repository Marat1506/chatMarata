import { Box, Typography, TextField, Button } from "@mui/material";
import Cookies from 'js-cookie'
import styles from './Log-in.module.css'
import logo from '../../assets/image.png'
import { useState } from "react";
import { logIn } from "../../request/request";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [isEmail, setIsEmail] = useState(false)


  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("email = ", email)
    const user = await logIn({email: email})
    console.log('user = ', user.user[0].token)
    Cookies.set('token', user.user[0].token)
    if(user.status === 201){
      navigate('/main/home')
    }else{
      console.log("Ошибка при входе ", user.data)
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
        {isEmail && <Typography sx={{color: 'red'}}>неверный логин</Typography>}
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" fullWidth/>
            <Button type="submit" variant="contained">Войти</Button>
        </form>
    </Box>
  )
}