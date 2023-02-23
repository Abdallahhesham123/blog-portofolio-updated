import React from 'react'
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  footer:{
justifyContent: 'center',

}
})
function Footer(props) {
  const classes = useStyles(props)
  return (
    <>
                <Box sx={{ flexGrow: 1, bgColor: "primary" }}>
                    <AppBar position="static" >
                    <Toolbar variant="regular"  className={classes.footer}>

                    <Typography variant="body1" noWrap component="p" >
                    Created by<span className='text-warning'> Abdallah-Hesham</span> 2022 | all rights reserved!
                </Typography>

                    </Toolbar>

                    </AppBar>
                </Box>
  
           
        
    </>
  )
}

export default Footer