import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createDirectChat, getUser } from '../../request/request';
import { useAppDispatch } from '../../hooks/reduxTypes';
import { changeActiveDirectChatId } from '../../store/reducer';


const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },]
export default function SearchInput() {
  const [user, setUser] = useState([])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser()
      console.log("dataGDP = ", data)
      setUser(data)
    }
    fetchData()
  }, [])


  const handleClick =  async(id: string, username: string) => {
    const direct = await createDirectChat({title: username, friendId: id})
    dispatch(changeActiveDirectChatId({id: direct._id}))
    console.log("direct = ", direct)
    console.log(`Chat created with ${username}`);
    setInputValue('');
  }


  if(!user) return <div>Loading...</div>
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          /> */}
      <Autocomplete
        sx={{ ml: 1, flex: 1 }}
        id="free-solo-demo"
        freeSolo
        options={user}
        getOptionLabel={(option) => option.username}
        value={null}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        onChange={(event, value) => {
          console.log("DDRR = ", value)
          if(value){
            handleClick(value._id, value.username)
          }
          
        }} // навешиваем handleClick
        renderOption={(props, option) => (
          <li
            {...props}
            key={option.id}
            
          >
            {option.username}
          </li>
        )}
        
        renderInput={(params) => (
          <TextField
            {...params}
           
            label="search"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', 
                },
              },
            }}
            // InputLabelProps={{
            //   sx: {
            //     display: 'none',
            //   },
            // }}
          />
        )}
      />



    </Paper>
  );
}
