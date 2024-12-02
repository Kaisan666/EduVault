import { Router } from "express";

export const userRouter = Router()
import { userController } from "../controllers/userController.js";
import { check } from "../middlewares/authMiddleware.js";
import { checkrole } from "../middlewares/checkRoleMiddleware.js";

userRouter.post('/registration',userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', check, userController.check)
userRouter.get('/user/:userId', userController.showOne)
userRouter.put('/edit-user/:userId', userController.editUser)
userRouter.delete('/delete-user/:userId',checkrole(["Секретарь", "Админ"]), userController.deleteUser)
// userRouter.post('/logout', (req, res) => {
//     res.cookie('token', '', { httpOnly: true });
//     res.send({ message: 'Вы успешно вышли из аккаунта' });
// });

