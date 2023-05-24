import { Router, Request, Response } from 'express';

const router = Router();

router.get('/game', (req: Request, res: Response) => {
  // Handle game route logic
});

router.post('/join-game', (req: Request, res: Response) => {
    const {gameId, pseudo} = req.body;
    res.json({success:true, message: 'Vous avez rejoins la partie'})
})

export default router;
