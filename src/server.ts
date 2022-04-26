import  express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import product_stores from './controllers/products';
// import order_stores from './controllers/orders';
import user_stores from './controllers/user';


const PORT: number = 3000;
const app: express.Application = express();


app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req: Request, res: Response) =>{
    console.log(`${PORT}, is the port number`)
    res.status(200).json({message: ''})
});

 product_stores(app)
//  order_stores(app)
 user_stores(app)

app.listen(PORT, () =>{
    console.log(`The server is running at this Port ${PORT}`)
});