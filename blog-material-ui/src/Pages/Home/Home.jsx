import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Post from "../../components/Home/Post/Post";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import requests from "./../../apis/posts/requests";
import { AuthContext } from "./../../context/Store";
import { SearchContext } from "./../../context/SearchContext";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const useStyles = makeStyles({
  root: {
    // backgroundColor: "gray",
    margin: "10px auto",
    maxWidth: "90%",
    padding: "0.5rem",
  },
  main: {
    // backgroundColor: "lightblue",
    padding: "2rem",
  },
  search: {
    backgroundColor: "#ddd",
    padding: "2rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Home = (props) => {
  const classes = useStyles(props);
  const { search, clearData, settitle, title } = useContext(SearchContext);
  const [posts, setposts] = useState([]);
  const [postsSearch, setpostsSearch] = useState([]);
  const [page, setpage] = useState(1);
  const [noOfpage, setNoOfpage] = useState(1);
  const { Userdata } = useContext(AuthContext);
  useEffect(() => {
    const FetchPosts = async (page) => {
      const dataFetch = await requests.getAll(page);
      const { data, UserPage, pagesCount } = dataFetch;
      setposts(
        data
          ?.sort((p1, p2) => {
            return (
              new Date(p1.createdAt).getTime() -
              new Date(p2.createdAt).getTime()
            );
          })
          .reverse()
      );
      setNoOfpage(pagesCount);
      setpage(UserPage);
    };
    FetchPosts(page);
  }, [page]);
  useEffect(() => {
    
      const { data } = search;
      setpostsSearch(
       data
          ?.sort((p1, p2) => {
            return (
              new Date(p1.createdAt).getTime() -
              new Date(p2.createdAt).getTime()
            );
          })
          .reverse()
      );
 
  }, [search]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Paper sx={{ maxWidth: "90%", m: "10px auto", p: 2 }}>
        <Grid
          container
          className={classes.root}
          justifyContent="space-between"
          direction={matches ? "column" : "row"}
        >
          <Grid
            container
            justifyContent="space-between"
            direction={matches ? "column" : "row"}
          >
            <Grid item>
              {( Userdata?.id) && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: { sm: "block" },
                    }}
                  >
                    <MuiLink
                      component={Link}
                      to="/add-post"
                      variant="button"
                      underline="none"
                      color="inherit"
                    >
                      Add_POST
                    </MuiLink>
                  </Button>
                </>
              )}
            </Grid>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => settitle(e.target.value )}
                value={title}
              />

            </Search>
          </Grid>
          
{
title? <>

<Grid item container className={classes.main}>
            {postsSearch && postsSearch.length > 0 ? (
              postsSearch.map((post, index) => {
                return (
                  <Grid item md={4} key={index}>
                    {post.User_Id.isDeleted === false && (
                      <Post
                        snippet
                        id={post._id}
                        title={post.title}
                        content={post.body}
                        data={post.createdAt}
                      />
                    )}
                  </Grid>
                );
              })
            ) : (
              <>
                    <Typography variant="h4" component="h1">
      There is no data found
      </Typography>
              </>
            )}
          </Grid>


</>:<>

<Grid item container className={classes.main}>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => {
                return (
                  <Grid item md={4} key={index}>
                    {post.User_Id.isDeleted === false && (
                      <Post
                        snippet
                        id={post._id}
                        title={post.title}
                        content={post.body}
                        data={post.createdAt}
                      />
                    )}
                  </Grid>
                );
              })
            ) : (
              <CircularProgress size={120} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} className={classes.pagination}>
              <Pagination
                count={noOfpage}
                variant="outlined"
                defaultPage={1}
                color="primary"
                shape="rounded"
                onChange={(e, value) => setpage(value)}
              />
            </Stack>
          </Grid>

</>

}

          
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
