import { Player } from "../api/models"

interface gameState {
    gameId:string,
    players:Player[],
    vesselLife:number,
    started:boolean,
    victory:boolean,
    currentTurn:number
}

const initialState : gameState = {
    gameId:'',
    players: [],
    vesselLife: 100,
    started:false,
    currentTurn:1,
    victory:false
}

const gameReducer = (state = initialState, action:any):gameState => {
    switch (action.type) {
        case 'SET_ID':
            return { ...state, gameId: action.payload }
        case 'SET_ID2':
            return { ...state, gameId: action.payload }
        case 'NEW_PLAYER':
            return { ...state, players: action.payload }
        case 'START_STOP':
            return { ...state, started: action.payload }
        case 'NEW_TURN':
            return { ...state, currentTurn:action.payload }
        case 'SET_INTEGRITY':
            return { ...state, vesselLife:action.payload }
        case 'VICTORY':
            return { ...state, victory:action.payload, started:false }
        default:
            return state
    }
}

export const setGameId2 = (id:string) => ({
    type: 'SET_ID2',
    payload: id
});

export const updatePlayers = (ps:Player[]) => ({
    type: 'NEW_PLAYER',
    payload: ps
})

export const setGameRunning = (started:boolean) => ({
    type: 'START_STOP',
    payload: started
})

export const setTurn = (turn:number) => ({
    type:'NEW_TURN',
    payload: turn
})

export const setIntegrity = (integrity:number) => ({
    type:'SET_INTEGRITY',
    payload:integrity
})

export const setVictory = (victory:boolean) => ({
    type:'VICTORY',
    payload:victory
})

export default gameReducer;