import express, { Request, Response } from 'express';
import cors from 'cors';
import gameRoutes from './gameRoutes';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

app.get('/api', gameRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
