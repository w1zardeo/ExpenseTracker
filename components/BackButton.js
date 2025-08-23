import { colors, radius } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ style, iconSize = 30 }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, style]}
    >
      <Ionicons
        name="chevron-back"
        size={verticalScale(iconSize)}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: 'flex-start',
    borderRadius: radius._12,
    padding: 5
  },
});
