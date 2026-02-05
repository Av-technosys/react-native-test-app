/* eslint-disable react/self-closing-comp */
import { StatusBar } from 'react-native';
import ForgotPasswordScreen from '../../components/auth/ForgotPassword';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ForgotPassword() {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="#FFFFFF"
      />
      <SafeAreaView className="flex-1 bg-white">
        <ForgotPasswordScreen />
      </SafeAreaView>
    </>
  );
}