import { GestureResponderEvent, StyleProp, TextStyle } from "react-native";


declare module "rn-switch-animated" {

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

    export default function SwitchAnimated(props: SwitchAnimatedProps): React.FC<SwitchAnimatedProps>

}