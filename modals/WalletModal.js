import { View, Alert, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalWrapper from "../components/ModalWrapper";
import Typo from "../components/Typo";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import ImageUpload from "../components/imageUpload";
import Button from "../components/Button";
import { useAuth } from "../contexts/authContext";
import { createOrUpdateWallet, deleteWallet } from "../services/walletService";
import { colors, spacingY, spacingX } from "../constants/theme";
import { verticalScale, scale } from "../utils/styling";
import { Ionicons } from "@expo/vector-icons";

function WalletModal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, updateUserData } = useAuth();

  // отримуємо params (якщо гаманець відкритий на редагування)
  const { id, name: oldName, image: oldImage } = route.params || {};

  const [wallet, setWallet] = useState({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setWallet({
        name: oldName || "",
        image: oldImage || null,
      });
    }
  }, [id, oldName, oldImage]);

  const onSubmit = async () => {
    const { name, image } = wallet;

    if (!name.trim() && !image) {
      Alert.alert("User", "Please fill all the fields");
      return;
    }

    const data = {
      id: id || undefined, // якщо редагуємо, передаємо id
      name,
      image,
      uid: user?.uid,
    };

    setLoading(true);
    const res = await createOrUpdateWallet(data);
    setLoading(false);

    if (res.success) {
      updateUserData(user?.uid);
      navigation.goBack();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  const onDelete = async () => {
    if (!id) return;
    setLoading(true);
    const res = await deleteWallet(id);
    setLoading(false);
    if (res.success) {
        navigation.goBack();
    } else {
        Alert.alert('wallet', res.msg)
    }
    
  }

  const showDeleteAlert = () => {
    Alert.alert(
        "Confirm",
        "Are you sure you want to do this n\This action will remove all the transaction releted to this wallet",
        [
            {
                text: 'Cancel',
                onPress: ()=> {},
                style:'cancel'
            },
            {
                text: 'Delete',
                onPress: ()=> onDelete(),
                style:'destructive'
            }
        ]
    )
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) =>
                setWallet((prev) => ({ ...prev, name: value }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icon</Typo>
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet((prev) => ({ ...prev, image: null }))}
              onSelect={(file) =>
                setWallet((prev) => ({ ...prev, image: file }))
              }
              placeholder="Upload Image"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {id && !loading && (
          <Button onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Ionicons
              name="trash"
              color={colors.white}
              size={verticalScale(24)}
            />
          </Button>
        )}
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight="700">
            {id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
}

export default WalletModal;

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
  inputContainer: {
    gap: spacingY._10,
  },
});
