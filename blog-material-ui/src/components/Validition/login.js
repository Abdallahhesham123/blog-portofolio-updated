const messages = {
    required: "frontend: This field is required",
   
      email: (val) =>
      `frontend: your email : ${val}  is not correct please enter avalid mail`,
      password: () =>
      `frontend: Please enter a Strong Password,
      8 to 24 characters.
      Must include uppercase in first and lowercase letters,
        number and special character (@#$%^&*0aA) `
       
       ,

  };

  const rules = {
    required: (val) => (val ? "pass" : messages.required),

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
    }
  };
  
  const validator = {

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

  };




const validate = (email ,password ) => {
    const errors = {  email: "" , password: ""};

    errors.email = validator.email(email).find((y) => y !== "pass") || "";
    errors.password = validator.password(password).find((y) => y !== "pass") || "";

    return {  ...errors};
  };
  
  export default validate;