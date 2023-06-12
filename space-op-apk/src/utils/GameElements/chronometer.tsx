import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface Props {
  totalTime: number,
  elapsedTime: number
}

const ChronometerDisplay: React.FC<Props> = ({ totalTime, elapsedTime }) => {
    const animatedValue = useRef(new Animated.Value(elapsedTime)).current;
    
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: elapsedTime,
            duration: totalTime,
            useNativeDriver: false,
        }).start();
    }, [elapsedTime]);

    const interpolatedColor = animatedValue.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ["#00eaff" , '#d4d942', '#ff0000'],
    });

    const size = 100
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius:Math.floor(size/2)
        }
    });

    const circleProgressStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, totalTime],
                    outputRange: [1, 0.1]
                })
            }
        ]
    };

    return (
        <View style={barStyle.container}>
            <Animated.View style={[
                barStyle.life, 
                circleProgressStyle, 
                { backgroundColor:interpolatedColor }
            ]} />
        </View>
    );
};

export default ChronometerDisplay;
