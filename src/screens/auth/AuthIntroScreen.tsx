/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthIntro from '../../components/auth/AuthIntroScreen';

export default function authIntro() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">

    
    <AuthIntro />
     </SafeAreaView>
  );
}