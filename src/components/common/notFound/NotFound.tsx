import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import { useNavigation } from '@react-navigation/native';

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel?: string;
  navigateTo?: {
    parent: string;
    screen: string;
  };
}

export default function NotFound({
  title,
  description,
  ctaLabel,
  navigateTo,
}: EmptyStateProps) {
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
        {title}
      </Text>

      {/* DESCRIPTION */}
      <Text className="text-center text-gray-500 text-lg leading-6 mb-8 px-4">
        {description}
      </Text>

      {/* CTA (optional) */}
      {ctaLabel && navigateTo && (
        <Button
          label={ctaLabel}
          className="mx-4"
          onPress={() =>
            navigation.getParent()?.navigate(navigateTo.parent, {
              screen: navigateTo.screen,
            })
          }
        />
      )}
    </SafeAreaView>
  );
}
