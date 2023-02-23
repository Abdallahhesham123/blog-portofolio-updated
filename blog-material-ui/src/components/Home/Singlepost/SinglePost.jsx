import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Post from "./../Post/Post";
import requests from "./../../../apis/posts/requests"

const useStyles = makeStyles({
  root: {
    maxWidth: "70%",
  },

  rootnotsm: {
    margin: "1rem auto",
  },

  rootsm: {
    margin: "3rem auto",
    maxWidth: "100%",
  },

  main: {
    padding: "1rem",
  }
});

const SinglePost = (props) => {
  const { id } = useParams();
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [post, setPost] = useState(undefined);

  useEffect(() => {

    const fetchPost = async()=>{
      const data = await requests.getOnePost(id);
      console.log(data);
      const {post} = data;
      
      setPost(post);
    };
    setTimeout(fetchPost, 100);
  }, []);
  return (
    <>
      <Grid
        container
        direction={matches ? "column" : "row"}
        className={
          matches
            ? `${classes.root} ${classes.rootsm}`
            : `${classes.root} ${classes.rootnotsm}`
        }
        justifyContent="space-between"
      >
        <Grid item columnSpacing={1} xs={12} className={classes.main} >
          {post ? (
            <>
              <Post id={post?._id} title={post?.title} content={post?.body} userId={post.User_Id?._id} data={post?.createdAt}/>
            </>
          ) : (
            <>
              <Typography variant="h5" component="p" gutterBottom>
                Post is loading
              </Typography>
              <CircularProgress size={100} />
            </>
          )}
        </Grid>
 
      </Grid>
    </>
  );
};

export default SinglePost;