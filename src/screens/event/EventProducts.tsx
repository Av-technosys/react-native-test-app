/* eslint-disable react/self-closing-comp */
// import EventSelector from '../components/Events/EventSelector/main';

import { View } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Events/EventProduct/Header';
import EventProductSection from '../../components/Events/EventProduct/ProductsSection';

export default function EventScreen() {
  const event = useAppSelector(state => state.event);

  useEffect(() => {
    console.log('event STATE:', event);
  }, [event]);

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <ScreenHeader
        title="Events"
        right={
          <View className="relative">
            <MaterialIcons name="more-vert" size={22} color="#000" />
          </View>
        }
      />
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
