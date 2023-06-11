import { Role } from "../api/models";

interface State {
    pseudo:string,
    id:string,
    role: Role
}

const initialState : State = {
    pseudo: '',
    id: '',
    role: Role.Waiting
};


const userReducer = (state = initialState, action: any):State => {
    switch (action.type) {
        case 'SET_PSEUDO':
            return { ...state, pseudo: action.payload };
        case 'SET_ID':
            return { ...state, id: action.payload };
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

export const setId = (id: string) => ({
    type: 'SET_ID',
    payload: id,
});

export const setRole = (r:Role) => ({
    type: 'SET_ROLE',
    payload: r
})


export default userReducer;
