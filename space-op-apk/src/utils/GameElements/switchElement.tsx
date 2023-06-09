import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
  id: number,
  valueType: "string" | "color",
  value: string
}

const SwitchElement: React.FC<Props> = ({ id, valueType, value }) => {
  const [switchValue, setSwitchValue] = useState(false);

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
      width: '50%',
      height: '100%',
      backgroundColor: switchValue ? '#00ff00' : '#7a7a7a',
    }
  });

  return (
    <TouchableOpacity onPress={() => handleSwitchToggle(!switchValue)}>
      <View style={switchStyle.background}>
        <View style={switchStyle.square} />
      </View>
    </TouchableOpacity>
  );
};

export default SwitchElement;
