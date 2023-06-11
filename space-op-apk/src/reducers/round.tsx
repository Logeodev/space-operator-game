import { Operation } from "../api/models";

interface State {
    operationId:string,
    duration:number,
    operation?:Operation
}

const initialState : State = {
    operationId:'',
    duration:0
}

const roundReducer = (state = initialState, action:any):State => {
    switch (action.type) {
        case 'NEW_OP':
            return { ...state, operation:action.payload.op, operationId:action.payload.id}
        default:
            return state
    }
}

export const setNewOperation = (opId:string, op:Operation) => ({
    type:'NEW_OP',
    payload:{
        id:opId,
        operation:op
    }
})

export default roundReducer;