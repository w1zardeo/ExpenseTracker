import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, radius, spacingY, spacingX } from "../constants/theme";
import { verticalScale, scale } from "react-native-size-matters";
import Typo from "../components/Typo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function WalletScreen() {
    const navigation = useNavigation();
    const getTotalBalance = () => {
        return 2344;
    }

  return (
    <ScreenWrapper style={{backgroundColor: colors.black}}>
        <View style={styles.container}>
            <View style={styles.balanceView}>
                <View style={{alignItems: 'center'}}>
                    <Typo size={45} fontWeight="500">
                        ${getTotalBalance()?.toFixed()}
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
                    <TouchableOpacity onPress={() => navigation.navigate('WalletModal')}>
                        <Ionicons
                        name="add-circle"
                        color={colors.primary}
                        size={verticalScale(33)}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScreenWrapper>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    balanceView: {
        height: verticalScale(160),
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacingY._10
    },
    wallets: {
        flex: 1,
        backgroundColor: colors.neutral900,
        borderTopRightRadius: radius._30,
        borderTopLeftRadius: radius._30,
        padding: spacingX._20,
        paddingTop: spacingX._25
    },
    listStyle: {
        paddingVertical: spacingY._25,
        paddingTop: spacingY._15
    }
});
