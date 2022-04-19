import  express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import product_stores from './controllers/products';


const PORT: number = 3000;
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors())
app.get('/', (req: Request, res: Response) =>{
    console.log(`${PORT}, is the port number`)
    res.status(200).json({message: ''})
});

 product_stores(app)

app.listen(PORT, () =>{
    console.log(`The server is running at this Port ${PORT}`)
});