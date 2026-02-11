/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SendOtp from '../../components/auth/SendOtpScreen';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function signUp() {
  return (

      <SafeAreaView className="flex-1  bg-white">
  

        <ScreenHeader  align="center" title="Forgot Passwords" showBack={true} />

        <SendOtp />

      </SafeAreaView>


  );
}
