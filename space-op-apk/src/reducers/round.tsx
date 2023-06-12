import { Operation, OperationResult, addResultsButton, addResultSwitch, setOperatonResult, resultButton, resultSwitch } from "../api/models";
import { initNumArray } from "../utils/init";

interface State {
    operationId:string,
    duration:number,
    operation?:Operation,
    operationGregory? : OperationResult, 
}

interface randomResultCount {
    id: number,
    count: number
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
    const result = { buttonSucess: true, switchSucess: true }

    switch(resultButton?.order){
        case "order" : 
            resultButton && inputButton ? 
            result.buttonSucess = verifyOrderedButton(resultButton, inputButton)
            : console.error("THERE SI NOT RESULT BUTTON")
            break;
        case "random" : 
            resultButton && inputButton ? 
            result.buttonSucess = verifyRandomButton(resultButton, inputButton)
            : console.error("THERE SI NOT RESULT BUTTON")
            break;
        default :
            result.buttonSucess = true
            break;
    }

    if(resultSwitch && inputSwitch){
        result.switchSucess = verifySwitch(resultSwitch, inputSwitch) 
    } 

    return result.buttonSucess && result.switchSucess
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

const verifyRandomButton = (resultButton : resultButton, inputButton : resultButton) => {
   const result = { sucess : true }
   const resultCount : randomResultCount [] = newResultRandom(resultButton)
   resultCount.map(r => {
        const count : number = inputButton.ids.filter(i => r.id).length
        if(count != r.count){
            result.sucess = false
        }
   })
   return result.sucess
   


}

const newResultRandom = (resultButton : resultButton) : randomResultCount []  => {
    const obj : randomResultCount [] = []
    
    resultButton.ids.map((r) => {
       if(obj.find(t => t.id === r)){
        const count = obj.find(t => t.id === r)?.count
            count ? obj.concat([{ id: r, count : count + 1 }])
                  : obj.concat([{ id: r, count : 1 }]); console.error("round => newResultRandom => not supose to happend");
       } else {
            obj.concat([{ id: r, count : 1}])
       }   
    })
    return obj
}

const verifySwitch = (resultSwitch: resultSwitch, inputSwitch : resultSwitch) : boolean => {
    const result = {sucess : true}
    if(resultSwitch.ids.length != inputSwitch.ids.length){
        result.sucess = false
    } else {
        resultSwitch.ids.map(s => {
            inputSwitch.ids.find(x => s) ? true : result.sucess = false;
        })    
    }
    return result.sucess
}

export default roundReducer;