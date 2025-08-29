import { TouchableOpacity, View, StyleSheet } from "react-native";
import { verticalScale } from "../utils/styling";
import { colors, radius, spacingX } from "../constants/theme";
import { Image } from "expo-image";
import Typo from "./Typo";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function WalletListItem({ item, index }) {
    const navigation = useNavigation();


    const openWallet = () => {
    navigation.navigate("WalletModal", {
        id: item?.id,
        name: item?.name,
        image: item?.image
    });
};


  return (
    <TouchableOpacity onPress={openWallet} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={(item?.image) || undefined}
          contentFit="cover"
          transition={100}
        />
      </View>

      <View style={styles.nameContainer}>
        <Typo size={16}>{item?.name }</Typo>
        <Typo size={14} color={colors.neutral400}>${item?.amount}</Typo>
      </View>

      <Ionicons name="chevron-forward" size={verticalScale(20)} color={colors.white}/>
    </TouchableOpacity>
  );
}

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,  
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden", 
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    flex: 1,
    marginLeft: spacingX._10,
  },
});
