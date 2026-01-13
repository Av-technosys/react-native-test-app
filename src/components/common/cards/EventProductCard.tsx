import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import { useNavigation } from '@react-navigation/native';
type Props = {
  title: string;
  guests: string;
  menuType: string;
  rating: number;
  price: any;
  image: any;
  added?: boolean;
  disabled?: boolean; // 👈 ADD THIS
  onAdd?: () => void;
  onRemove?: () => void;
};

export default function EventProductCard({
  title,
  guests,
  menuType,
  rating,
  price,
  image,
  added,
  disabled,
  onAdd,
  onRemove,
}: Props) {
  return (
    <View
      className={`rounded-2xl mx-3 mt-3 border border-gray-200 shadow-lg flex-row justify-between ${
        disabled ? 'bg-gray-100 opacity-60' : 'bg-white'
      }`}
    >
      {/* LEFT CONTENT */}
      <View className="flex-1 p-3">
        <Text className="text-2xl font-medium text-black">{title}</Text>

        <Text className="text-gray-500 mt-2 font-light text-md">
          {guests} • {menuType}
        </Text>

        <View className="flex-row items-center mt-2">
          {[1, 2, 3, 4, 5].map(i => (
            <AntDesign
              key={i}
              name="star"
              size={16}
              color={i < rating ? '#FACC15' : '#E5E7EB'}
            />
          ))}
          {/* <Text className="text-gray-500 text-xs ml-2">{reviews}</Text> */}
        </View>

        {/* PRICE */}
        <View className="mt-2 h-6 justify-center">
          {price != null && price !== '' ? (
            <Text className="text-lg font-semibold text-black">$ {price}</Text>
          ) : (
            <Text className="text-lg font-semibold text-transparent"></Text>
          )}
        </View>

        {/* ACTION */}
        {!added ? (
          <Pressable
            disabled={disabled}
            onPress={onAdd}
            className={`w-24 h-9 self-start rounded-md mt-3 items-center justify-center ${
              disabled ? 'bg-gray-300' : 'bg-yellow-400'
            }`}
          >
            <Text className="font-bold text-white">Add</Text>
          </Pressable>
        ) : (
          <Pressable
            disabled={disabled}
            onPress={onRemove}
            className={`self-start px-4 py-1.5 rounded-md mt-3 border ${
              disabled ? 'border-gray-300' : 'border-yellow-400'
            }`}
          >
            <Text
              className={`font-semibold ${
                disabled ? 'text-gray-400' : 'text-yellow-500'
              }`}
            >
              Remove
            </Text>
          </Pressable>
        )}
      </View>

      {/* RIGHT IMAGE */}
      <View className="p-3">
        <Image
          source={image}
          className="w-44 h-40 rounded-xl"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
