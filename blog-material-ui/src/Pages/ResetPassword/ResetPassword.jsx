import {  useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validate from "./../../components/Validition/resetpassword";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import {  useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import requests from "./../../apis/resetpassword/requests";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const useStyles = makeStyles({

    root:{
     
       margin: "10px auto" ,
        maxWidth:"70%",
        padding:"0.2rem",
  
  
    },
    form:{
      margin: "10px auto" ,
      width:"70%",
  
    },
    Header:{
      backgroundColor: "lightblue" ,
      textAlign:"center",
      color:"teal",
      padding:"10px 0"
  
    },
    notification:{
      marginBottom:"20px"
    },
    footer:{
   marginTop:"30px",
  textAlign:"center",
   width:"100%",
    },password:{
  
      position: "relative",
      
    },icon:{
  
      
        position: "absolute",
        top: "1rem",
        right: "1rem",
        cursor: "pointer"
      
    }
  })

const ResetPassword = (props) => {

    const classes = useStyles(props)
    const theme = useTheme();
    const [showoldPassword, setShowoldPassword] = useState(false);
    const toggleoldPassword = () => {
        setShowoldPassword(!showoldPassword);
      };
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
      };
      const [showcomPassword, setShowcomPassword] = useState(false);
      const togglecomPassword = () => {
          setShowcomPassword(!showcomPassword);
        };
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [values, setValues] = useState({
        oldpassword: "",
        password:""
        ,confirm_pass:"" 
      });
      
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
      const [ValidationStatus, setValidationStatus] = useState(false);
      const [notification, setNotification] = useState({
        show: false,
        type: "warning",
        text: "",
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        //validation
    
        const oldpassword = values.oldpassword ? values.oldpassword.trim() : values.password;
        const password = values.password ? values.password.trim() : values.password;
        const confirm_pass = values.confirm_pass ? values.confirm_pass.trim() : values.confirm_pass;
        const validationErrors = validate( oldpassword,password ,confirm_pass);
        setErrors(validationErrors);
        let validStatus = Object.values(validationErrors).every((x) => x === "");
        if (validStatus) {
          setValidationStatus(true);
        } else {
          setValidationStatus(false);
        }
    
      };
      useEffect(() => {
        const sendUser = async (dataToSend) => {
          const results = await requests.resetpassword(dataToSend);
    
          const { response, data } = results;
    
          console.log(response, data);
          if (response.ok) {
            setNotification({
              show: true,
              type: "success",
              text: "Congratulation ,Your Password Changed Successfully",
            });
          } else if (data) {
            const err = data.message || {};
            if (err) {
              setNotification({
                show: true,
                type: "warning",
                text: err,
              });
            }
          } else {
            setNotification({
              show: true,
              type: "error",
              text: "unknownerror",
            });
          }
        };
        try {
          if (submitted) {
            if (ValidationStatus) {
              //for frontend before backend
    
              sendUser(values);
              setValidationStatus(false);
            }
            setSubmitted(false);
          }
    
          // validation-start-frontend
    
          // validation-end-frontend
        } catch (error) {
          console.log(error);
        }
      }, [submitted]);
      
  return (
    <>
        <>
            <Grid container className={classes.root}
         justifyContent="space-between"
         direction={matches ? "column" : "row"}
         >
          <Grid item  xs={12} >
              <Typography component="h3" variant ="h3" gutterBottom className={classes.Header}>

                RESET-PASSWORD
              </Typography>

          </Grid>
        <Stack sx={{ width: "100%" }} className={classes.notification}>
          {notification.show && (
            <Alert severity={notification.type} variant="filled">
              {notification.text}
            </Alert>
          )}
        </Stack>
      <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.password}>
    <TextField
        sx={{ mb: 1.5 }}
        label="OldPassword"
        name="oldpassword"
        type={showoldPassword ? "text" : "password"}
        value={values.oldpassword}
        onChange={handleInputChange}
        error={!!errors.oldpassword}
        helperText={errors.oldpassword && errors.oldpassword}
        fullWidth
      />
             <div className={classes.icon} onClick={toggleoldPassword}>
        {showoldPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>

    </div>

    <div className={classes.password}>
    <TextField
        sx={{ mb: 1.5 }}
        label="newPassword"
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password && errors.password}
        fullWidth
      />
             <div className={classes.icon} onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>

    </div>
    <div className={classes.password}>

    <TextField
        sx={{ mb: 1.5 }}
        label="Comfirm Password"
        type={showcomPassword ? "text" : "password"}
        name="confirm_pass"
        value={values.confirm_pass}
        onChange={handleInputChange}
        error={!!errors.confirm_pass}
        helperText={errors.confirm_pass && errors.confirm_pass}
        fullWidth
      />
             <div className={classes.icon} onClick={togglecomPassword}>
        {showcomPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>

      <Button fullWidth variant="contained" type="submit" color="error">
        Submit
      </Button>
    </form>


         </Grid>

    </>
    </>
  )
}

export default ResetPassword