/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from '../../components/auth/SignUp';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function signUp() {
  return (

      <SafeAreaView className="flex-1 bg-white">


        <ScreenHeader  align="center" title="Sign Up" showBack={true} />

        <SignUp />

      </SafeAreaView>


  );
}
