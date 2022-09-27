# rn-switch-animated
This is a switch component with animation. We can add custom text for on/off state and these are optionals, also can control background and knob color for both on and off state. This support 'spring' and 'timing' animation. Use of react-native-animated api is optional, you can use this without installing reanimated package.

<img src="working.gif" width="300px">

# INSTALLATION

install npm library
```
yarn add rn-switch-animated
```

This library is using @react-native-community/masked-view. Please install if not installed.

```
yarn add @react-native-community/masked-view
```

(DEFAULT USED BUT CAN BE SKIPPED) This library also using react-native-reanimated v2 as default animation library, you have to install reanimated package. If you want to skip this, you must use Legacy switch from 'rn-switch-animated/legacy/LegacySwitch'.
```
yarn add react-native-reanimated
```

# USAGE

Import library if using react-native-reanimated v2
```
import Switch from 'rn-switch-animated';
```

Import library if not using reanimated v2

```
import Switch from 'rn-switch-animated/legacy/LegacySwitch';
```

use component
```
 const [on, setOn] = useState(false)
  return <Switch
      value={on}
      onChange={setOn}
      springSpeed={250}
      animationType={'spring'}
      elevation={0}
      inactiveColor={colors?.colorGreyInactive}
      activeColor={colors.colorPrimary}
      activeText={'ON'}
      inactiveText={'OFF'}
      size={scaler(60)}
      activeTextStyle={{}}
      inactiveTextStyle={{}}
    />
```


SwitchProps
```
    value: boolean,
    onChange: (newValue: boolean, e?: GestureResponderEvent) => void,
    activeKnobColor?: string,
    inactiveKnobColor?: string,
    animationType?: 'spring' | 'timing'
    elevation?: number,
    inactiveColor: string,
    activeColor: string,
    activeText?: string,
    inactiveText?: string
    activeTextStyle?: StyleProp<TextStyle>
    inactiveTextStyle?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    size?: number
    duration?: number
    springSpeed?: number
```


prop names |type |default value | required | comment 
--- | --- | --- | --- | ---
value | Bool |  | required | Value for switch
onChange | Function |  | required | This prop change the state of switch
activeKnobColor | ColorValue | 'white' |  | Changes knob color for active switch
inactiveKnobColor | ColorValue | 'white' |  | Changes knob color for inactive switch
elevation | Number |  |  | Changes elevation of Switch
inactiveColor | ColorValue |   | required | Background color of inactive switch
activeColor | ColorValue |   | required | Background color of active switch
inactiveText | String |  |  | Text at the side of Nob at inactive switch
activeText | String |  |  | Text at the side of Nob at active switch
activeTextStyle | Style |  |  | Style for active text
inactiveTextStyle | Style |  |  | Style for inactive text
textStyle | Style |  |  | Style for both inactive and active text
size | Number | 60 |  | Size of the switch
animationType | 'spring' \| 'timing' | 'spring' | | This is transition animation type of switch
duration | Number | 100 |  | Changes animation duration of switch when selected animation type is `timing`
springSpeed | Number | 250 |  | This changed animation speed when selected animation type is `spring`a