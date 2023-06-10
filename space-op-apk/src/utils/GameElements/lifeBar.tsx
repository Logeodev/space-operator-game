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
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const interpolatedColor = animatedValue.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ['#cd1616', '#004cff', "#2ec56d"],
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
            backgroundColor: interpolatedColor
        }
    })

    return (
        <View style={barStyle.container}>
            <Animated.View style={barStyle.life} />
        </View>
    );
};

export default LifeBarElement;
