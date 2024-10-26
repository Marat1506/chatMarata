import { Box, Button, Typography } from '@mui/material'

import styles from './Settings.module.css'
import { useRef, useState } from 'react';


export default function Settings() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploaded, setUploaded] = useState()
  const filePicker = useRef(null)

  const handleChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file")
      return
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('http://localhost:3000/createFotoUser', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log("data = ", data)
    if (data.imageUrl) {
      setUploaded(data.imageUrl); // Сохраняем base64 URL
    }

  }

  const handlePick = () => {
    filePicker.current.click()
  }

  return (
    <Box>
      <Box>
        <Typography>
          Profile
        </Typography>

        <button onClick={handlePick}>Pick File
        </button>

        <input type='file'
          ref={filePicker}
          onClick={handleChange}
          className={styles.hidden} />
        <button onClick={handleUpload}>Отправить</button>
        {uploaded && (
          <img src={uploaded} alt="Uploaded" />
        )}

        {/* <Button variant='contained'
        startIcon={<CloudUploadIcon />}>
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button> */}
      </Box>
    </Box>
  )
}
