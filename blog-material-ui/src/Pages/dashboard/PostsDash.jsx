
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import requests from "./../../apis/posts/requests";
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

const PostsDash = (props) => {
    const classes = useStyles(props);
    let navigate = useNavigate();
    const [posts, setposts] = useState([]);
    const [notification, setNotification] = useState({
      show: false,
      type: "warning",
      text: "",
    });
    const Removepost = async (id) => {
        const results = await requests.removepost(id);
        // console.log(results);
    
        if (results) {
          setNotification({
            show: true,
            type: "error",
            text: `${results.message}`,
          });
          goToHome();
        }
      };
      const accepted = async (id) => {
        const results = await requests.acceptedpost(id);
        // console.log(results);
    
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
          const dataFetch = await requests.getpostsdash();
     
         
          setposts(dataFetch.data);
        };
        FetchPosts();
      }, []);
      let goToHome = () => {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
      
        }, 2000);
      };
  return (
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
          <TableCell align="center">Title</TableCell>
          <TableCell align="center">Description</TableCell>
          <TableCell align="center">CreatedBy</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post,index) => {
          return (
            <TableRow
              key={post._id}
              sx={{ "&:last-child td , &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{post.title}</TableCell>
              <TableCell align="center">{post.body}</TableCell>
              <TableCell align="center">{post.User_Id.username}</TableCell>
              <TableCell align="center" style={{ width: 200}}>
                <Grid container>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => Removepost(post?._id)}
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
                      onClick={() => accepted(post?._id)}
                      sx={{
                        display: { sm: "block" },
                        marginRight: "10px",
                        width: "30px !important",
                        padding:"5px !important"
                      }}
                    >
                      Accepted
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


  )
}

export default PostsDash