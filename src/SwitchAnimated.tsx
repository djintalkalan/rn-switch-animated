import MaskedView from "@react-native-community/masked-view";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";

interface SwitchAnimatedProps {
    value: boolean,
    onChange: (newValue: boolean, e?: GestureResponderEvent) => void,
    activeKnobColor?: string,
    inactiveKnobColor?: string,
    animationSpeed?: number,
    elevation?: number,
    inactiveColor: string,
    activeColor: string,
    activeText?: string,
    inactiveText?: string
    activeTextStyle?: StyleProp<TextStyle>
    inactiveTextStyle?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    size: number
}


const SwitchAnimated: FC<SwitchAnimatedProps> = (props) => {
    const { activeColor, size: SIZE = 60, animationSpeed = 100, elevation = 0, inactiveColor, activeKnobColor = 'white', inactiveKnobColor = 'white', onChange, activeText = '', activeTextStyle, inactiveTextStyle, textStyle, inactiveText = '', value } = props
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? -SIZE * 0.25 : -SIZE * 0.75,
            duration: animationSpeed,
            useNativeDriver: false,
            //@ts-ignore
            easing: Easing.in,
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
        <TouchableOpacity style={{ overflow: 'hidden' }} activeOpacity={0.8} onPress={onChangeButton}>
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
        </TouchableOpacity>
    );
}

export default SwitchAnimated
