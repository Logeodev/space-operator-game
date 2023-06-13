import { OperationResult, setOperationResult, addResultSwitch, addResultButton } from "../api/models"


export const initNumArray : number [] = []


export const initOperationResult  : OperationResult = setOperationResult(addResultButton("order", -1), addResultSwitch([-1]))