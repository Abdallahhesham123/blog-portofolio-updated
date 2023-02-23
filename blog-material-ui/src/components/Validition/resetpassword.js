const messages = {
    required: "frontend: This field is required",

    oldpassword: (val) =>
      `frontend: your old : Please enter Your Old Password`,
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
    oldpassword: (val) =>{
        const oldpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        return(

            oldpassword.test(val) ? "pass" :messages.oldpassword(val)

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

    oldpassword: (val) => {
        return [
          rules.required(val),
          rules.password(val),
       
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




const validate = ( oldpassword ,password ,confirm_pass) => {
    const errors = {  oldpassword: "" , password: "" };
    
    errors.oldpassword = validator.oldpassword(oldpassword).find((y) => y !== "pass") || "";
    errors.password = validator.password(password).find((y) => y !== "pass") || "";
    errors.confirm_pass = validator.confirm_pass(confirm_pass , password).find((y) => y !== "pass") || "";
    return {  ...errors};
  };
  
  export default validate;