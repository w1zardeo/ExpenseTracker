import { StyleSheet, Text, View } from "react-native";
import {colors} from '../constants/theme';
import { verticalScale } from "../utils/styling";

const Typo = ({
    size,
    color = colors.text,
    fontWeight = '400',
    children, 
    style,
    textProps = {},
}) => {
    const textStyle = {
        fontSize: size ? verticalScale(size) : verticalScale(18),
        color,
        fontWeight
    };
    return <Text style={[textStyle, style]} {...textProps}>{children}</Text>
}

export default Typo;