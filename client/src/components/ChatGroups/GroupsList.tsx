import { Box } from '@mui/material'
import styles from './GroupsList.module.css'
import { useEffect, useState } from 'react'
import { getGroup } from '../../request/request'
import GroupImage from '../../assets/Group.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Group } from './type'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxTypes'
import { changeActiveChatId } from '../../store/reducer'

export default function GroupsList() {
  const [group, setGroup] = useState<Group[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroup()
      console.log("useGroup = ", data)
      setGroup(data)
    }
    fetchData()
  }, [])
  const handleClick = (id: string) => {
    navigate(`/main/chat/group/${id}`)
    dispatch(changeActiveChatId({id: id}))
  }
  if(group.length <= 0) return <div>loading</div>
  return (
    <Box className={styles.groups}>
      <List className={styles.groupList}>
        {group.map((value) => (
          <ListItem
            className={styles.item}
            key={value._id}
            disableGutters
            onClick={() => handleClick(value._id)}

          >
            <IconButton aria-label="comment">
              <img src={GroupImage} />
            </IconButton>
            <ListItemText primary={value.title} />
            <hr />

          </ListItem>
        ))}
      </List>
    </Box>
  )
}
