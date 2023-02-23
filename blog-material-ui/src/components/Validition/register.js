const messages = {
    required: "frontend: This field is required",
    firstNameError: () =>
      `frontend: your name must be between 3-7 character without any spacial characters and Spaces`,
      email: (val) =>
      `frontend: your email : ${val}  is not correct please enter avalid mail`,
      password: () =>
      `frontend: Please enter a Strong Password,
      8 to 24 characters.
      Must include uppercase in first and lowercase letters,
        number and special character (@#$%^&*0aA) `
       
       ,
       confirm_password: () =>
       `Your Password Not Matched Confirmed Field Please Try Again `
        
        ,
  };

  const rules = {
    required: (val) => (val ? "pass" : messages.required),

    username: (val) =>{
        const username = /^[A-z 0-9]{3,20}$/;
        return(

          username.test(val) ? "pass" :messages.firstNameError()

        )
    },
    email: (val) =>{
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return(

            email.test(val) ? "pass" :messages.email(val)

        )
    }, 
    password: (val) =>{
        const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        return(

            password.test(val) ? "pass" :messages.password(val)

        )
    }, 
    confirm_pass: (val1,val2) =>{
        
        return(

            val1 === val2 ? "pass" :messages.confirm_password()

        )
    }, 
  };
  
  const validator = {

    username: (val) => {
        return [
          rules.required(val),
          rules.username(val),
       
        ];
      },
      email: (val) => {
        return [
          rules.required(val),
          rules.email(val),
       
        ];
      }
      ,
      password: (val) => {
        return [
          rules.required(val),
          rules.password(val),
       
        ];
      }
      ,
      confirm_pass: (val1, val2) => {
        return [
          rules.required(val1),
          rules.confirm_pass(val1,val2),
       
        ];
      }
  };




const validate = ( username ,email ,password ,confirm_pass) => {
    const errors = {  username: "" , email: "" , password: ""};
    
    errors.username = validator.username(username).find((y) => y !== "pass") || "";
    errors.email = validator.email(email).find((y) => y !== "pass") || "";
    errors.password = validator.password(password).find((y) => y !== "pass") || "";
    errors.confirm_pass = validator.confirm_pass(confirm_pass , password).find((y) => y !== "pass") || "";
    return {  ...errors};
  };
  
  export default validate;