import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface Props {
    value: number;
}

const LifeBarElement: React.FC<Props> = ({ value }) => {
    const animatedValue = useRef(new Animated.Value(value)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const interpolatedColor = animatedValue.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ['#ff0000', '#f2ff00', "#2ec56d"],
    });

    const barStyle = StyleSheet.create({
        container: {
            padding: 2,
            height: 60,
            width: '100%',
            maxWidth: 400,
            backgroundColor: "#a8a8a8"
        },
        life: {
            height: '95%',
            width: `${value}%`,
        }
    })

    return (
        <View style={barStyle.container}>
            <Animated.View style={[barStyle.life, {backgroundColor:interpolatedColor}]} />
        </View>
    );
};

export default LifeBarElement;
