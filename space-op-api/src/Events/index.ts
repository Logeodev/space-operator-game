
export interface GameStartEvent<P> {
  data: P
}



// export type Partie = { playerId: number };
export type RejoindrePartie = { gameId: number, playerId: number};

export type Listener<P> = (data: P) => void;

export class EventManager {
  static instance: EventManager;

  private constructor() {
  }

  static getInstance() {
    if (!EventManager.instance)
      EventManager.instance = new EventManager();

    return EventManager.instance;
  }

  listeners: { [gameId: string]: Array<Listener<any>> } = {};

  subscribe = <T>(gameId: string, listener: Listener<T>) => {
    if (this.listeners[gameId])
      this.listeners[gameId].push(listener);
    else
      this.listeners[gameId] = [listener];
  };

  // broadcast = <T>(event: PlayerEvent<T>) => {
  //   this.listeners[event.key.gameId] &&
  //   this.listeners[event.key.gameId].forEach((listener: Listener<any>) =>
  //     listener(event.data)
  //   );
  // };
}

export default EventManager.getInstance();