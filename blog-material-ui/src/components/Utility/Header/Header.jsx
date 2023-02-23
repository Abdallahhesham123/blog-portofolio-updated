import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link, NavLink} from "react-router-dom";
import MuiLink from '@mui/material/Link';
import Switch from "../Switch/Switch";
import { makeStyles } from '@mui/styles';
import { AuthContext } from "./../../../context/Store";
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import requests from "./../../../apis/user/requests"

const useStyles = makeStyles({

  link:{
marginRight:"1rem !important",
marginTop:"0.4rem !important",
"&:hover": {
color:"black !important"

  },
  img:{
    width:"100% !important",
    height:"100% !important"
  }
}
})


const Header = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(PF);
  const {  checked , onChange} = props;
  const {Userdata,LogOut} = useContext(AuthContext)
  const classes = useStyles(props)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [User, setUser] = useState([]);
 
  useEffect(() => {
    const FetchUsers = async (id) => {

      const res = await requests.getOneuser(id);
      // console.log(res);
      setUser(res.user);
    };

    FetchUsers(Userdata?.id);
  }, [Userdata?.id]);
  return (
    <Box sx={{ flexGrow: 1, bgColor: "primary" }}>
      <AppBar position="static">
        <Toolbar variant="regular" >
          <Grid
            container
            direction={matches ? "column" : "row"}
            justifyContent={matches ? "center" : "space-between"}
            alignItems="center"
          >
            <Grid item container xs="auto" alignItems="center">
              <Grid item sx={{ ml: 2 }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <HomeIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" noWrap component="h1">
                  Blog-Abdallah
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs="auto">

                <Grid item className={classes.link}>
                {Userdata && (
                      <MuiLink component={Link} to="/" variant="button" underline="none" color="inherit">

                      HOME

                      </MuiLink>
                        )}
                </Grid>
                <Grid item className={classes.link}>
                {Userdata?.role === "admin" && (
                      <MuiLink component={Link} to="/dashboard" variant="button" underline="none" color="inherit">

                      Dashboard

                      </MuiLink>
                        )}
                </Grid>
              
            </Grid>
            <Grid item container xs="auto" alignItems="center">
              <Grid item sx={{ ml: 2 }}>
                   <Switch checked ={checked} onChange ={onChange}/>
              </Grid>
            </Grid>

            <Grid item container xs="auto" alignItems="center">

            <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    display: { sm: "block" },
                    padding: "0.5rem",
                    margin: "0.5rem",
                  }}
                  
                  
                >
                <MuiLink component={NavLink} onClick={LogOut} variant="button" underline="none" color="inherit">

                     LOGOUT

                </MuiLink>
                </Button>
              </Grid>
              <Grid item>

              <Tooltip title="Open settings">
              <Link to={`/profile/${Userdata?.id}`}>
             
              <Avatar alt="Remy Sharp" src={User?.profilePicture ? PF+User.profilePicture :PF+`person/noAvatar.png`}/> 
              
              
              </Link>
            </Tooltip>
              </Grid>
              {/* <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    display: { sm: "block" },
                    padding: "0.5rem",
                    margin: "0.5rem",
                  }}
                >

              <MuiLink component={Link} to="/register" variant="button" underline="none" color="inherit">

              Register

              </MuiLink>
                 
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    display: { sm: "block" },
                    padding: "0.5rem",
                    margin: "0.5rem",
                  }}
                >

              <MuiLink component={Link} to="/login" variant="button" underline="none" color="inherit">

              Login

              </MuiLink>
                 
                </Button>
              </Grid> */}

              
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
