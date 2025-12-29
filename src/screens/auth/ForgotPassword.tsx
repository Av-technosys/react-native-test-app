/* eslint-disable react/self-closing-comp */
import { StatusBar } from 'react-native';
import ForgotPasswordOtpScreen from '../../components/auth/ForgotPassword';
import ScreenHeader from '../../components/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
 <ScreenHeader title="Log in" rightType="menu" />

    <ForgotPasswordOtpScreen />
    </SafeAreaView>
  );
}

