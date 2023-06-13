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

    const size = 70
    const barStyle = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            height: size,
            width: size,
            borderRadius: Math.floor(size/2),
            backgroundColor: "#a8a8a8"
        },
        life: {
            height:size,
            width:size
        }
    });

    const circleProgress = {
        borderRadius: animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [Math.floor(size/0.05), Math.floor(size/2)]
        }),
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1]
                })
            }
        ],
        color: animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ["#ff0000", "#26ff00"]
        })
    };

    return (
        <View style={barStyle.container}>
            <Animated.View style={[
                barStyle.life,
                { 
                    backgroundColor: circleProgress.color,
                    transform:circleProgress.transform,
                    borderRadius:circleProgress.borderRadius
                }
            ]} />
        </View>
    );
};

export default ChronometerDisplay;
