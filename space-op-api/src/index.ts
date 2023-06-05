import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { Game } from './Game/Game';
import { Player } from './Player/Player';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (socket, req) => {
    wss.emit('connection', socket, req);
  });
});



// API ---------------------------------------------------

const gameInstances: Game[] = [];

app.post('/api/game/create/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const creatorPlayer = req.body
  const game = new Game(id, new Player(creatorPlayer.pseudo, creatorPlayer.id))
  gameInstances.push(game)
  res.status(200).json({ message: `Partie crée : ${id}` })
});

app.delete('/api/game/kill/:id', (req:Request, res:Response) => {
  const { id } = req.params;

  if(gameInstances.length > 0){
    if(gameInstances.findIndex(g => g.getGameId() === id) != -1){
      gameInstances.splice(gameInstances.findIndex(g => g.getGameId() === id), 1)
      res.status(200).json({ message: 'Partie supprimée' })
    } else {
      res.status(404).json({ message: 'Partie introuvable' })
    }
  }else {
    res.status(404).json({ message: 'Partie introuvable' })
  }
});

app.post('/api/join/:gameId', (req: Request, res: Response) => {
  const { gameId } = req.params;
  if (gameInstances.find(game => game.getGameId() === gameId) == undefined) {
    res.status(404).json({ message: 'Partie introuvable' })
  }
  else {
    const { pseudo, playerId } = req.body
    const player :Player = new Player(pseudo, playerId)

    if(gameInstances.find(g => g.getGameId() === gameId)
    ?.getPlayers().find(p => p.getId() === playerId)){
      res.status(208).json({ success: true, message: 'Vous êtes déjà dans la partie' })
    }else {
      gameInstances.find(g => g.getGameId() === gameId)
      ?.getPlayers()
      .push(player)
      res.status(200).json({ success: true, message: 'Vous avez rejoins la partie' })
    }
  }
  const game : Game | undefined = gameInstances.find(g => g.getGameId() === gameId)
  if(game != undefined){
    game.broadcastNewPlayer({
      type : "players",
      data :  {
        players: game.getPlayersStatus()
      }
  })
  }
})


wss.on('connection', (socket, req) => {
  const playerId = req.headers['playerid'];
  const gameId = req.headers['gameid']
  socket.send(JSON.stringify({ message: "hello" }))

  if ((typeof playerId === 'string') && typeof gameId === 'string') {
    try {
      const p : any = gameInstances.find(g => g.getGameId() === gameId)?.getPlayers().find(p => p.getId() === playerId)
      if(p != undefined){
        p.setSocket(socket)
        p.getSocket().send(JSON.stringify({message: "connected"}))
      }
    } catch (e: any) {
      socket.send('Unauthorized token');
      socket.close();
    }
  } else {
    socket.send('Unauthorized token');
    socket.close();
  }
});
