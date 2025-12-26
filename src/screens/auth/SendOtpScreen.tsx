/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SendOtp from '../../components/auth/SendOtpScreen';
import { StatusBar, View } from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function sendOtp() {
 return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
<ScreenHeader title="Forgot Password" rightType="menu" />

    <SendOtp />
    </SafeAreaView>
  );
}
