import  express from 'express'
import bodyParser from 'body-parser'


const PORT: Number = 3000
const app: express.Application =express()



app.listen(PORT, () =>{
    console.log(`The server is running at this Port ${PORT}`)
})