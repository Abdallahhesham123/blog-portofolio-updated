import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validate from "./../../Validition/post";
import requests from "./../../../apis/posts/requests"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
const UpdatePost = (props) => {
  const { postData } = props;
  const fetchedPost = postData || {};
  const [values, setValues] = useState({
    title: fetchedPost.title || "",
    body: fetchedPost.body || "",
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
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true)

    //validation-start-frontend
          const title = values.title ? values.title.trim() : values.title;
          const body = values.body ? values.body.trim() : values.body;


          const validationErrors = validate(title, body);
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

const sendPost= async(id,dataToSend)=>{

  const results= await requests.updatepost(id,dataToSend );


  const {response, data }=results
  console.log(response ,data);
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
  if(ValidationStatus){ //for frontend before backend
        sendPost(postData._id,values)
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
      <form onSubmit={handleSubmit}>
      <Stack sx={{ width: '100%' }} spacing={2}>

        {

          notification.show && <Alert 
          severity={notification.type} variant="filled">
            {notification.text}</Alert>
        }

      
    </Stack>
      <TextField
        sx={{ my: 2 }}
        label="Post Title"
        name="title"
        value={values.title}
        onChange={handleInputChange}
        error={!!errors.title}
        helperText={errors.title && errors.title}
        fullWidth
      />
      <TextField
        sx={{ mb: 2 }}
        label="Post Content"
        multiline
        rows={6}
        name="body"
        value={values.body}
        onChange={handleInputChange}
        error={!!errors.body}
        helperText={errors.body && errors.body}
        fullWidth
      />
      <Button fullWidth variant="contained" type="submit">
        Submit
      </Button>
    </form>

    </>

  );
};

export default UpdatePost;
