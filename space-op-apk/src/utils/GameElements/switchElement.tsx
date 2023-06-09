import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import newShade from '../newShade';

interface Props {
  id: number,
  valueType: "string" | "color",
  value: string
}

const SwitchElement: React.FC<Props> = ({ id, valueType, value }) => {
  const [switchValue, setSwitchValue] = useState(false);

  const colorBright = valueType === 'color'? value : '#00ff00'
  const colorDark = valueType === 'color'? newShade(value,-120) : '#70a070'

  const handleSwitchToggle = (newValue: boolean) => {
    setSwitchValue(newValue);
  };

  const switchStyle = StyleSheet.create({
    background: {
      margin: 10,
      width: 110,
      height: 50,
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
