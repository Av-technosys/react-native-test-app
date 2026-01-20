import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function TestingPayment() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Almost There" showBack />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-12">
          <Text className="text-xl font-semibold text-black mb-3">
            You’re about to complete your booking
          </Text>

          <Text className="text-base text-gray-600 leading-6">
            You have successfully selected your item.
         
            In the next step, you will be redirected to the payment screen
            where you can securely complete your transaction.
         
            Please review your details carefully before proceeding.
          </Text>
        </View>

        <View className="mt-10 bg-gray-50 rounded-2xl p-4">
          <Text className="text-sm text-gray-500 leading-5">
            Once payment is completed, your confirmation will be available
            immediately and a receipt will be sent to your registered contact
            details.
          </Text>
        </View>
      </ScrollView>

      <View className="px-4 pb-4">
        <Pressable
          className="bg-black rounded-2xl py-4 items-center"
          onPress={() => {
            // navigate to payment screen later
          }}
        >
          <Text className="text-white text-base font-semibold">
            Proceed to Payment
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
