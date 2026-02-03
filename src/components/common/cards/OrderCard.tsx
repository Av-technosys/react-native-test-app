import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type OrderCardVariant = 'default' | 'compact';

type OrderCardProps = {
  title: string;
  venue?: string;
  price?: string | null;
  status?: string;

  onPress: () => void;
  onDelete?: () => void;

  variant?: OrderCardVariant;
};

export default function OrderCard({
  title,
  venue,
  price,
  status,
  onPress,
  onDelete,

}: OrderCardProps) {

  return (
    <Pressable
      onPress={onPress}
      className="flex-row rounded-2xl mt-6 bg-white border border-gray-200 overflow-hidden"
    >
      {/* LEFT ICON */}
      <View className="w-16 items-center justify-center bg-orange-300">
        <Feather name="gift" size={28} color="white" />
      </View>

      {/* CONTENT */}
      <View className="flex-1 px-4 py-3">
        <Text className="font-semibold text-md text-gray-900">
          {title}
        </Text>

        {venue && (
          <Text className="text-md text-gray-500 mt-1">
            {venue}
          </Text>
        )}

        {price && (
          <Text className="text-md text-gray-800 mt-1 font-medium">
            $ {price}
          </Text>
        )}
      </View>

      {/* STATUS STRIP */}
      {status && (
        <View
          className={`w-14 items-center justify-center ${
            status === 'Paid'
              ? 'bg-green-100'
              : 'bg-red-300'
          }`}
        >
          <Text
            className={`text-xs font-semibold rotate-90 ${
              status === 'Paid'
                ? 'text-green-600'
                : 'text-black'
            }`}
          >
            {status}
          </Text>
        </View>
      )}
    </Pressable>
  );
}