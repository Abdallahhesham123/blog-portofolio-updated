import React, { useState } from 'react'
import { FormControl ,  InputAdornment,
    TextField} from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import ClearIcon from '@mui/icons-material/Clear';
  import { makeStyles } from "@mui/styles";
  const useStyles = makeStyles({
  
    search: {
      backgroundColor: "#ddd",
      padding: "2rem",
    }
  });
const Search = (props) => {
    const classes = useStyles(props);
    const [showClearIcon, setShowClearIcon] = useState("none");
    const handleChange = (event)=> {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        console.log(event.target.value);
      };
    
      const handleClick = (event) => {
        
       
      };
  return (
    <>
              <FormControl className={classes.search}>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{cursor: "pointer"}}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon sx={{cursor: "pointer"}}/>
              </InputAdornment>
            )
          }}
        />
      </FormControl>
    </>
  )
}

export default Search