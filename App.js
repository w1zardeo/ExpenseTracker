import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthProvider from './contexts/authContext';
import { navigationRef } from "./services/navigationService";

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
    </AuthProvider>
  );
}
