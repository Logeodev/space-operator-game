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

  const handleSwitchToggle = (newValue: boolean) => {
  setSwitchValue(newValue);
  
  if(resultButton != undefined && resultSwitch != undefined){
    switchPressed(resultButton, resultSwitch)
  }      
  
  };

  const switchPressed = (resultButtonStore : resultButton, resultSwitchStore : resultSwitch) => {
    if(resultSwitchStore?.ids.filter(i => i === id).length > 0){
      delete resultSwitchStore.ids[resultSwitchStore.ids.findIndex(i => i === id)]
      dispatch(setOperationGregory(resultButtonStore, 
                                  addResultSwitch(resultSwitchStore.ids.filter(r => r != undefined)
                                                 )
                                  )
              )
      
    } else {
      dispatch(setOperationGregory(
                                  resultButtonStore, 
                                  addResultSwitch(
                                                  resultSwitchStore.ids.concat([id])
                                                 )
                                  )
              )
    
    
    }



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
