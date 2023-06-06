
import { Player } from "../Player/Player";

class PlayersManager {
    static instance: PlayersManager;
    private players: Player [] = []

    private constructor() {
    }
  
    static getInstance() {
      if (!PlayersManager.instance)
      PlayersManager.instance = new PlayersManager();

      return PlayersManager.instance;
    }

}

export default PlayersManager.getInstance()

