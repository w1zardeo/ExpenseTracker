import { View, Text, StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "./Typo";
import { colors, spacingX, spacingY } from "../constants/theme";
import { scale } from "../utils/styling";
import { verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

function HouseCard() {
  return (
    <ScreenWrapper>
      <View style={styles.card}>
        {/* Верхня частина */}
        <View style={styles.topRow}>
          <Typo color={colors.neutral800} size={17} fontWeight="500">
            Total Balance
          </Typo>
          <Ionicons
            name="ellipsis-horizontal"
            size={verticalScale(22)}
            color={colors.neutral700}
          />
        </View>

        {/* Баланс */}
        <Typo color={colors.black} size={30} fontWeight="bold">
          $2343.23
        </Typo>

        {/* Income / Expense */}
        <View style={styles.statsRow}>
          {/* Income */}
          <View style={styles.statsBlock}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="arrow-down"
                size={verticalScale(16)}
                color={colors.black}
              />
            </View>
            <Typo size={15} color={colors.neutral700} fontWeight="500">
              Income
            </Typo>
            <Typo size={15} color={colors.green} fontWeight="600">
              $2342
            </Typo>
          </View>

          {/* Expense */}
          <View style={styles.statsBlock}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="arrow-up"
                size={verticalScale(16)}
                color={colors.black}
              />
            </View>
            <Typo size={15} color={colors.neutral700} fontWeight="500">
              Expense
            </Typo>
            <Typo size={15} color={colors.rose} fontWeight="600">
              $23424
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default HouseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacingX._20,
    marginTop: -scale(50),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // для Android тіні
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacingY._15,
  },
  statsBlock: {
    alignItems: "center",
    gap: 3,
  },
  iconWrapper: {
    backgroundColor: colors.neutral300,
    padding: spacingY._5,
    borderRadius: 50,
    marginBottom: 3,
  },
});