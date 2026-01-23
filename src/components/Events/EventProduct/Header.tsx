import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

type Props = {
  title?: string;
  subtitle?: string;
  image: any;
  date?: string;
  onPress?: () => void;
};

export default function Header({
  title,
  subtitle,
  image,
  date,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="m-6 flex-row items-start justify-between"
    >
      {/* TEXT */}
      <View className="flex-1 pr-4">
        <MaskedView
          maskElement={
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 44, lineHeight: 52, fontWeight: '700' }}
              >
                {title}
              </Text>

              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{ fontSize: 26, lineHeight: 34, fontWeight: '800' }}
              >
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
            {/* MUST MATCH MASK EXACTLY */}
            <Text
              numberOfLines={1}
              style={{
                fontSize: 44,
                lineHeight: 52,
                fontWeight: '700',
                opacity: 0,
              }}
            >
              {title}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                fontSize: 26,
                lineHeight: 34,
                fontWeight: '800',
                opacity: 0,
              }}
            >
              {subtitle}
            </Text>
          </LinearGradient>
        </MaskedView>

        {date && (
          <Text className="text-gray-500 mt-3 text-base">
            {date}
          </Text>
        )}
      </View>

      {/* IMAGE */}
      <View className="w-32 h-36 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
        <Image
          source={image}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}
