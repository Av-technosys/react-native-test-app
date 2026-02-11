import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function FilterModal({ visible, onClose }: Props) {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [address, setAddress] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white w-[92%] rounded-3xl p-5 max-h-[85%]">

          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Filter By</Text>
            <Pressable onPress={onClose}>
              <Feather name="x" size={22} />
            </Pressable>
          </View>

          {/* PRICE */}
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold">Price Range</Text>
              <Pressable onPress={() => { setMinPrice(''); setMaxPrice(''); }}>
                <Text>Reset</Text>
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

          {/* RATING */}
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold">Ratings</Text>
              <Pressable onPress={() => setRating(null)}>
                <Text>Reset</Text>
              </Pressable>
            </View>

            <View className="flex-row gap-2">
              {[1,2,3,4,5].map(i => (
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

          {/* ADDRESS */}
          <View className="mb-10">
            <Text className="font-semibold mb-2">Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              className="p-4 border rounded-xl"
            />
          </View>

          {/* APPLY */}
          <Pressable onPress={onClose}>
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
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}
