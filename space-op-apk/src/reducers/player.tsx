import { Role } from "../api/models";

interface playerState {
    pseudo:string,
    playerId:string,
    role: Role
}

const initialState : playerState = {
    pseudo: '',
    playerId: '',
    role: Role.Waiting
};


const playerReducer = (state = initialState, action: any):playerState => {
    switch (action.type) {
        case 'SET_PSEUDO':
            return { ...state, pseudo: action.payload };
        case 'SET_ID':
            return { ...state, playerId: action.payload };
        case 'SET_ROLE':
            return { ...state, role: action.payload };
        default:
            return state;
    }
};

export const setPseudo = (pseudo: string) => ({
    type: 'SET_PSEUDO',
    payload: pseudo,
});

export const setPlayerId = (id: string) => ({
    type: 'SET_ID',
    payload: id,
});

export const setRole = (r:Role) => ({
    type: 'SET_ROLE',
    payload: r
})


export default playerReducer;
