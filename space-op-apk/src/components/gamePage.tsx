import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../reducers/store"
import LifeBarElement from "../utils/GameElements/lifeBar"
import styles from "../utils/style"
import { Operation, Role, operatorFinished } from "../api/models"
import ButtonElement from "../utils/GameElements/buttonElement"
import SwitchElement from "../utils/GameElements/switchElement"
import ChronometerDisplay from "../utils/GameElements/chronometer"
import { wsHandler } from ".."
import { operationsResult } from "../reducers/rules"
import { Link } from "react-router-native"
import { handleKillGame } from "../api/createGame"
import { killGame } from "../reducers/game"


export const GamePage = () => {
    const dispatch = useAppDispatch()
    const vesselIntegrity = useAppSelector(state => state.game.vesselLife)
    const currentRound = useAppSelector(state => state.turn)
    const roundNumber = useAppSelector(state => state.game.currentTurn)
    const role = useAppSelector(state => state.player.role)
    const [time, setTime] = useState(currentRound.duration)
    const victory = useAppSelector(state => state.game.victory)
    const gameId = useAppSelector(state => state.game.gameId)

    const resetGame = () => {
        console.log("=================== RESETING GAME =================")
        console.log(gameId)
        handleKillGame(gameId)
        dispatch(killGame())
    }

    useEffect(() => {
        setTime(currentRound.duration)
    }, [currentRound.duration])

    useEffect(() => {
        if (time <= 0) {
            setTime(-1)
            if (role === Role.Operator) {
                wsHandler.sendMessage(operatorFinished(operationsResult(currentRound)))
            }
            return () => clearInterval(timer)
        }
        const timer = setInterval(() => {
            setTime(time - 0.1)
        }, 100);
        return () => clearInterval(timer)
    }, [time])

    if (victory !== undefined){
        const text = victory? "VICTORY !":"OH NOOOOOoooo......"
        return <View style={styles.container}>
            <Text style={{fontSize:40, fontWeight:'bold'}}>{text}</Text>
            <View style={styles.btnPrimary}><Link onPress={() => resetGame()} to='/'><Text>Back to menu</Text></Link></View>
        </View>
    } else {
        return <View style={styles.container}>
            {DisplayGameState(roundNumber, vesselIntegrity, currentRound.duration, time, currentRound.operationId)}
            {
                role === Role.Instructor ?
                    <View>
                        <Text style={styles.label}>
                            {currentRound.operation?.description}
                        </Text>
                    </View>
                    :
                    role === Role.Operator ?
                        <View>
                            <View style={style.operations}>
                                <ScrollView horizontal={true} contentContainerStyle={style.scroll}>
                                    {
                                        currentRound.operation &&
                                        displayOperationElements(currentRound.operation).map(e => <View style={{ maxWidth: 110 }}>{e}</View>)
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        :
                        <View><Text>Waiting...</Text></View>
            }
        </View>
    }

}

const style = StyleSheet.create({
    operations: {
        width: '100%',
        maxHeight: '100%'
    },
    scroll: {
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

const displayOperationElements = (op: Operation) => {
    return op.elements.map(elmt => {
        if (elmt.type === "Button") {
            if (elmt.valueType === "color") {
                return <ButtonElement key={ `${elmt.id.valueOf()} + ${elmt.type} `} id={elmt.id.valueOf()} value={elmt.value} valueType="color" />
            } else {
                return <ButtonElement key={ `${elmt.id.valueOf()} + ${elmt.type} `} id={elmt.id.valueOf()} value={elmt.value} valueType="number" />
            }
        } else {
            if (elmt.valueType === "color") {
                return <SwitchElement key={ `${elmt.id.valueOf()} + ${elmt.type} `} id={elmt.id.valueOf()} value={elmt.value.toString()} valueType="color" />
            } else {
                return <SwitchElement key={ `${elmt.id.valueOf()} + ${elmt.type} `} id={elmt.id.valueOf()} value={elmt.value.toString()} valueType="string" />
            }
        }
    })
}

const DisplayGameState = (
    turns: number,
    integrity: number,
    duration: number,
    time: number,
    code: string
) => <View style={{ width: Dimensions.get('window').width * 0.9, display:'flex', flexDirection:'column'}}>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <ChronometerDisplay totalTime={duration} time={time} />
            <Text style={{fontSize:30, fontWeight:'bold'}}>{turns}/20</Text>
        </View>
        <LifeBarElement value={integrity} />
        <Text style={{fontSize:25, alignSelf:'center', marginTop:20}}>{code}</Text>
    </View>