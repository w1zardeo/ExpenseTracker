import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { spacingY, spacingX, colors } from "../constants/theme";
import { scale } from "../utils/styling";
import { verticalScale } from "../utils/styling";
import ModalWrapper from "../components/ModalWrapper";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import Typo from "../components/Typo";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useAuth } from "../contexts/authContext";
import { updateUser } from "../services/userService";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getProfileImage } from "../services/imageService";

function ProfileModal() {
  const navigation = useNavigation();
  const { user, updateUserData } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    image: null
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || ""
    });
  }, [user]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    const name = userData.name.trim();
    if (!name) {
      Alert.alert("Name", "Please fill all the fields");
      return;
    }
    setLoading(true);
    const res = await updateUser(user?.uid, userData); // відправляй тільки name
    setLoading(false);
    if (res.success) {
      await updateUserData(user?.uid); // ✅ чекаємо оновлення
      navigation.goBack();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={getProfileImage(userData.image)}/>

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons
                onPress={onPickImage}
                name="pencil"
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(value) =>
                setUserData({ ...userData, name: value })
              }
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight="700">
            Update
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
}

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingX._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
