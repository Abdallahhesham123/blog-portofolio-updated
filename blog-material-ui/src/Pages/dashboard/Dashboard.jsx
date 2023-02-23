import React, { useContext, useEffect, useState } from "react";
// import { DataGrid} from '@mui/x-data-grid';
import { Link, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import requests from "./../../apis/user/requests";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AuthContext } from "./../../context/Store";
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
const Dashboard = (props) => {
  const classes = useStyles(props);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {Userdata} = useContext(AuthContext)
  let navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  const deleteAnItem = async (id) => {
    const results = await requests.deleteOneUser(id);
    console.log(results);

    if (results) {
      setNotification({
        show: true,
        type: "warning",
        text: `${results.message}`,
      });
      goToHome();
    }
  };
  useEffect(() => {
    const FetchPosts = async () => {
      const dataFetch = await requests.getAllUser();
      const { users } = dataFetch;
      setusers(users);
    };
    FetchPosts();
  }, []);
  let goToHome = () => {
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
      window.location.reload();
    }, 2000);
  };
  const changeRole =  async(id) => {
// var result = confirm("Want to delete?");
// if (result) {
//     //Logic to delete the item
// }
      const dataFetch = await requests.changeRole(id);
    

      if (dataFetch) {
        setNotification({
          show: true,
          type: "primary",
          text: `${dataFetch.message}`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

   
};
const RestoreRole =  async(id) => {

  const dataFetch = await requests.RestoreRole(id);


  if (dataFetch) {
    setNotification({
      show: true,
      type: "primary",
      text: `${dataFetch.message}`,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    
  }


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
          sx={{ display: "flex", justifyContent: "space-between",marginBottom:"30px" }}
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
                to="/"
                variant="button"
                underline="none"
                color="inherit"
              >
                Home
              </MuiLink>
            </Button>
          </Grid>
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
                to="/postsdash"
                variant="button"
                underline="none"
                color="inherit"
              >
                Posts
              </MuiLink>
            </Button>
          </Grid>
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
                to="/trashboard"
                variant="button"
                underline="none"
                color="inherit"
              >
                Trash
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
            {users.map((user,index) => {
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
                  <TableCell align="center" style={{ width: 250 }}>
                    <Grid container>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deleteAnItem(user?._id)}
                          sx={{
                            // display: { sm: "block" },
                            marginRight: "10px",
                            width: "20px",
                          }}
                        >
                          DELETE
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            // display: { sm: "block"  },
                            marginRight: "10px",
                            width: "20px",
                          }}
                        >
                          <MuiLink
                            component={Link}
                            to={`/profile/${user?._id}`}
                            variant="button"
                            underline="none"
                            color="inherit"
                          >
                            View
                          </MuiLink>
                        </Button>
                      </Grid>
                      <Grid item>

                        {
                          user.role === 'admin' ? <>
                                                  <Button
                          variant="contained"
                          color="secondary"
                          sx={{
                            // display: { sm: "block"  },
                            width: "20px",
                          }}
                          onClick={()=>RestoreRole(user?._id)}
                        >

                            User
                          
                        </Button>
                          </>:<>
                          
                          <Button
                          variant="contained"
                          color="secondary"
                          sx={{
                            // display: { sm: "block"  },
                            width: "20px",
                          }}
                          onClick={()=>changeRole(user?._id)}
                        >

                            Admin
                          
                        </Button>
                          </>
                        }

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
  );
};

export default Dashboard;
