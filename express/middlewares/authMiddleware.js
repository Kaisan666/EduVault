import jwt from 'jsonwebtoken';

export function check(req, res, next){
    // console.log('Cookies в аус:', req.cookies);
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        // const token = req.headers.authorization.split(" ")[1]
        const token = req.cookies.token
        console.log('Cookies:', req.cookies.token);
        // console.log(token)
        if (!token){
            res.status(401).json({error : "Пользователь не авторизованaaaaaaaaaaa"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) 
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({error : "Пользователь не авторизован"})
    }
}