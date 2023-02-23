const messages = {
  required: "frontend: This field is required",
  firstNameError: () =>
    `frontend: your name must be between 3-7 character without any spacial characters and Spaces`,
    email: (val) =>
    `frontend: your email : ${val}  is not correct please enter avalid mail`,
    age: () =>
    `frontend: Please enter a Number between 1 to 100`
     
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
  age: (val) =>{
      const age = /^[1-9]$|^[1-9][0-9]$|^(100)$/;
      return(

        age.test(val) ? "pass" :messages.age(val)

      )
  }
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
    age: (val) => {
      return [
        rules.required(val),
        rules.age(val),
     
      ];
    }

};




const validate = ( username ,email ,age) => {
  const errors = {  username: "" , email: "" , age: ""};
  
  errors.username = validator.username(username).find((y) => y !== "pass") || "";
  errors.email = validator.email(email).find((y) => y !== "pass") || "";
  errors.age = validator.age(age).find((y) => y !== "pass") || "";

  return {  ...errors};
};

export default validate;