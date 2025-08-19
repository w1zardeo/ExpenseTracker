import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from './BottomTabs';

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
    </Stack.Navigator>
  );
}

export default AppNavigator;