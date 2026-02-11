/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import ResetPassword from '../../components/auth/ResetPassword';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function resetPassword() {
 return (
        <SafeAreaView className="flex-1 bg-white">
             
<ScreenHeader title=""  align="center"  showBack={false} />
    <ResetPassword />
    </SafeAreaView>
  );
}
