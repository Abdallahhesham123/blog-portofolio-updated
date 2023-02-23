import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "./../Dialog/Dialog";
import requests from "./../../../apis/posts/requests"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({

control:{
  backgroundColor:"#EEE"
}
})
const Controls = (props) => {

  const { postID ,user_name} = props;
  let navigate = useNavigate();
  const classes = useStyles(props)
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTrigger, setdeleteTrigger] = useState(false);
  const deleteAnItem = () => {
    console.log(`The post with id ${postID} will be deleted`);
    setDialogOpen(false);
    setdeleteTrigger(true)
  };
  let goToHome = () => {
  
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  };
    useEffect(() => {

      const deletePost = async(id)=>{
        const data =   await requests.deleteOnePost(id);
        alert(data.message)
        goToHome();
        };
        if(deleteTrigger){
          console.log(`The post with id ${postID} will be deleted By ${user_name}`);
 
          deletePost(postID )
        }

  }, [postID ,deleteTrigger]);
  return (
    <>
      <Grid container justifyContent="space-between" className={classes.control}>
        <Grid item>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <ModeEditIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <IconButton
              color="info"
              size="small"
              href={`/update-post/${postID}`}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton color="error" size="small"
              onClick={() => setDialogOpen(true)}
            
            >
              <DeleteIcon
                fontSize="small"
              
              />
            </IconButton>
          </Collapse>
        </Grid>
      </Grid>
      <Dialog
        title={`delete an item  by ${user_name}`}
        text="are you sure you want to delete this item?"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onDialogConfirm={deleteAnItem}
      />
    </>
  );
};

export default Controls;
