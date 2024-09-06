import { Box, Button, Typography } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import style from './ChatHeader.module.css'
import profile from '../../assets/MyProfile.png'
export default function ChatHeader() {
    return (
        <Box className={style.content}>
            <Box sx={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                <img src={profile}/>
                <Box>
                    <Typography>Anil</Typography>
                    <Typography>Online - Last seen, 2:20</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
                <Button>
                    <CallIcon/>
                </Button>
                <Button>
                    <VideocamIcon />
                </Button>
                <Button>
                    <MoreVertIcon />
                </Button>
            </Box>

        </Box>
    )
}
