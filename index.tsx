import MaskedView from '@react-native-masked-view/masked-view';
import React, { FC, useCallback, useMemo } from "react";
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export interface SwitchProps {
    value: boolean
    onChange: (newValue: boolean, e?: GestureResponderEvent) => void
    activeKnobColor?: string
    inactiveKnobColor?: string
    elevation?: number
    inactiveColor: string
    activeColor: string
    activeText?: string
    inactiveText?: string
    activeTextStyle?: StyleProp<TextStyle>
    inactiveTextStyle?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    size?: number
    animationType?: 'timing' | 'spring'
    duration?: number
    springSpeed?: number
}

const Switch: FC<SwitchProps> = ({
    value,
    onChange,
    activeColor,
    inactiveColor,
    size: SIZE = 60,
    elevation = 0,
    activeKnobColor = '#fff',
    inactiveKnobColor = '#fff',
    activeText = '',
    inactiveText = '',
    activeTextStyle,
    inactiveTextStyle,
    textStyle,
    animationType = 'spring',
    duration = 100,
    springSpeed = 250
}) => {

    const sharedValue = useSharedValue(value ? -SIZE * 0.25 : -SIZE * 0.75)

    const darkKnobStyle = useAnimatedStyle(() => {
        return {
            width: SIZE * 0.36,
            height: SIZE * 0.36,
            backgroundColor: inactiveKnobColor != activeKnobColor ? interpolateColor(sharedValue.value, [-SIZE * 0.75, -SIZE * 0.26], [inactiveKnobColor, activeKnobColor],) : activeKnobColor,
            borderRadius: SIZE * 0.18,
        }
    });

    const textContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: animationType == 'spring' ?
                        withSpring(sharedValue.value, {
                            mass: 1,
                            damping: 20,
                            stiffness: springSpeed,
                            overshootClamping: false,
                            restSpeedThreshold: 1,
                            restDisplacementThreshold: 0.001,
                        }) :
                        withTiming(sharedValue.value, {
                            duration: duration,
                            easing: Easing.in(Easing.ease),
                        }),
                },
            ],
            position: "absolute",
            width: SIZE * 2,
            backgroundColor: interpolateColor(sharedValue.value, [-SIZE * 0.75, -SIZE * 0.26], [inactiveColor, activeColor],),
            height: SIZE * 0.6,
            top: -(SIZE * 0.05),
            borderRadius: SIZE * 0.5,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: SIZE * 0.3,
        }
    });

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                width: SIZE * 1,
                backgroundColor: "white",
                height: SIZE * 0.5,
                borderRadius: SIZE * 0.25,
                elevation: elevation ? elevation : undefined,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: SIZE * 0.05,
            },
            inActiveText: {
                color: "white",
                fontSize: 12,
                ...StyleSheet.flatten(textStyle || {}),
                ...StyleSheet.flatten(activeTextStyle || {}),
                position: 'absolute',
                left: SIZE + SIZE * 0.18,
                width: SIZE * 0.5,
                textAlign: 'center',
            },
            activeText: {
                color: "white",
                fontSize: 12,
                ...(StyleSheet.flatten(textStyle || {})),
                ...StyleSheet.flatten(inactiveTextStyle || {}),
                position: 'absolute',
                right: SIZE + SIZE * 0.18,
                width: SIZE * 0.5,
                textAlign: 'center',
            },
            wrapper: {
                width: SIZE * 1,
                height: SIZE * 0.5,
                borderRadius: SIZE * 0.25,
                elevation: elevation ? elevation : undefined,
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "row",
            },
        })
    }, [SIZE, elevation, inactiveTextStyle, activeTextStyle, textStyle,])

    const onChangeButton = useCallback((e: GestureResponderEvent) => {
        sharedValue.value = !value ? -SIZE * 0.25 : -SIZE * 0.75
        onChange(!value, e)
    }, [value, onChange])

    return (
        <Pressable style={{ overflow: 'hidden' }} onPress={onChangeButton}>
            <Animated.View style={styles.wrapper}>
                <MaskedView maskElement={<Animated.View style={styles.container} />}>
                    <View style={styles.container}>
                        <Animated.View style={textContainerStyle}>
                            {activeText ? <Text style={styles.activeText}>{activeText}</Text> : null}
                            <Animated.View style={darkKnobStyle} />
                            {inactiveText ? <Text style={styles.inActiveText}>{inactiveText}</Text> : null}
                        </Animated.View>
                    </View>
                </MaskedView>
            </Animated.View>
        </Pressable>
    );
}

export default Switch