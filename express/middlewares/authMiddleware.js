import jwt from 'jsonwebtoken';

export function check(req, res, next){
    console.log('Headers:', req.headers);
        console.log('Cookies:', req.cookie);
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        // const token = req.headers.authorization.split(" ")[1]
        const token = req.cookies.token
        console.log('Headers:', req.headers);
        console.log('Cookies:', req.cookie);
        console.log(token)
        if (!token){
            res.status(401).json({error : "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) 
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({error : "Пользователь не авторизован"})
    }
}