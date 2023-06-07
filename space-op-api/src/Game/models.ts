import { InstructorOperator } from "../Round/Round";

export interface missionControl {
    isFinishedReceived : boolean,
    operationSucess?: boolean,
    instructorOperator : InstructorOperator
}

export const newMissionControl = (
    isFinishedReceived : boolean,
    instructorOperator : InstructorOperator,
    operationSucess? : boolean

): missionControl => ({
    isFinishedReceived,
    instructorOperator,
    operationSucess
})

export interface gameStatus {
    type: "victory"|"destroyed",
    data: {
      turns?:number
    }
  }

export interface EventIntegrity {
    type: "integrity",
    data: {
        integrity: number
    }
}