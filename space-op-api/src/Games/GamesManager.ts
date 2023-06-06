import { Game } from "../Game/Game";


class GamesManager {
    static instance: GamesManager;
    private games: Game [] = []

    private constructor() {
      this.games = []
    }
  
    static getInstance() {
      if (!GamesManager.instance)
      GamesManager.instance = new GamesManager();

      return GamesManager.instance;
    }

}

export default GamesManager.getInstance()


