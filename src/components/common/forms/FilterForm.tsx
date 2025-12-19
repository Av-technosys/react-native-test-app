import React, { forwardRef, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FilterBottomSheet = forwardRef<BottomSheet>((_, ref) => {
const snapPoints = useMemo(() => ['85%'], []);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [address, setAddress] = useState('Akshya Nagar 1st Block Ahmedabad');

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ borderRadius: 24 }}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">Filter By</Text>
        </View>

        {/* PRICE RANGE INPUTS */}
        <View className="mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold">Price Range</Text>
            <Pressable onPress={() => { setMinPrice(''); setMaxPrice(''); }}>
              <Text className="text-black">Reset</Text>
            </Pressable>
          </View>

          <View className="flex-row gap-3">
            <TextInput
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="Min"
              keyboardType="numeric"
              className="flex-1 p-4 border rounded-xl text-black"
            />
            <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="Max"
              keyboardType="numeric"
              className="flex-1 p-4 border rounded-xl text-black"
            />
          </View>
        </View>

        {/* RATING SELECT INPUT */}
        <View className="mb-6 mt-2">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold">Ratings and Reviews</Text>
            <Pressable onPress={() => setRating(null)}>
              <Text className="text-black">Reset</Text>
            </Pressable>
          </View>

          <View className="flex-row gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Pressable key={i} onPress={() => setRating(i)}>
                <AntDesign
                  name="star"
                  size={26}
                  color={rating && i <= rating ? '#FACC15' : '#D1D5DB'}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* ADDRESS SELECT INPUT */}
        <View className="mb-10">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold">Address</Text>
            <Pressable onPress={() => setAddress('')}>
              <Text className="text-black">Reset</Text>
            </Pressable>
          </View>

          <Pressable className="p-4 border rounded-xl flex-row justify-between items-center">
            <Text numberOfLines={1} className="flex-1 text-gray-700">
              {address || 'Select address'}
            </Text>
            <Feather name="chevron-down" size={18} />
          </Pressable>
        </View>

        {/* APPLY BUTTON */}
        <LinearGradient
          colors={['#F97316', '#FACC15']}
          style={{
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className="text-white font-bold text-lg">
            Apply
          </Text>
        </LinearGradient>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default FilterBottomSheet;
