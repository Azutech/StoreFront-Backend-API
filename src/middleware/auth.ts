import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'



const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    
    
    try {
    //    const authHeader: string | undefined = req.headers['authorization']
    //    const token: string = authHeader && authHeader.split('')[1]

    // //    if (token === null) return res.sendStatus(401)
    //    jwt.verify(token, process.env.TOKEN_SECRET as  string, (err: any, user: any ) => {
    //        console.log(err)

    //        if(err) return res.sendStatus(403)

    //        req.user:  = user

    //        next()
    //    })

    const authorizationHeader: string | undefined =
    req.headers.authorization
const token: string = authorizationHeader
    ? authorizationHeader.split(' ')[1]
    : ''

res.locals.userData  = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
)
next()

    } catch (error) {
        res.status(400).send("unauthorized user");
    }

}
export default verifyToken