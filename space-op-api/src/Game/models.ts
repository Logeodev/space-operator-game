import { InstructorOperator } from "../Round/Round";


export interface missionControl {
    isFinishedRecived : boolean,
    operationSucess?: boolean,
    instructorOperator : InstructorOperator
}

export const newMissionControl = (
    isFinishedRecived : boolean,
    instructorOperator : InstructorOperator,
    operationSucess? : boolean

): missionControl => ({
    isFinishedRecived,
    instructorOperator,
    operationSucess
})