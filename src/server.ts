import express from 'express'
// import { db} from '../Config/db.config'
import { articleRouter } from './routes';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// auth routes
app.use('/api/v1/articles', articleRouter);

// db connection then server connection
// db.then(() => {
app.listen(9000, () => console.info('Server is listening on port 9000'));
// })
