import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
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
import { colors, spacingY, spacingX, radius } from "../constants/theme";
import { verticalScale, scale } from "../utils/styling";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { expenseCategories, transactionTypes } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import { orderBy, where } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

function TransactionModal() {
  const { user, updateUserData } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const {
    data: wallets,
    error: walletError,
    loading: walletLoading,
  } = useFetchData("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transaction, setTransaction] = useState({
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "",
    image: null,
  });

  const { id, name: oldName, image: oldImage } = route.params || {};

  //   useEffect(() => {
  //     if (id) {
  //       setTransaction({
  //         name: oldName || "",
  //         image: oldImage || null,
  //       });
  //     }
  //   }, [id, oldName, oldImage]);

  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } =
      transaction;

    if (!walletId || !date || !amount || (type == "expense" && !category)) {
      Alert.alert("Transaction", "Please fill all the field");
      return;
    }

    let transactionData = {
      type,
      amount,
      description,
      category,
      date,
      walletId,
      image,
      uid: user?.uid
    };

    console.log(transactionData);
    
  };

  const onDelete = async () => {
    if (!id) return;
    setLoading(true);
    const res = await deleteWallet(id);
    setLoading(false);
    if (res.success) {
      navigation.goBack();
    } else {
      Alert.alert("wallet", res.msg);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to do this nThis action will remove all the transaction releted to this wallet",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ]
    );
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || transaction.date;
    setTransaction({ ...transaction, date: currentDate });
    // showDatePicker(false);
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView
          contentContainerStyle={styles.form}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Type</Typo>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              // placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              // placeholder={!isFocus ? "Select item" : "..."}
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet</Typo>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={wallets.map((wallet) => ({
                label: `${wallet?.name} $(${wallet.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Select wallet"}
              value={transaction.walletId}
              onChange={(item) => {
                setTransaction({ ...transaction, walletId: item.value });
              }}
            />
          </View>

          {transaction.type == "expense" && (
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Expense Category</Typo>
              <Dropdown
                style={styles.dropdownContainer}
                activeColor={colors.neutral700}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                placeholder={"Select category"}
                value={transaction.category}
                onChange={(item) => {
                  setTransaction({ ...transaction, category: item.value });
                }}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Date</Typo>
            {!showDatePicker && (
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Typo size={14}>{transaction.date.toLocaleDateString()}</Typo>
              </Pressable>
            )}

            {showDatePicker && (
              <View>
                <DateTimePicker
                  themeVariant="dark"
                  value={transaction.date}
                  textColor={colors.white}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                />
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Typo size={15} fontWeight="500">
                    OK
                  </Typo>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Amount</Typo>
            <Input
              keybodardType="numeric"
              value={transaction.amount?.toString()}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral200}>Description</Typo>
              <Typo color={colors.neutral500}>(optional)</Typo>
            </View>
            <Input
              value={transaction.description}
              multiline
              containerStyle={{
                flexDirection: "row",
                height: verticalScale(100),
                alignItems: "flex-start",
                paddingVertical: 15,
              }}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  description: value,
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral200}>Receipt</Typo>
              <Typo color={colors.neutral500}>(optional)</Typo>
            </View>
            <ImageUpload
              file={transaction.image}
              onClear={() =>
                setTransaction((prev) => ({ ...prev, image: null }))
              }
              onSelect={(file) =>
                setTransaction((prev) => ({ ...prev, image: file }))
              }
              placeholder="Upload Image"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {id && !loading && (
          <Button
            onPress={showDeleteAlert}
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
            {id ? "Update" : "Submit"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
}

export default TransactionModal;

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
  inputContainer: {
    gap: spacingY._10,
  },
  iosDropdown: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    fontSize: verticalScale(14),
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingY._7,
    marginRight: spacingX._7,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._10,
  },
  dropdownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  dropdownItemText: { color: colors.white },
  dropdownSelectedText: {
    color: colors.white,
    fontSize: verticalScale(14),
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
  },
  dropdownPlaceholder: {
    color: colors.white,
  },
  dropdownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
