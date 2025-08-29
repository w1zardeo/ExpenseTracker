import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, radius, spacingY, spacingX } from "../constants/theme";
import { verticalScale, scale } from "react-native-size-matters";
import Typo from "../components/Typo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import useFetchData from "../hooks/useFetchData";
import { where, orderBy } from "firebase/firestore";
import Loading from "../components/Loading";
import WalletListItem from "../components/WalletListItem";

function WalletScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    data: wallets,
    error,
    loading,
  } = useFetchData("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);
  // console.log('wallets', wallets.length);

  const getTotalBalance = () => {
    return wallets.reduce((total, item) => {
        return total + (item.amount || 0);
    }, 0);
};


  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight="500">
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total balance
            </Typo>
          </View>
        </View>

        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight="500">
              My Wallets
            </Typo>
            <TouchableOpacity
              onPress={() => navigation.navigate("WalletModal")}
            >
              <Ionicons
                name="add-circle"
                color={colors.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>
          {loading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return <WalletListItem item={item} index={index}/>;
            }}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
