import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "../components/Typo";
import { colors, spacingX, spacingY } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { Ionicons } from "@expo/vector-icons";
import { isLoading } from "expo-font";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";

export default function LoginScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {login: loginUser} = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current && !passwordRef.current) {
      Alert.alert("Login", "Please fill all the field")
      return;
    }
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Login", res.msg)
    } else {
      navigation.navigate('Tabs')
    }
    
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={30} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight="800">
            Hey,
          </Typo>
          <Typo size={30} fontWeight="800">
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login now to track all your expenses
          </Typo>
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Ionicons
                name="mail"
                size={verticalScale(26)}
                color={colors.neutral300}
                style={{ marginRight: spacingX._10 }}
              />
            }
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Ionicons
                name="lock-closed"
                size={verticalScale(26)}
                color={colors.neutral300}
                style={{ marginRight: spacingX._10 }}
              />
            }
          />

          <Typo size={14} color={colors.text} style={{alignSelf: 'flex-end'}}>Fogot Password</Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight="700" color={colors.black} size={21}>Sign in</Typo>
          </Button>

          <View style={styles.footer}>
            <Typo size={15}>Don't have account?</Typo>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Typo size={15} fontWeight="700" color={colors.primary}>Sign Up</Typo>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "center",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
