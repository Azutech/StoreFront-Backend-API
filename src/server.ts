import  express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentations from './helpers/documentation';







const PORT: number = 3000;
const app: express.Application = express();

app.use('/documetations', swaggerDoc.serve)
app.use('/documetations', swaggerDoc.setup(swaggerDocumentations))
app.use(express.json())

app.use(bodyParser.json());

app.use('/api', routes)



app.get('/', (req: Request, res: Response) =>{
    console.log(`${PORT}, is the port number`)
    res.status(200).json({message: 'Yep!! Welcome to my Coffee'})
    
});



app.listen(PORT, () =>{
    console.log(`The server is running at this Port ${PORT}`)
});