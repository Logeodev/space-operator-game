import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { Game } from './Game/Game';
import { Player } from './Player/Player';
import { playerJoin } from './Player/models';
import { WebSocket } from 'ws';
import { WssMessageHandlder } from './Events';
import { gameStart } from './Game/models';

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

const gameInstances: Game[] = [];
const playersManager: Player [] = [];


// API ---------------------------------------------------

app.post('/api/game/create/:id', (req: Request, res: Response) => {
  const { id } = req.params
 // const creatorPlayer = req.body
  const game = new Game(id)
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

app.post('/api/game/ready/:playerId', (req: Request, res: Response) => {
  const { playerId } = req.params
  const player : Player | undefined = playersManager.find((p : Player) => p.getId() === playerId)
  const game : Game | undefined = gameInstances.find((g : Game) => g.getGameId() ===  player?.getGameId())

  if(!player){
    res.status(300).json({ message: 'Player ID not found' })
  }

  if(player && !game){
    res.status(300).json({ message: 'Player is currently assign to a non existing game' })
  }

  if(game && player){
    player.setStatus(!player.getStatus())
    game.broadcastPlayers({
      type : "players",
      data :  {
        players: game.getPlayersStatus()
      }
    })
    res.status(200).json()
  }
  
});

wss.on('connection', (socket : WebSocket, req) => {
  const playerId = req.headers['playerid'];

  if (typeof playerId === 'string') {
    const findPlayer : Player | undefined = playersManager.find((p) => p.getId() === playerId)
    if(!findPlayer){
        const player : Player = new Player(socket, playerId)
       player.setSocket(socket)
   
       if(player.getSocket()){
         player.getSocket()?.send(JSON.stringify({message: "connected"}))
         player.getSocket()?.on('message', (message : any) => WssMessageHandlder(message))
         playersManager.push(player) 
       } else {
         socket.send('500 Internal Probleme');
         socket.close()
       }
    }else {
      findPlayer.getSocket()?.close()
      findPlayer.setSocket(socket)
      findPlayer.getSocket()?.on('message', (message : any) => WssMessageHandlder(message))
    }
  }
});

export const joinGame = function(playerData : playerJoin){

  const player : Player | undefined = playersManager.find((p : Player) => p.getId() === playerData.data.playerId)
  const game : Game | undefined = gameInstances.find((g : Game) => g.getGameId() === playerData.data.gameId)
  if(game && player){
    player.setPseudo(playerData.data.playerName)
    if(!game.isPlayerById(player.getId())){
      player.setGameId(game.getGameId())
      game.addPlayer(player)
      game.broadcastPlayers({
        type : "players",
        data :  {
          players: game.getPlayersStatus()
        }
      })
    } else {
      player.getSocket()?.send(JSON.stringify({
        type : "error",
        data: {
          message: `Player :: ${playerData.data.playerName} already exist in the game`
        }
      }))
    }
  }else if(player) {
    player.getSocket()?.send(JSON.stringify({
      type : "error",
      data: {
        message: `Game ID :: ${playerData.data.gameId} doesn't exist`
      }
    }))
  }
}

export const startGame = function(message : gameStart){
  const game = gameInstances.find((g : Game) => g.getGameId() === message.data.gameId)  
  if(game){
    game.EventStartGame({
      type: "start"
    })
  }
}
