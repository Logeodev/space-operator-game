import { Operation, OperationResult, addResultsButton, addResultSwitch, setOperationResult, resultButton, resultSwitch } from "../api/models";
import { initNumArray } from "../utils/init";

export interface State {
    operationId:string,
    duration:number,
    operation?:Operation,
    operationGregory? : OperationResult, 
}

export interface randomResultCount {
    id: number,
    count: number
}

const initialState : State = {
    operationId:'',
    duration:-1,
    operationGregory: setOperationResult(addResultsButton("order", initNumArray), addResultSwitch(initNumArray)),
}

const roundReducer = (state = initialState, action:any):State => {
    switch (action.type) {
        case 'NEW_OP':
            return { 
                ...state, 
                operation:action.payload.operation, 
                operationId:action.payload.id,
                duration:action.payload.duration,
            }
        case 'SET_OPERATION_GREGORY':
            return {
                ...state,
                operationGregory: setOperationResult(action.payload.buttonResult, action.payload.switchResult)
            }

        default:
            return state
    }  
}

export const setNewOperation = (opId:string, op:Operation, duration:number) => ({
    type:'NEW_OP',
    payload:{
        id:opId,
        operation:op,
        duration:duration
    }
})

export const setOperationGregory = (buttonResult : resultButton, switchResult : resultSwitch) => ({
    type:'SET_OPERATION_GREGORY',
    payload:{
        buttonResult:buttonResult,
        switchResult:switchResult
    }
})

export default roundReducer;