import React, { useState } from 'react'
import Navbar from '../Header/Header'
import Footer from '../Footer/Footer'
import { createTheme , ThemeProvider} from '@mui/material/styles';
import { brown, green } from '@mui/material/colors';
const Template = ({children}) => {
  const [Darkmode, setDarkmode] = useState(false);
  const theme = createTheme({

    palette: {
  
      primary: {
  
        main: green[600]
      },
      secondary:{
  
        main :brown[600]
      },
      mode :Darkmode ?"dark" :"light"
    }
  });
  return (
    <>
    <ThemeProvider theme={theme}>
          <Navbar checked={Darkmode} onChange={()=> setDarkmode(!Darkmode)}/>
                <>

                    {children}

                </>
              
          <Footer/>

    </ThemeProvider>

    </>
  )
}

export default Template