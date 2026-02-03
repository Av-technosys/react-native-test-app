/* eslint-disable react/self-closing-comp */
// import EventSelector from '../components/Events/EventSelector/main';

import { View } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import Header from '../../components/Events/EventProduct/Header';
import EventProductSection from '../../components/Events/EventProduct/ProductsSection';



export default function EventScreen() {

    const formatDate = (isoDate?: string) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getPossessiveName = (fullName?: string) => {
  if (!fullName) return 'User’s';

  const firstName = fullName.trim().split(' ')[0];
  return `${firstName}’s`;
};

  const eventType = useAppSelector(state => state.event.eventType);
  const event = useAppSelector(state => state.event);

  const eventName = eventType?.name || 'Event';
  const eventImage =
    eventType?.image || require('../../assets/images/image_not_found.jpg');

  const customerName = getPossessiveName(
    event?.bookingDetails?.contactName
  );

  const formattedDate = formatDate(
    event?.bookingDetails?.startTime
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Events" rightType="menu" showBack />

      <View className="flex-1 mb-48">
        <Header
          title={customerName}
          subtitle={eventName}
          image={eventImage}
          date={formattedDate}
          onPress={() => console.log('Banner clicked')}
        />
        <EventProductSection />
      </View>
    </SafeAreaView>
  );
}
