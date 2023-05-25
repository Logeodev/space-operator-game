import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import gameRoutes from './gameRoutes';
import { Game } from './models/game';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// API ---------------------------------------------------

const gameInstances: Game[] = [];

app.post('/api/game/create/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const creatorPlayer = req.body
  gameInstances.push({
    gameId: id,
    players: [{
      id: creatorPlayer.id,
      pseudo: creatorPlayer.pseudo
    }]
  })
});

app.delete('/api/game/kill/:id', (req:Request, res:Response) => {
  const {id} = req.params;
  delete gameInstances[gameInstances.findIndex(g => g.gameId === id)];
});

app.post('/api/join/:gameId', (req: Request, res: Response) => {
  const { gameId } = req.params;
  if (gameInstances.find(game => game.gameId === gameId) == undefined) {
    res.status(404).json({ message: 'Partie introuvable' })
  }
  else {
    const { pseudo, playerId } = req.body
    gameInstances.find(g => g.gameId === gameId)
      ?.players
      .push({pseudo:pseudo, id:playerId})
    res.json({ success: true, message: 'Vous avez rejoins la partie' })
    gameInstances.forEach(e => console.log(e.players))
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (socket, req) => {
  const playerId = req.headers['playerId'];
  const gameId = req.headers['gameId']

  if (typeof playerId === 'string') {
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


