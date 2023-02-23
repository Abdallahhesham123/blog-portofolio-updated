import React, { useEffect, useState } from "react";

import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileUpdateForm from "./ProfileUpdateForm.jsx";
import { useParams } from "react-router-dom";
import requests from "./../../apis/user/requests";
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
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    textAlign: "center",
  },
  image: {
    maxWidth: "80% !important",
    height: "50% !important",
    margin: "auto",
    border: "1px solid red",
    //    marginTop:'30'
  },
  select: {
    display: "flex",
    justifyContent: "space-around",
  },
});

const ProfileUpdate = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await requests.getOneuser();
      const { user: fetcheduser } = res;
      setUser(fetcheduser);
    };
    fetchUser();
  }, [id]);
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
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
          {user && <ProfileUpdateForm UserData={user} />}
        </Grid>
      </Paper>
    </>
  );
};

export default ProfileUpdate;
