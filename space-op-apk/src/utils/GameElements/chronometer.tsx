import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

interface Props {
    totalTime: number
    time: number
}

const ChronometerDisplay: React.FC<Props> = ({ time, totalTime }) => {
    const elapsedTime = Math.floor(time / totalTime * 100)
    const animatedValue = useRef(new Animated.Value(elapsedTime)).current;
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: elapsedTime,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [elapsedTime]);

    const interpolatedColor = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ["#ff0000", "#00eaff"]
    });

    const size = 100
    const barStyle = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            height: size,
            width: size,
            borderRadius: Math.floor(size / 2),
            backgroundColor: "#a8a8a8"
        },
        life: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: Math.floor(size / 2),
            zIndex:9999
        }
    });

    const circleProgressStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [2, 1]
                })
            }
        ]
    };

    return (
        <View style={barStyle.container}>
            <Animated.View style={[
                barStyle.life,
                circleProgressStyle,
                { backgroundColor: interpolatedColor }
            ]} />
            <View><Text>{elapsedTime}</Text></View>
        </View>
    );
};

export default ChronometerDisplay;
