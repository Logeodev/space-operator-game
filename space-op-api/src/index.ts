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
  const game : Game | undefined = gameInstances.find(g => g.getGameId() === gameId)

  if (!game) {
    res.status(404).json({ message: 'Partie introuvable' })
  }
  else if(game != undefined) {
    const { pseudo, playerId } = req.body
    const player :Player = new Player(pseudo, playerId)

    if(game.getPlayers().find(p => p.getId() === playerId)){
      res.status(208).json({ success: true, message: 'Vous êtes déjà dans la partie' })
    } else {
      game.addPlayer(player)

      game.broadcastPlayers({
        type : "players",
        data :  {
          players: game.getPlayersStatus()
        }
      })
      res.status(200).json({ success: true, message: 'Vous avez rejoins la partie' })
    }
  }

})

wss.on('connection', (socket, req) => {
  const playerId = req.headers['playerid'];
  const gameId = req.headers['gameid']

  if ((typeof playerId === 'string') && typeof gameId === 'string') {
    try {
      const player : any = gameInstances.find(g => g.getGameId() === gameId)?.getPlayers().find(p => p.getId() === playerId)
      if(player != undefined){
        player.setSocket(socket)
        player.getSocket().send(JSON.stringify({message: "connected"}))
        player.getSocket().on('message', function(){console.log("hello")})
      }
    } catch (e: any) {
      socket.send('500 Internal Probleme');
      socket.close();
    }
  } else {
    socket.send('300 Bad Request');
    socket.close();
  }
});


// const clientMessageEvent = function (event : any){
//   if(typeof event.data === 'string'){
//     const JsonObject = JSON.parse(event.data)
//     const type = JsonObject.type
//     console.log(type)
//     console.log(JsonObject)
//   }
// }
