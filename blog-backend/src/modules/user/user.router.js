import {Router} from 'express'
import { Admin } from '../../middleware/Admin.js';
import { AuthUser } from '../../middleware/AuthUser.js';
import * as userController from  './controller/user.js'
const router = Router();

//get all users
router.get("/" , AuthUser,userController.getUserModule)
//update with diffrent methode
router.put("/findByIdAndUpdate" , AuthUser,userController.findByIdAndUpdate)
//delete with diffrent methode
router.delete("/findOneAndDelete/:id" , Admin, userController.findOneAndDelete)
//soft-delete
router.put("/softDelete/:id" , Admin,userController.softDelete)
router.put("/restoretodatabase/:id" , Admin,userController.restoretodatabase)

router.get("/getAllTrashedUsers" ,Admin, userController.getAllTrashedUsers)
router.get("/getUserById/" ,AuthUser,userController.getUserById)

router.put("/changeRole/:id" ,Admin, userController.changeRole)
router.put("/RestoreRole/:id" ,Admin, userController.RestoreRole)

export default  router