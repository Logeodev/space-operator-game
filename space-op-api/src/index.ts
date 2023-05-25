import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
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


const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (socket, req) => {
  const playerID = req.headers['playerID'];

  if (typeof playerID === 'string') {
    try {

    } catch (e: any) {
      console.log('Unauthorized token');
      socket.send('Unauthorized token');
      socket.close();
    }
  } else {
    socket.send('Unauthorized token');
    socket.close();
  }
});