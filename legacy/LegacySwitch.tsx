import MaskedView from '@react-native-masked-view/masked-view';
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

export interface LegacySwitchProps {
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


const LegacySwitch: FC<LegacySwitchProps> = ({
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

    const translateX = useRef(new Animated.Value(value ? -SIZE * 0.25 : -SIZE * 0.75)).current;

    useEffect(() => {
        if (animationType == 'timing')
            Animated.timing(translateX, {
                toValue: value ? -SIZE * 0.25 : -SIZE * 0.75,
                duration: duration,
                useNativeDriver: false,
                //@ts-ignore
                easing: Easing.in,
            }).start();
        else
            Animated?.spring(translateX, {
                toValue: value ? -SIZE * 0.25 : -SIZE * 0.75,
                mass: 1,
                damping: 20,
                stiffness: springSpeed,
                overshootClamping: false,
                restSpeedThreshold: 1,
                restDisplacementThreshold: 0.001,
                useNativeDriver: false
            }).start();

    }, [value]);

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
            darkKnob: {
                width: SIZE * 0.36,
                height: SIZE * 0.36,
                //@ts-ignore
                backgroundColor: inactiveKnobColor != activeKnobColor ? translateX.interpolate({
                    inputRange: [-SIZE * 0.75, -SIZE * 0.26],
                    outputRange: [inactiveKnobColor, activeKnobColor],
                }) : activeKnobColor,
                borderRadius: SIZE * 0.18,
            },
            textContainer: {
                transform: [
                    {
                        translateX: translateX as unknown as number,
                    },
                ],
                position: "absolute",
                width: SIZE * 2,
                //@ts-ignore
                backgroundColor: translateX.interpolate({
                    inputRange: [-SIZE * 0.75, -SIZE * 0.26],
                    outputRange: [inactiveColor, activeColor],
                }),
                height: SIZE * 0.6,
                top: -(SIZE * 0.05),
                borderRadius: SIZE * 0.5,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: SIZE * 0.3,
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
    }, [translateX, SIZE, elevation, inactiveTextStyle, activeTextStyle, textStyle, inactiveColor, activeColor, inactiveKnobColor, activeKnobColor])

    const onChangeButton = useCallback((e) => {
        onChange(!value, e)
    }, [value, onChange])

    return (
        <Pressable style={{ overflow: 'hidden' }} onPress={onChangeButton}>
            <Animated.View style={styles.wrapper}>
                <MaskedView maskElement={<Animated.View style={styles.container} />}>
                    <View style={styles.container}>
                        <Animated.View style={styles.textContainer}>
                            {activeText ? <Text style={styles.activeText}>{activeText}</Text> : null}
                            <Animated.View style={styles.darkKnob} />
                            {inactiveText ? <Text style={styles.inActiveText}>{inactiveText}</Text> : null}
                        </Animated.View>
                    </View>
                </MaskedView>
            </Animated.View>
        </Pressable>
    );
}

export default LegacySwitch