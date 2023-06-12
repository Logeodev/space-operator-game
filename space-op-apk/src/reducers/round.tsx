import { Operation, OperationResult, addResultsButton, addResultSwitch, setOperatonResult, resultButton, resultSwitch } from "../api/models";
import { initNumArray } from "../utils/init";

interface State {
    operationId:string,
    duration:number,
    operation?:Operation,
    operationGregory? : OperationResult, 
}

const initialState : State = {
    operationId:'',
    duration:-1,
    operationGregory: setOperatonResult(addResultsButton("order", initNumArray), addResultSwitch(initNumArray))
}

const roundReducer = (state = initialState, action:any):State => {
    switch (action.type) {
        case 'NEW_OP':
            return { 
                ...state, 
                operation:action.payload.operation, 
                operationId:action.payload.id,
                duration:action.payload.duration
            }
        case 'SET_OPERATION_GREGORY':
            return {
                ...state,
                operationGregory: setOperatonResult(action.payload.buttonResult, action.payload.switchResult)
            }
        case 'isOperationSucess': 
            if(operationsResult())
            return {
                ...state, 

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

const operationsResult = (state: State) : boolean => {
    const resultButton = state.operation?.result.resultButton
    const resultSwitch = state.operation?.result.resultSwitch
    const inputButton = state.operationGregory?.resultButton
    const inputSwitch = state.operationGregory?.resultSwitch

    switch(resultButton?.order){
        case "order" : 
            resultButton && inputButton ? verifyOrderedButton(resultButton, inputButton)
            : console.error("THERE SI NOT RESULT BUTTON")
            break;
        case "random" : 
        break;

        default :
            return true
            break;
    }

    

    return false
}

const verifyOrderedButton = (resultButton : resultButton, inputButton : resultButton): boolean => {
    resultButton.ids.forEach((c, index) => {
        console.log(index)
        if(resultButton.ids[index] != inputButton?.ids[index]){
            return false
        }
    })
    return true
}

const verifySwitch = (resultSwitch: resultSwitch, inputSwitch : resultSwitch){
    if(resultSwitch.ids.length != inputSwitch.ids.length){
        return false
    } else {
        resultSwitch.ids.forEach(s => {
            
        })
    }
}

export default roundReducer;