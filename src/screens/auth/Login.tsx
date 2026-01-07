import { StatusBar } from 'react-native';
import Login from '../../components/auth/LogIn';
import ScreenHeader from '../../components/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent
      />

      <ScreenHeader title="Log in" rightType={null} showBack />

      <Login />
    </SafeAreaView>
  );
}
