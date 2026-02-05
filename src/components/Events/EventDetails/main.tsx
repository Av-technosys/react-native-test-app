import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../common/ScreenHeader';
import BookingDetailsForm from '../../common/forms/EventDetails';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../store/hooks';
import { setBookingDetails } from '../../../store/slices/eventSlice';
import type { BookingDetails } from '../../../store/slices/eventSlice';

export type EventStackParamList = {
  eventSelector: undefined;
  eventDetails: undefined;
};

export default function EventTypeSelector() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<EventStackParamList>>();

  const handleSubmit = (data: BookingDetails) => {
 
    dispatch(setBookingDetails(data));

    navigation.getParent()?.navigate('FlowStack', {
      screen: 'eventProducts',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white  ">
<ScreenHeader title="Events" rightType="menu" showBack={true} />

      <ScrollView
        className="flex-1 m-4 my-12"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BookingDetailsForm
          onSubmit={handleSubmit}
          submitLabel="Continue"
          isBottomSheet={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
