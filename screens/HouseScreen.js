import { View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { spacingX, spacingY } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import { colors } from "../constants/theme";
import Typo from "../components/Typo";
import { useAuth } from "../contexts/authContext";
import { Ionicons } from "@expo/vector-icons";
import HouseCard from "../components/HouseCard";
import TransactionList from "../components/TransactionList";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

function HouseScreen() {
const {user} = useAuth();
const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{gap: 4}}>
             <Typo size={16} color={colors.neutral400}>Hello,</Typo>
             <Typo size={20} fontWeight="500" color={colors.neutral400}>{user?.name}</Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={verticalScale(22)} color={colors.neutral200} />
          </TouchableOpacity>
        </View>


        <ScrollView contentContainerStyle={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>

          <View>
            <HouseCard/>
          </View>

          <TransactionList data={[1, 2, 3, 4, 5, 6]} loading={false} emptyListMessage='No Transaction added yet' title="Recent Transactions"/>

        </ScrollView>

        <Button style={styles.floatingButton} onPress={() => navigation.navigate('TransactionModal')}>
          <Ionicons name="add" size={verticalScale(23)} color={colors.black}/>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

export default HouseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingX._10
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: verticalScale(30),
    right: verticalScale(30)
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25
  }
});
