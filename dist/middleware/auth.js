"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //    const authHeader: string | undefined = req.headers['authorization']
//     //    const token: string = authHeader && authHeader.split('')[1]
//     // //    if (token === null) return res.sendStatus(401)
//     //    jwt.verify(token, process.env.TOKEN_SECRET as  string, (err: any, user: any ) => {
//     //        console.log(err)
//     //        if(err) return res.sendStatus(403)
//     //        req.user:  = user
//     //        next()
//     //    })
//     const authorizationHeader: string | undefined = req.headers.authorization;
//     const token: string = authorizationHeader
//       ? authorizationHeader.split(' ')[1]
//       : '';
//     res.locals.userData = jwt.verify(token, process.env.TOKEN_SECRET as string);
//     next();
//   } catch (error) {
//     res.status(400).json({message: 'unauthorized user'});
//   }
// };
// export default verifyToken;
var secret;
if (process.env.TOKEN_SECRET) {
    secret = process.env.TOKEN_SECRET;
}
var verifyToken = function (req, res, next) {
    try {
        var token = void 0;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!!' });
        }
        var decoded = jsonwebtoken_1["default"].verify(token, secret);
        console.log(decoded);
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ Message: 'You are not authorized for this service' });
    }
};
exports["default"] = verifyToken;
