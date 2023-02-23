import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "./../../context/Store";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import requests from "./../../apis/user/requests"
const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
  },

  rootnotsm: {
    margin: "1rem auto",
  },

  rootsm: {
    margin: "3rem auto",
    maxWidth: "100%",
  },

  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    direction: "column",
  },
  body: {
    textAlign: "center",
  },
  image: {
    maxWidth: "30% !important",
    height: "10% !important",
    margin: "auto",
    border: "1px solid red",
    //    marginTop:'30'
  },
  select: {
    display: "flex",
    justifyContent: "space-around",
  },
});

const Profile = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {Userdata} = useContext(AuthContext)
  const [User, setUser] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    const FetchUsers = async () => {

      const res = await requests.getOneuser();
      // console.log(res);
      setUser(res.user);
    };

    FetchUsers();
  }, [id]);
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper sx={{ maxWidth: "90%", m: "10px auto", p: 2 }}>
      <Grid
        container
        direction={matches ? "column" : "row"}
        className={
          matches
            ? `${classes.root} ${classes.rootsm}`
            : `${classes.root} ${classes.rootnotsm}`
        }
        justifyContent="center"
      >
        <Card sx={{ maxWidth: 500, height: "80vh" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={User?.profilePicture ? PF+User.profilePicture :PF+`person/noAvatar.png`}
              alt="green iguana"
              className={classes.image}
              sx={{ borderRadius: "50%", width: "50%" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.main}
              >
                Name :{User?.username}
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                component="div"
                className={classes.body}
              >
                Email :{User?.email}
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                className={classes.body}
              >
                Role :{User?.role}
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                className={classes.body}
              >
                GENDER :{User?.gender}
              </Typography>
              <Grid item className={classes.main}>
              {

((User?._id=== Userdata?.id))&&
<>
<Grid container className={classes.select}>

  <Grid item>

  <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    display: { sm: "block" ,marginRight:"20px"},
                  }}
                >
                  <MuiLink
                    component={Link}
                    to={`/profile-update/${User?._id}`}
                    variant="button"
                    underline="none"
                    color="inherit"
                  >
                    Update-Profile
                  </MuiLink>
                </Button>
  </Grid>
  <Grid item>

  <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                  display: { sm: "block" },
                                }}
                              >
                                <MuiLink
                                  component={Link}
                                  to={`/resetpassword/${User?._id}`}
                                  variant="button"
                                  underline="none"
                                  color="inherit"
                                >
                                  RESET-PASSWORD
                                </MuiLink>
                              </Button>
  </Grid>
</Grid>



</>

}
             

              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Paper>
  );
};

export default Profile;
