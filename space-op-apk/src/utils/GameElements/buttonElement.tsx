import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface Props {
    id: number,
    valueType: "number" | "color",
    value: number | string
}

const ButtonElement: React.FC<Props> = ({ id, valueType, value }) => {
    const style = StyleSheet.create({
        buttonStyle: {
            margin: 10,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: valueType === 'color' ? value as string : '#0000FF',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            elevation: 10
        },
        numberText: {
            fontSize: 55,
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
        }
    });

    return (
        <TouchableOpacity>
            {
                valueType === 'number' ?
                    <View style={style.buttonStyle}>
                        <Text style={style.numberText}>{value}</Text>
                    </View>
                    :
                    <View style={style.buttonStyle} />
            }
        </TouchableOpacity>
    );
};

export default ButtonElement;