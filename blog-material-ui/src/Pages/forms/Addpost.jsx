
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddPostForm from "../../components/Home/AddPost/AddPost";
const AddPost = () => {
  return (
    <Paper sx={{ maxWidth: "80%", m: "10px auto", p: 2 }}>
      <Typography variant="h4" component="h1">
        Add Post
      </Typography>
      <Typography variant="body1">
        Add your new post using the form below
      </Typography>
      <Divider sx={{ my: 3 }} />
      <AddPostForm />
    </Paper>
  );
};

export default AddPost;