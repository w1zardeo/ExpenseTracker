import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import Typo from "./Typo";
import { verticalScale } from "../utils/styling";
import { scale } from "react-native-size-matters";
import { getFilePath } from "../services/imageService";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };

  return (
    <View>
      {!file ? (
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color={colors.neutral200}
          />
          {placeholder && <Typo size={15}>{placeholder}</Typo>}
        </TouchableOpacity>
      ) : (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image
            style={{ flex: 1 }}
            source={getFilePath(file)}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
            <Ionicons
              name="close"
              size={verticalScale(24)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height: scale(150),
    width: scale(150),
    borderRadius: radius._15,
    overflow: "hidden",
  },
  deleteIcon: {
    position: "absolute",
    top: scale(6),
    right: scale(6),
    shadowColor: colors.black,
    borderRadius: 10,
    padding: 4,
  },
});
