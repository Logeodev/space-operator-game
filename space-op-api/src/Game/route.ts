import { Express } from 'express';
import {  gameInstances } from '..';
import { Request, Response } from 'express';
import { Game } from '../Game/Game';

const gameRoutes = ( app : Express) => {

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
}

export default gameRoutes