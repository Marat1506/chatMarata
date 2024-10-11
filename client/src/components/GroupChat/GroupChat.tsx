import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupById } from '../../request/request'
import { Group } from '../ChatGroups/type'
import { useAppDispatch } from '../../hooks/reduxTypes'
import { changeActiveMessage } from '../../store/reducer'

export default function GroupChat() {
  const {id} = useParams()
  const [group, setGroup] = useState<Group[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroupById(id)
      console.log()
      setGroup(data)
      dispatch(changeActiveMessage({messages: data[0].messages}))
    }
    fetchData()
  }, [id, dispatch])
  console.log("GROUP = ", group)
  if(group.length == 0){
    return <div>is Loading...</div>
  }
  return (
    <div>{group[0].title}</div>
  )
}
