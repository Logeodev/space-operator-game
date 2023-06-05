import { Game } from "../Game/Game";


class GamesManager {
    static instance: GamesManager;
    private games: Game [] = []

    private constructor() {
    }
  
    static getInstance() {
      if (!GamesManager.instance)
      GamesManager.instance = new GamesManager();

      return GamesManager.instance;
    }

}

export default GamesManager.getInstance()


