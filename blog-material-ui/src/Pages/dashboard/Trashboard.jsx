
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import requests from "./../../apis/user/requests";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
const useStyles = makeStyles({
    image: {
      width: "10% !important",
      height: "10% !important",
    },
  });
const Trashboard = (props) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const classes = useStyles(props);
    let navigate = useNavigate();
    const [users, setusers] = useState([]);
    const [notification, setNotification] = useState({
      show: false,
      type: "warning",
      text: "",
    });
    const HardDeleted = async (id) => {
        const results = await requests.deletefromdatabase(id);
        console.log(results);
    
        if (results) {
          setNotification({
            show: true,
            type: "error",
            text: `${results.message}`,
          });
          goToHome();
        }
      };
      const restore = async (id) => {
        const results = await requests.restoretodatabase(id);
        console.log(results);
    
        if (results) {
          setNotification({
            show: true,
            type: "error",
            text: `${results.message}`,
          });
          goToHome();
        }
      };

    useEffect(() => {
        const FetchPosts = async () => {
          const dataFetch = await requests.getAllTrashedUser();
          const { users } = dataFetch;
          setusers(users);
        };
        FetchPosts();
      }, []);
      let goToHome = () => {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
      
        }, 2000);
      };
    
  return (
    <>
    
    <TableContainer
        component={Paper}
        sx={{ maxWidth: "90%", m: "10px auto", p: 2, maxHeight: "600px" }}
      >
        <Stack sx={{ width: "100%" ,marginBottom:"30px"}} spacing={2}>
          {notification.show && (
            <Alert severity={notification.type} variant="filled">
              {notification.text}
            </Alert>
          )}
        </Stack>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                display: { sm: "block" },
              }}
            >
              <MuiLink
                component={Link}
                to="/dashboard"
                variant="button"
                underline="none"
                color="inherit"
              >
                Dashboard
              </MuiLink>
            </Button>
          </Grid>
      
        </Grid>

        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">profilePicture</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user ,index) => {
              return (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td , &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">{user.age}</TableCell>
                  <TableCell align="center">
                    <img
                      alt="no-profile"
                      src={
                        user?.profilePicture
                          ? PF + user.profilePicture
                          : PF + `person/noAvatar.png`
                      }
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ width: 200}}>
                    <Grid container>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => HardDeleted(user?._id)}
                          sx={{
                            // display: { sm: "block" },
                            marginRight: "10px",
                            width: "30px !important",
                            padding:"5px !important"
                          }}
                        >
                          REMOVE
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => restore(user?._id)}
                          sx={{
                            display: { sm: "block" },
                            marginRight: "10px",
                            width: "30px !important",
                            padding:"5px !important"
                          }}
                        >
                          RESTORE
                        </Button>
                      </Grid>


                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    
    
    </>
  )
}

export default Trashboard