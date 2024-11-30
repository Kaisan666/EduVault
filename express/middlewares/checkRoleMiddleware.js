import jwt, { decode } from 'jsonwebtoken';

export function checkrole(roles){
    return function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token){
            res.status(401).json({error : "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) 
        console.log(decoded)
        if (!roles.includes(decoded.roleName)){
             console.log(roles.includes(decoded.role))
             console.log(roles)
             console.log(decoded.role)
            return res.status(401).json({message : "Нет доступа!!!"
            })
        }
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({error : "Пользователь не авторизован"})
    }
}}