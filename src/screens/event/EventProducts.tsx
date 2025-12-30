/* eslint-disable react/self-closing-comp */
// import EventSelector from '../components/Events/EventSelector/main';

import { View } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import Header from '../../components/Events/EventProduct/Header';
import EventProductSection from '../../components/Events/EventProduct/ProductsSection';

export default function EventScreen() {
  const event = useAppSelector(state => state.event);

  useEffect(() => {
    console.log('event STATE:', event);
  }, [event]);

  return (
    <SafeAreaView className="flex-1 bg-white  ">
  <ScreenHeader title="Events" rightType="menu" />

      <View
        className="flex-1 mb-48"
             >
        <Header
          title="Piyush’s"
          subtitle="Birthday"
          image={require('../../assets/images/birthday.png')}
          onPress={() => console.log('Banner clicked')}
        />
        <EventProductSection />
      </View>
    </SafeAreaView>
  );
}
