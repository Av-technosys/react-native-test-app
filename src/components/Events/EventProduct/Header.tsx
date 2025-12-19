import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

type Props = {
  title?: string;
  subtitle?: string;
  image: any;
  onPress?: () => void;
};

export default function Header({
  title = "Piyush’s",
  subtitle = 'Birthday',
  image,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="m-6  flex-row items-center justify-between"
    >
      {/* LEFT CONTENT */}
      <View className="flex-1 pr-4">
        {/* GRADIENT TITLE */}
        <MaskedView
          maskElement={
            <View>
              <Text className="text-6xl font-bold leading-tight">
                {title}
              </Text>
              <Text className="text-4xl font-extrabold leading-tight">
                {subtitle}
              </Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#FBBF24', '#F97316']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-6xl font-bold opacity-0">
              {title}
            </Text>
            <Text className="text-6xl font-extrabold opacity-0">
              {subtitle}
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* DATE */}
        <Text className="text-gray-500 mt-4 text-base">
          20 Aug 2025
        </Text>
      </View>

      {/* RIGHT IMAGE */}
      <View className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg">
        <Image
          source={image}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}
