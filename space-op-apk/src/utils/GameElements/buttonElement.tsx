import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../reducers/store';
import { setOperationGregory } from '../../reducers/round';
import { addResultButton, addResultsButton, addResultSwitch, resultButton, resultSwitch } from '../../api/models';


interface Props {
    id: number,
    valueType: "number" | "color",
    value: Number | String
}

const ButtonElement: React.FC<Props> = ({ id, valueType, value }) => {

    const dispatch = useAppDispatch()
    const turn = useAppSelector((state) => state.turn)
    const resultButton = turn.operationGregory?.resultButton
    const resultSwitch = turn.operationGregory?.resultSwitch


    const buttonPressed = (resultButtonStore : resultButton, resultSwitchStore : resultSwitch) => {
        if(resultButton != undefined && resultSwitch != undefined){
            dispatch(
                setOperationGregory(
                    addResultsButton(
                                resultButton.order, 
                                resultButton.ids.concat([id])
                                    ),
                    resultSwitch)
                )
        }    
    }

    const size = 70;
    const style = StyleSheet.create({
        buttonStyle: {
            alignSelf:'center',
            margin: 10,
            width: valueType==='color'? size : Math.floor(size*value.toString().length/3),
            height: size,
            borderRadius: 40,
            backgroundColor: valueType === 'color' ? value as string : '#0000FF',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            elevation: 10
        },
        numberText: {
            fontSize: Math.floor(size*2/5),
            marginTop:Math.floor(size/5),
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
        }
    });

    return (
        <TouchableOpacity onPress={() => resultButton != undefined && resultSwitch != undefined ? buttonPressed(resultButton, resultSwitch) : console.log("err")}>
            {
                valueType === 'number' ?
                    <View style={style.buttonStyle}>
                        <Text style={style.numberText}>{value.toString()}</Text>
                    </View>
                    :
                    <View style={style.buttonStyle} />
            }
        </TouchableOpacity>
    );
};

export default ButtonElement;