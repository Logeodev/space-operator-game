import { StyleSheet, View, Text, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { useAppSelector } from "../reducers/store"
import LifeBarElement from "../utils/GameElements/lifeBar"
import styles from "../utils/style"
import { Operation, Role } from "../api/models"
import ButtonElement from "../utils/GameElements/buttonElement"
import SwitchElement from "../utils/GameElements/switchElement"
import ChronometerDisplay from "../utils/GameElements/chronometer"

export const GamePage = () => {
    const vesselIntegrity = useAppSelector(state => state.game.vesselLife)
    const currentRound = useAppSelector(state => state.turn)
    const role = useAppSelector(state => state.player.role)
    const [time, setTime] = useState(currentRound.duration)
    
    useEffect(() => {
        setTime(currentRound.duration)
    }, [currentRound.duration])

    useEffect(() => {
        if (time <= 0) {
          setTime(-1)
          console.log('Timer over')
          return ()=>clearInterval(timer)
        }
        const timer = setInterval(() => {
          setTime(time-0.1)
        }, 100);
        return ()=>clearInterval(timer)
      }, [time])
    
    return <View style={styles.container}>
        <LifeBarElement value={vesselIntegrity}/>
        <ChronometerDisplay totalTime={currentRound.duration} time={time}/>
        {
            role === Role.Operator?
            <View>
                <Text style={styles.label}>
                    {currentRound.operation?.description}
                </Text>
            </View>
            :
                role === Role.Instructor?
                <View style={style.operations}>
                    <ScrollView horizontal={true} contentContainerStyle={style.scroll}>
                    {
                        currentRound.operation&&
                        displayOperationElements(currentRound.operation).map(e => <View style={{maxWidth:110}}>{e}</View>)
                    }
                    </ScrollView>
                </View>
                :
                <View><Text>Waiting...</Text></View>
        }
    </View>
}

const style = StyleSheet.create({
    operations: {
        width:'100%',
        maxHeight:'80%'
    },
    scroll: {
        width:350, 
        display:'flex', 
        flexDirection:'row', 
        flexWrap:'wrap'
    }
})

const displayOperationElements = (op:Operation) => {
    return op.elements.map(elmt => {
        if (elmt.type === "Button") {
            if (elmt.valueType === "color") {
                return <ButtonElement id={elmt.id.valueOf()} value={elmt.value} valueType="color"/>
            } else {
                return <ButtonElement id={elmt.id.valueOf()} value={elmt.value} valueType="number"/>
            }
        } else {
            if (elmt.valueType === "color") {
                return <SwitchElement id={elmt.id.valueOf()} value={elmt.value.toString()} valueType="color"/>
            } else {
                return <SwitchElement id={elmt.id.valueOf()} value={elmt.value.toString()} valueType="string"/>
            }
        }
    })
}