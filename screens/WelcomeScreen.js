import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { colors, spacingY, spacingX } from "../constants/theme";
import ScreenWrapper from "../components/ScreenWrapper";
import { verticalScale } from "react-native-size-matters";
import Typo from "../components/Typo";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')} >
          <Typo fontWeight="500">Sign In</Typo>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={{ alignItems: "center" }}>
          <Typo size={30} fontWeight="800">
            Always take control
          </Typo>
          <Typo size={30} fontWeight="800">
            of your finances
          </Typo>
        </View>

        <View style={{alignItems: 'center', gap: 2}}>
            <Typo size={17} color={colors.textLight}>
                Finances must be arranged to set better
            </Typo>
            <Typo size={17} color={colors.textLight}>
                lifestyle in future
            </Typo>
        </View>

        <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate('Register')}>
                <Typo size={22} color={colors.neutral900} fontWeight="600">
                    Get started
                </Typo>
            </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacingY._7,
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
