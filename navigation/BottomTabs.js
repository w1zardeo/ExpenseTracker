import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HouseScreen from "../screens/HouseScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../constants/theme";
import { verticalScale } from "../utils/styling";

const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarActiveTintColor: colors.primary,   // активний – зелений
        tabBarInactiveTintColor: "gray",  // неактивний – сірий
        contentStyle: { backgroundColor: "black" },
        tabBarStyle: { backgroundColor: colors.neutral800 },
        tabBarIconStyle: { marginTop: verticalScale(10) }
      }}
    >
      <BottomTabs.Screen
        name="House"
        component={HouseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={verticalScale(30)} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={verticalScale(30)} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={verticalScale(30)} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={verticalScale(30)} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomTabsNavigator;
