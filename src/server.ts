import  express, {Request, Response} from 'express'
import bodyParser from 'body-parser'


const PORT: Number = 3000
const app: express.Application =express()

app.get('/', (req: Request, res: Response) =>{
    console.log(`${PORT}, is the port number`)
    res.status(200).json({message: ''})
})



app.listen(PORT, () =>{
    console.log(`The server is running at this Port ${PORT}`)
})