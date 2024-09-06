import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { FormEvent, useState } from 'react';
import { sendMessage } from '../../request/request';

export default function MenuForSending() {
  const [message, setMessage] = useState('')

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    console.log("gg = ", message)
    const data = await sendMessage({chatId: '66aca373bb79e741f765b966', text: message})
    console.log("Datamessage = ", data)
    setMessage('')
  }
  return (
    <Paper 
    onSubmit={handleSubmit}
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="menu">
      <AttachFileIcon />
    </IconButton>
    <InputBase
    value={message}
    onChange={e => setMessage(e.target.value)}
      sx={{ ml: 1, flex: 1 }}
      placeholder="Написать сообщение..."
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <InsertEmoticonIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
      <KeyboardVoiceIcon />
    </IconButton>
  </Paper>
  )
}
