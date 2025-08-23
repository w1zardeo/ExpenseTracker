import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import Header from "../components/Header";
import Typo from "../components/Typo";
import { useAuth } from "../contexts/authContext";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const accountOptions = [
    {
      title: "Edit Profile",
      icon: (
        <Ionicons name="person" size={26} color={colors.white} weight="fill" />
      ),
      routeName: "ProfileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: (
        <Ionicons
          name="settings"
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      //   routeName: '/(modals)/profileModal',
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: (
        <Ionicons
          name="lock-closed"
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      //   routeName: '/(modals)/profileModal',
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: (
        <Ionicons
          name="log-out-outline"
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      // routeName: "/(modals)/profileModal",
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
     navigation.reset({ // <-- Очищаємо стек і переходимо на Login
        index: 0,
        routes: [{ name: "Welcome" }],
      });
  }

  const showLogoutAlert = () => {
    Alert.alert('Confirm', "Are you sure you want to logout", [
        {
            text: 'Cancel',
            onPress: () => console.log('cancel logout'),
            style: 'cancel'
        },
        {
            text: 'Logout',
            onPress: () => handleLogout(),
            style: 'destructive'
        }
    ])
  }



  const handlePress = async (item) => {
    if (item.title == 'Logout') {
        showLogoutAlert();
    }

    if (item.routeName) navigation.navigate(item.routeName)
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={user?.image}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight="600">
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => {
            return (
              <View 
              key={index.toString()}
              style={styles.listItem}>
                <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                  <View
                    style={[
                      styles.listIcon,
                      {
                        backgroundColor: item?.bgColor,
                      },
                    ]}
                  >
                    {item.icon && item.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight="500">
                    {item.title}
                  </Typo>
                  <Ionicons
                    name="chevron-forward"
                    size={verticalScale(20)}
                    weight="bold"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
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
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
