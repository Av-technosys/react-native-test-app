/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import ResetPassword from '../../components/auth/ResetPassword';
import { StatusBar } from 'react-native';
import KeyboardWrapper from '../../components/common/KeyboardWrapper'
import ScreenHeader from '../../components/common/ScreenHeader';

export default function resetPassword() {
 return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
<ScreenHeader title="Reset Password" rightType="menu" showBack={false} />
<KeyboardWrapper>
    <ResetPassword />
    </KeyboardWrapper>
    </SafeAreaView>
  );
}
