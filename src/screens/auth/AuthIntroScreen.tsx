/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthIntro from '../../components/auth/AuthIntroScreen';
import { StatusBar } from 'react-native';

export default function authIntro() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
            <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor="#FFFFFF"
                    translucent              />
    
    <AuthIntro />
     </SafeAreaView>
  );
}