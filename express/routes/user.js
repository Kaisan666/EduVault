import { Router } from "express";

export const userRouter = Router()
import { userController } from "../contollers/userController.js";

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', userController.check)
userRouter.get('/user/:userId', userController.showOne)
userRouter.put('/edit-user/:userId', userController.editUser)
userRouter.delete('/delete-user/:userId', userController.deleteUser)
