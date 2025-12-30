import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import ScreenHeader from '../../components/common/ScreenHeader';
import Button from '../../components/common/Button';

export default function CartProductDetail() {
  const SERVICES = [
    {
      id: '1',
      title: 'Food & Drink',
      vendor: 'XYZ',
      location: 'Malviya Nagar, Jaipur',
      desc: '150 guests • Premium menu',
      price: 150,
    },
    {
      id: '2',
      title: 'Decoration',
      vendor: 'XYZ',
      location: 'Malviya Nagar, Jaipur',
      desc: 'Premium plan',
      price: 150,
    },
    {
      id: '3',
      title: 'Venue',
      vendor: 'XYZ',
      location: 'Malviya Nagar, Jaipur',
      desc: 'Hyatt Banquet Hall',
      price: 150,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Order Summary" rightType = 'notification' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 40, paddingTop : 30 }}
      >
        {/* EVENT CARD */}
        <View className="flex-row  rounded-2xl  mb-6">
          <View className="w-36 h-36 bg-orange-400 rounded-xl items-center justify-center">
            <Feather name="gift" size={60} color="white" />
          </View>

          <View className="ml-4 flex-1">
            <Text className="font-semibold text-2xl">
              Piyush’s Birthday
            </Text>
            <Text className="text-md text-gray-500 mt-2">
              Jaipur
            </Text>
            <Text className="text-md text-gray-500 mt-1">
              Saturday, August 25, 2025
            </Text>
            <Text className="text-md text-gray-500 mt-1">
              6:00 PM – 11:00 PM
            </Text>
          </View>
        </View>

        {/* SERVICES */}
        <View className="gap-6 mb-6">
          {SERVICES.map(item => (
            <View
              key={item.id}
              className="border border-gray-200  rounded-xl px-4 py-3"
            >
              <View className="flex-row justify-between">
                <View className="flex-row gap-3">
                  <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center">
                    <Feather name="coffee" size={24} color="#2563EB" />
                  </View>

                  <View>
                    <Text className="font-semibold">{item.vendor}</Text>
                    <Text className="text-sm text-gray-500">
                      {item.location}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <Pressable>
                    <Feather name="edit-2" size={20} color="#F97316" />
                  </Pressable>
                  <Pressable>
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </Pressable>
                </View>
              </View>

              <View className="flex-row justify-between mt-4">
                <View>
                  <Text className="font-medium">{item.title}</Text>
                  <Text className="text-sm text-gray-500">
                    {item.desc}
                  </Text>
                </View>

                <Text className="font-semibold text-lg text-orange-500">
                  ${item.price}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* PRICING */}
        <View className="mb-8">
          <Text className="font-semibold text-lg mb-8">
            Pricing Breakdown
          </Text>

          <View className="gap-4">
            <Row label="Subtotal" value="$10,300" />
            <Row label="Service Fee (8%)" value="$824" />
            <Row label="Tax (10%)" value="$1,030" />
          </View>

          <View className="flex-row justify-between mt-4 pt-3 border-t border-gray-200">
            <Text className="font-semibold text-base">Total</Text>
            <Text className="font-semibold text-base text-orange-500">
              $12,154
            </Text>
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <View className="border border-blue-200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-medium">•••• •••• •••• 4242</Text>
              <Text className="text-xs text-gray-500">
                Expires 12/26
              </Text>
            </View>
            <View className="w-4 h-4 rounded-full border border-orange-500 items-center justify-center">
              <View className="w-2 h-2 bg-orange-500 rounded-full" />
            </View>
          </View>
        </View>

        {/* ADD PAYMENT */}
        <Pressable className="h-14 rounded-xl bg-gray-100 justify-center items-center mb-6">
          <Text className="font-medium text-gray-700">
            + Add Payment Method
          </Text>
        </Pressable>

        {/* PAY NOW */}
        <Button
          label="Pay now"
          onPress={() => console.log('Pay now')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* --------- Helper Row --------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-600">{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}
