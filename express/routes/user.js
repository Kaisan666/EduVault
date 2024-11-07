import { Router } from "express";

export const userRouter = Router()

userRouter.post('/registration')
userRouter.post('/login')
userRouter.get('/auth')
userRouter.get('/user/:userId')
userRouter.put('/edit-user/:userId')
userRouter.delete('/delete-user/:userId')
