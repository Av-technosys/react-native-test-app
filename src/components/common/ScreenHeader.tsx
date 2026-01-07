import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

type RightType = 'notification' | 'menu' | 'none';

type ScreenHeaderProps = {
  title: string;
  rightType?: RightType;
  showBack : boolean
};

export default function ScreenHeader({
  title,
  rightType = 'none',
  showBack = true
}: ScreenHeaderProps) {
  const navigation = useNavigation<any>();

  // ✅ THIS IS THE KEY LINE
  const index = useNavigationState(state => state.index);


  const renderRight = () => {
    switch (rightType) {
      case 'notification':
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

      case 'menu':
        return (
          <Pressable>
            <MaterialIcons name="more-vert" size={22} color="#000" />
          </Pressable>
        );

      default:
        return <View className="w-6" />;
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* LEFT */}
      <View className="flex-row items-center">
        {showBack ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </Pressable>
        ) : (
          <View className="" />
        )}

        <Text className="ml-3 text-xl font-semibold text-black">
          {title}
        </Text>
      </View>

      {/* RIGHT */}
      {renderRight()}
    </View>
  );
}
