import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import { useNavigation } from '@react-navigation/native';

export default function EmptyBookingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      {/* ILLUSTRATION */}
      <View className="items-center mb-8">
        <Image
          source={require('../../../assets/images/no-booking.png')}
          resizeMode="contain"
          className="w-full h-72"
        />
      </View>

      {/* TITLE */}
      <Text className="text-2xl font-semibold text-center text-gray-900 mb-2">
        Oops! No Booking yet
      </Text>

      {/* DESCRIPTION */}
      <Text className="text-center text-gray-500 text-lg leading-6 mb-8 px-4">
        It seems that you’ve got a blank state. We’ll let you know when
        updates arrive!
      </Text>

      {/* CTA */}
      <Button
        label="Book Now Event"
        className="mx-4"
        onPress={() =>
          navigation.getParent()?.navigate('MainTabs', {
            screen: 'Event',
          })
        }
      />
    </SafeAreaView>
  );
}
