import jwt from 'jsonwebtoken'
import User from '../interfaces/users'
import { verify } from 'jsonwebtoken'

const tokenSecret: string = process.env.TOKEN_SECRET as string

export const createJWTToken = (id: number, username: string): string => {
    return jwt.sign({ id, username }, tokenSecret)
}

export const userTokken = (TOKEN: string): User => {
    const user = verify(TOKEN, tokenSecret) as unknown as User;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return user.user;
}

