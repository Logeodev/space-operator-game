interface State {
    pseudo:string,
    id:string
}

const initialState : State = {
    pseudo: '',
    id: '',
};


const userReducer = (state = initialState, action: any):State => {
    switch (action.type) {
        case 'SET_PSEUDO':
            return { ...state, pseudo: action.payload };
        case 'SET_ID':
            return { ...state, id: action.payload };
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


export default userReducer;
