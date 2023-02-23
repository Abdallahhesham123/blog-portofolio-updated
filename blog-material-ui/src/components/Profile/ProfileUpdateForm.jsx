import React, { useContext, useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "./../../context/Store";
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CancelIcon from '@mui/icons-material/Cancel';
import validate from "./../Validition/user";
import requests from "./../../apis/user/requests"
import axios from "axios";
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
    img:{
      width:"10%",
      height:"10%",
    }
  });
  
const Input = styled("input")({
    display: "none",
  });
  
  const genders = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const roles = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "user",
      label: "User",
    },
  ];
 
const ProfileUpdateForm = (props) => {
  const { UserData } = props;
    const classes = useStyles(props);
    const { Userdata } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const fetchedUser = UserData || {};
    const [values, setValues] = useState({
      username: fetchedUser.username || "",
      email: fetchedUser.email || "",
      age: fetchedUser.age || "",
      gender: fetchedUser.gender || "",
      role: fetchedUser.role || "",
    });


    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
     const [ValidationStatus, setValidationStatus] = useState(false);
     const [submitted, setSubmitted] = useState(false);
     const [notification, setNotification] = useState({
      show:false,
      type:"warning",
      text:""
     });
     const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      setSubmitted(true)
  
      //validation-start-frontend
            const username = values.username ? values.username.trim() : values.username;
            const email = values.email ? values.email.trim() : values.email;
  
            const age = values.age ;



            const validationErrors = validate(username, email,age);
            setErrors(validationErrors);
            let validStatus = Object.values(validationErrors).every((x)=> x === "")
            if(validStatus){
            setValidationStatus(true);
            }else{
            setValidationStatus(false);
            }
            // validation-end-frontend
      // send values to back end
      // calling the api
    };
    let goToHome = () => {
    
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    };
    useEffect(()=>{
  
  const sendPost= async(dataToSend)=>{
    if (file) {

      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      values.profilePicture = `social/${fileName}`;
      try {
        await axios.post("/user", data);
      } catch (err) {}
    }
    
    const results= await requests.updateuser(dataToSend);

  
    const {response, data }=results
    // console.log(response ,data);
    if(response.ok){
      setNotification({
  
        show:true,
        type: 'success',
        text:"Congratulation ,the post has been successfully updated"
      })
      goToHome();
    }else if(data){
      const err = data.message || {}
  
      if(err ){
        setNotification({
  
          show:true,
          type: 'warning',
          text:err.message
        })
  
      }
  
    }else{
      setNotification({
  
        show:true,
        type: 'error',
        text:"unknownerror"
      })
      
    }
  
  }
  try {
  if (submitted) {
    if(ValidationStatus){ 
      

      
      //for frontend before backend
          sendPost(values)
          setValidationStatus(false)
        }
    setSubmitted(false)
  }
  
     
    // validation-start-frontend
  
    // validation-end-frontend
  } catch (error) {
  
    console.log(error);
    
  }
      
    },[submitted])
  return (
    <>
              <Card sx={{ maxWidth: 500, height: "80vh", padding: "0 20px" }}>
              <Stack sx={{ width: "100%" }} className={classes.notification}>
          {notification.show && (
            <Alert severity={notification.type} variant="filled">
              {notification.text}
            </Alert>
          )}
        </Stack>
        {file && (
          <div className="shareImgContainer">
            <img className={classes.img} src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg"  onClick={() => setFile(null)} />
          </div>
        )}
            <form onSubmit={handleSubmit}>
              <Grid container className={classes.form}>
                <Grid
                  item
                  sx={{
                    margin: "30px",
                    borderRadius: "50%",
                    border: "2px solid #222",
                    padding: "20px",
                  }}
                >
                  <label htmlFor="icon-button-file">
                    <Input 
                    id="icon-button-file" 
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ mb: 1 }}
                    label="Name"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username && errors.username}
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <TextField sx={{ mb: 1 }} 
                  label="Age"
                  name="age"
                  value={values.age}
                  onChange={handleInputChange}
                  error={!!errors.age}
                  helperText={errors.age && errors.age}
                   fullWidth />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ mb: 1 }}
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email && errors.email}
                    fullWidth
                  />
                </Grid>

                <Grid container className={classes.select}>
                  <Grid item sx={{ margin: "20px auto" }}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Gender"
                      name='gender'
                      value={values.gender}
                      onChange={handleInputChange}
                      fullWidth
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    {Userdata.role === "admin" && (
                      <>
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Role"
                          // defaultValue="admin"
                          name='role'
                          value={values.role}
                          onChange={handleInputChange}
                          fullWidth
                        >
                          {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </>
                    )}
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="error"
                  sx={{ margin: "20px" }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Card>
    
    </>
  )
}

export default ProfileUpdateForm