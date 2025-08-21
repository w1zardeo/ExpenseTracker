import { Dimensions, Platform, StatusBar, Text, View, StyleSheet } from "react-native";
import { colors, spacingX, spacingY } from "../constants/theme";


export default function ModalWrapper({ style, children, bg=colors.neutral800 }) {
  return (
    <View style={[styles.container, {backgroundColor: bg}, style && style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20
  }
});
