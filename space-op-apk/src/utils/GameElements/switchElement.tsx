import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import newShade from '../newShade';
import { addResultButton, addResultsButton,  setOperatonResult, addResultSwitch} from '../../api/models';
import { setOperationGregory } from '../../reducers/round';
import { useAppSelector, useAppDispatch } from '../../reducers/store';
import { resultButton, resultSwitch } from '../../api/models';
interface Props {
  id: number,
  valueType: "string" | "color",
  value: String
}

const SwitchElement: React.FC<Props> = ({ id, valueType, value }) => {
  const [switchValue, setSwitchValue] = useState(false);

  const colorBright = valueType === 'color'? value.toString() : '#00ff00'
  const colorDark = valueType === 'color'? newShade(value.toString(),-120) : '#70a070'

  const dispatch = useAppDispatch()
  const turn = useAppSelector((state) => state.turn)

  const resultButton = turn.operationGregory?.resultButton
  const resultSwitch = turn.operationGregory?.resultSwitch

  console.log("SWITCH RELOAD")
  console.log("RES BT => ",resultButton)
  console.log("RES SWITCH => ",resultSwitch)

  const handleSwitchToggle = (newValue: boolean) => {
    setSwitchValue(newValue);
    resultButton != undefined && resultSwitch != undefined ? 
    switchPressed(resultButton, resultSwitch)
    : console.log("error")
  };

  const switchPressed = (resultButtonStore : resultButton, resultSwitchStore : resultSwitch) => {
    console.log("WE GOT IN Switch PRESSED")
    if(resultButton && resultSwitch){
      console.log(resultButton)
      console.log(addResultSwitch(resultSwitch.ids.concat([id])))
    }

    if(resultButton?.ids.find( id => id)){
      delete resultButton.ids[resultButton.ids.findIndex(id => id)]
    }

    resultButton != undefined && resultSwitch != undefined ? 
    dispatch(
        setOperationGregory(resultButton, addResultSwitch(resultSwitch.ids.concat([id])))
        )
        : console.error("err")
} 

  const size = 90;
  const switchStyle = StyleSheet.create({
    background: {
      alignSelf:'center',
      margin: 10,
      width: size,
      height: Math.floor(size/2),
      borderRadius: 2,
      backgroundColor: '#aaaaaa',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      elevation: 10
    },
    square: {
      display:'flex',
      flexDirection:'row',
      alignSelf:switchValue?'flex-end':'flex-start',
      marginTop:'2%',
      marginLeft:'3%',
      marginRight:'3%',
      width: '45%',
      height: '90%',
      backgroundColor: switchValue ? colorBright : colorDark,
    },
    labelText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
  }
  });

  return (
    <TouchableOpacity onPress={() => handleSwitchToggle(!switchValue)}>
      {
        valueType === 'string'&&
        <Text style={switchStyle.labelText}>{value}</Text>
      }
      <View style={switchStyle.background}>
        <View style={switchStyle.square} />
      </View>
    </TouchableOpacity>
  );
};

export default SwitchElement;
