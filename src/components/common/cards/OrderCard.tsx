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
  onPress,
  onDelete,

}: OrderCardProps) {

  return (
   <Pressable
  onPress={onPress}
className="flex-row min-h-[92px] rounded-2xl mt-3 bg-white border border-gray-200 overflow-hidden"
>
  {/* LEFT ICON */}
<View className="w-16 items-center justify-center bg-orange-300">
    <Feather name="gift" size={28} color="white" />
  </View>

  {/* CONTENT */}
<View className="flex-1 px-4 py-4 justify-center">
    <Text className="font-semibold text-xl text-gray-900">
      {title}
    </Text>

    {venue && (
      <Text className="text-md text-gray-500 mt-1">
        {venue}
      </Text>
    )}

    {price && (
      <Text className="text-lg text-gray-800 mt-1 font-medium">
        $ {price}
      </Text>
    )}
  </View>


  {/* delete STRIP */}
  {onDelete && (
    <View
      className={`w-14 items-center justify-center bg-red-200`}
    >
        <Pressable
      onPress={(e) => {
        e.stopPropagation(); // prevent navigation
        onDelete();
      }}
      className="px-4 justify-center items-center"
      hitSlop={10}
    >
      <Feather name="trash-2" size={20} color="#ef4444" />
    </Pressable>
    </View>
  )}
</Pressable>
  );
}