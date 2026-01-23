/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from '../../components/auth/SignUp';
import { StatusBar } from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';
import KeyboardWrapper from '../../components/common/KeyboardWrapper'

export default function signUp() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
<ScreenHeader title="Sign Up" rightType="menu" showBack={true} />
<KeyboardWrapper>
   <SignUp />
</KeyboardWrapper>
   
    </SafeAreaView>
  );
}
