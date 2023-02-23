import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const {JWT_SECRET_KEY} = process.env;
export const AuthUser = (req, res, next) => {
  const headers = req.headers[`authorization`];

  const token = headers.split(" ")[1];

  jwt.verify(token,JWT_SECRET_KEY,async (err, token) => {
try {
  if(err) {
    res.status(404).json({message:"inValid_token",err})
        }else{
    
          
                    req.user= token
                    next()
    
        }
} catch (error) {

  return res.json({
    message: "Catch error",
    error,
    stack: error.stack,
  });
  
}



  })
};
