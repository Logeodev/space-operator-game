import { Player } from "../Player/Player"
import { Operation, operations } from "../operation/models"

function generateOperationCode(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
    const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber1 = numbers[Math.floor(Math.random() * numbers.length)];
    const randomNumber2 = numbers[Math.floor(Math.random() * numbers.length)];

    return `${randomLetter1}${randomLetter2}-${randomNumber1}${randomNumber2}`;
}

export enum Role {
    "Operator",
    "Instructor",
    "Waiting"
}

interface PlayerRole {
    playerId: string,
    role: Role
}

export interface InstructorOperator {
    operator: PlayerRole,
    instructor: PlayerRole,
    operation: () => Operation,
    code: string
}

export class Round {
    private roundNumber: number
    private playersRoles: PlayerRole[] = []

    public constructor(nbr: number, players: Player[]) {
        this.roundNumber = nbr
        this.playersRoles = this.giveRole(players.sort(() => Math.random()))
    }

    private giveRole(players: Player[]): PlayerRole[] {
        const numPlayers = players.length;
        const roles: PlayerRole[] = [];

        players.forEach((player, index) => {
            if (numPlayers % 2 === 1 && index === numPlayers - 1) {
                // Assign "Waiting" role to the last players
                // when odd number of players
                roles.push({
                    playerId: players[numPlayers - 1].getId(),
                    role: Role.Waiting
                });
            }
            const role =
                index % 2 === 0 ? Role.Operator : Role.Instructor;
            roles.push({ playerId: player.getId(), role });
        });
        return roles;
    }

    getUserRole(pId : string):Role|undefined {
        return this.playersRoles.find(p => p.playerId === pId)?.role
    }

    getRoundTime() : number {
        return 25 - this.roundNumber
    }


    chooseChosenOperations(): InstructorOperator[] {
        const chosenOperations: InstructorOperator[] = []
        const instructors = this.playersRoles.filter(p => p.role === Role.Instructor)
        instructors.forEach(instructor => {
            const operators = this.playersRoles
                .filter(p =>
                    p.role === Role.Operator
                    &&
                    !chosenOperations.find(op => op.operator.playerId === p.playerId)
                )
            chosenOperations.push({
                instructor: instructor,
                operator: operators[Math.floor(Math.random()*operators.length)],
                operation: operations[Math.floor(Math.random()*operations.length)],
                code: generateOperationCode()
            })
        })

        return chosenOperations
    }
}

