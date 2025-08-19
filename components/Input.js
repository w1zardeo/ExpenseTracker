import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors, radius, spacingX } from "../constants/theme";
import { verticalScale } from "../utils/styling";

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
        {
            props.icon && props.icon
        }
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    paddingHorizontal: spacingX._15
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14)
  }
});
