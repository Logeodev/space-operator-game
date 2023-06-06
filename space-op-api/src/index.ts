import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { Game } from './Game/Game';
import { Player } from './Player/Player';
import playerRoutes from './Player/route';
import gameRoutes from './Game/route';

// ------------------------ CONFIG --------------------------- \\

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (socket, req) => {
    wss.emit('connection', socket, req);
  });
});



// ------------------------ DATA --------------------------- \\

export const gameInstances: Game [] = [];
export const playersManager: Player [] = [];



// ------------------------ API --------------------------- \\

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

playerRoutes(app, wss)
gameRoutes(app)



