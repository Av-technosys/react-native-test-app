import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

type RightType = 'notification' | 'none' | string;
type TitleAlign = 'center' | 'left';

type ScreenHeaderProps = {
  title: string;
  rightType?: RightType;
  showBack?: boolean;
  align?: TitleAlign;
  onBackPress?: () => void;
};

export default function ScreenHeader({
  title,
  rightType = 'none',
  showBack = true,
  align = 'left',
  onBackPress,
}: ScreenHeaderProps) {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    if (onBackPress) return onBackPress();
    navigation.goBack();
  };

  const renderRight = () => {
    if (rightType === 'notification') {
      return (
        <Pressable
          onPress={() =>
            navigation.getParent()?.navigate('FlowStack', {
              screen: 'NotificationsScreen',
            })
          }
          className="relative"
        >
          <Feather name="bell" size={22} color="#000" />
          <View className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
        </Pressable>
      );
    }

    return <View />;
  };

  return (
    <View className="h-14 justify-center">
      
      {/* CENTER TITLE MODE */}
      {align === 'center' && (
        <Text
          className="absolute self-center text-xl font-semibold text-black"
          numberOfLines={1}
        >
          {title}
        </Text>
      )}

      <View className="flex-row items-center justify-between px-4">
        
        {/* LEFT SLOT */}
        <View className="w-10">
          {showBack && (
            <Pressable onPress={handleBack}>
              <Feather name="arrow-left" size={24} color="#000" />
            </Pressable>
          )}
        </View>

        {/* LEFT TITLE MODE */}
        {align === 'left' && (
          <Text
            className="flex-1 text-xl font-semibold text-black"
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        {/* RIGHT SLOT */}
        <View className="w-10 items-end">
          {renderRight()}
        </View>
      </View>
    </View>
  );
}
