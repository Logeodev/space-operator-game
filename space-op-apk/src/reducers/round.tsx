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
    operationGregory: setOperatonResult(addResultsButton("order", initNumArray), addResultSwitch(initNumArray)),
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

export const operationsResult = (state: State) : boolean => {
    const resultButton = state.operation?.result.resultButton
    const resultSwitch = state.operation?.result.resultSwitch
    const inputButton = state.operationGregory?.resultButton
    const inputSwitch = state.operationGregory?.resultSwitch
    const result = { buttonSucess: true, switchSucess: true }

    switch(resultButton?.order){
        case "order" : 
            resultButton && inputButton ? 
            result.buttonSucess = verifyOrderedButton(resultButton, inputButton)
            : console.error("roundStore : no resultBustton found")
            break;
        case "random" : 
            resultButton && inputButton ? 
            result.buttonSucess = verifyRandomButton(resultButton, inputButton)
            : console.error("roundStore : no resultBustton found")
            break;
        default :
            result.buttonSucess = true
            break;
    }

    if(resultSwitch && inputSwitch){
        result.switchSucess = verifySwitch(resultSwitch, inputSwitch) 
    } 

    console.log(`result button => ${result.buttonSucess} | result switch => ${result.switchSucess}`)

    return result.buttonSucess && result.switchSucess
}

const verifyOrderedButton = (resultButton : resultButton, inputButton : resultButton): boolean => {
    const result = { sucess : true}
    if(resultButton.ids.length != inputButton.ids.length){
        result.sucess = false
    }
    if(result.sucess){
        resultButton.ids.forEach((id, index) => {
            console.log(index)
            if(resultButton.ids[index] != inputButton.ids[index]){
                result.sucess = false
            }
        })
    }
    return result.sucess
}

const verifyRandomButton = (resultButton : resultButton, inputButton : resultButton) => {

    const result = { sucess : true }
    if(resultButton.ids.length === inputButton.ids.length){
        const resultCount : randomResultCount [] = newResultRandom(resultButton)
        resultCount.map(r => {
                const count : number = inputButton.ids.filter(i => i === r.id).length
                if(count != r.count){
                    result.sucess = false
                }
        })
    } else {
        result.sucess = false
    }
   return result.sucess
   


}

const newResultRandom = (resultButton : resultButton) : randomResultCount []  => {
    const resultsCount : randomResultCount [] = []
    resultButton.ids.map((rId) => {
        //Filter ou find faut voir 
       if(resultsCount.find(resultCount => resultCount.id === rId)){
        const count : number | undefined = resultsCount.find(t => t.id === rId)?.count
        if(count){
            resultsCount[resultsCount.findIndex(o => o.id === rId)] = { id: rId, count: count + 1 }
        }          
       } else {

            resultsCount.push({ id: rId, count: 1 })
       }   
    })
    return resultsCount
}

const verifySwitch = (resultSwitch: resultSwitch, inputSwitch : resultSwitch) : boolean => {
    const result = {sucess : true}
    if(resultSwitch.ids.length != inputSwitch.ids.length){
        result.sucess = false
    } else { 
        resultSwitch.ids.map(resultID => {
            const match = inputSwitch.ids.find(inputID => inputID === resultID)
            if(match != undefined){
                if(!(match >= 0)){
                    result.sucess = false
                }
            } else {
                result.sucess = false
            }
        })   
    }
    return result.sucess
}

export default roundReducer;