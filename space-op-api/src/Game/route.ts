import { Express } from 'express';
import { gameInstances } from '..';
import { Request, Response } from 'express';
import { Game } from '../Game/Game';

const generateGameID = () => {
  return Math.floor(
    Math.random() * 1000000
  ).toString()
    .padStart(6, '0');
}

const gameRoutes = (app: Express) => {

  app.post('/api/game/create', (req: Request, res: Response) => {
    const id = generateGameID()
    const game = new Game(id)
    gameInstances.push(game)
    res.status(200).json({ message: id })
  });

  app.post('/api/game/kill', (req: Request, res: Response) => {
    //const { id } = req.params;
    console.log(req.body)
    const { gameId } = req.body.data
    //const gameId = req.url?.substring(5)

    if (gameInstances.length > 0) {
      console.log("gameInstances > 0 => ",gameInstances.length)
      if (gameInstances.findIndex(g => g.getGameId() === gameId) != -1) {
        gameInstances.find(g => g.getGameId() === gameId)?.unReadyPlayer()
        gameInstances.splice(gameInstances.findIndex(g => g.getGameId() === gameId), 1)
        res.status(200).json({ message: 'Partie supprimée' })
      } else {
        res.status(304).json({ message: 'Partie introuvable' })
      }
    } else {
      res.status(304).json({ message: 'Partie introuvable' })
    }
  });
}

export default gameRoutes