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

    console.log(`result button => ${result.buttonSucess} | result switch => ${result.switchSucess}`)

    return result.buttonSucess && result.switchSucess
}

const verifyOrderedButton = (resultButton : resultButton, inputButton : resultButton): boolean => {
    console.log("veriffy ordered button")
    const result = { sucess : true}
    if(resultButton.ids.length != inputButton.ids.length){
        result.sucess = false
    }
    if(result.sucess){
        resultButton.ids.forEach((id, index) => {
            console.log(index)
            if(resultButton.ids[index] != inputButton.ids[index]){
                console.log(`wrong button on rank : ${index} ! Button id : ${id}`)
                result.sucess = false
            }
        })
    }
    return result.sucess
}

const verifyRandomButton = (resultButton : resultButton, inputButton : resultButton) => {
    console.log("veriffy random button")
    console.log("INPUT IDS => ")
    console.log(inputButton.ids)
    console.log(`result len : ${resultButton.ids.length} | input len : ${inputButton.ids.length}`)

    const result = { sucess : true }
    if(resultButton.ids.length === inputButton.ids.length){
        const resultCount : randomResultCount [] = newResultRandom(resultButton)
        resultCount.map(r => {
                const count : number = inputButton.ids.filter(i => i === r.id).length
                console.log(`for id : ${r.id} count : ${r.count}`)
                console.log(`count found : ${count}`)
                if(count != r.count){
                    console.log(`too many button on id : ${r.id}`)
                    result.sucess = false
                }
        })
    } else {
        result.sucess = false
    }
   console.log("random button return => ", result.sucess)
   return result.sucess
   


}

const newResultRandom = (resultButton : resultButton) : randomResultCount []  => {
    const resultsCount : randomResultCount [] = []
    console.log("sorting => New result button")
    resultButton.ids.map((rId) => {
        //Filter ou find faut voir 
       if(resultsCount.find(resultCount => resultCount.id === rId)){
        console.log(`adding count too result : ${rId}`)
        const count : number | undefined = resultsCount.find(t => t.id === rId)?.count
        if(count){
            console.log("count found => ", count)
            resultsCount[resultsCount.findIndex(o => o.id === rId)] = { id: rId, count: count + 1 }
        }          
       } else {
            console.log("new result found id => ", rId)
            resultsCount.push({ id: rId, count: 1 })
       }   
    })
    console.log("ORDER OF BUTTON => ")
    console.log(resultsCount)
    return resultsCount
}

const verifySwitch = (resultSwitch: resultSwitch, inputSwitch : resultSwitch) : boolean => {
    const result = {sucess : true}
    if(resultSwitch.ids.length != inputSwitch.ids.length){
        result.sucess = false
    } else { 
        resultSwitch.ids.map(resultID => {
            console.log("testing switch => ", resultID)
            console.log(inputSwitch.ids.find(inputID => inputID === resultID))
            const match = inputSwitch.ids.find(inputID => inputID === resultID)
            if(match != undefined){
                if(!(match >= 0)){
                    result.sucess = false
                }
            } else {
                result.sucess = false
            }
        })   
        console.log("switches are right ", result.sucess)
    }
    return result.sucess
}

export default roundReducer;