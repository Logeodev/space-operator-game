import { Express } from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { WssMessageHandlder } from '../Events';
import { Player } from './Player';
import { playersManager, gameInstances } from '..';
import express, { Request, Response } from 'express';
import { Game } from '../Game/Game';

const playerRoutes = ( app : Express, wss : WebSocketServer) => {

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
}

export default playerRoutes