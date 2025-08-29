import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";
import WalletModal from "../modals/WalletModal";
import ProfileModal from "../modals/ProfileModal";
import TransactionModal from "../modals/TransactionModal";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletModal"
        component={WalletModal}
        options={{
          headerShown: false,
          presentation: "modal", // відкриває як модалку
          animation: "slide_from_bottom", // анімація знизу
        }}
      />
      <Stack.Screen
        name="ProfileModal"
        component={ProfileModal}
        options={{
          headerShown: false,
          presentation: "modal", // відкриває як модалку
          animation: "slide_from_bottom", // анімація знизу
        }}
      />
      <Stack.Screen
        name="TransactionModal"
        component={TransactionModal}
        options={{
          headerShown: false,
          presentation: "modal", // відкриває як модалку
          animation: "slide_from_bottom", // анімація знизу
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
