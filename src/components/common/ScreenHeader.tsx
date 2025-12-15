import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

type ScreenHeaderProps = {
  title: string;
  right?: React.ReactNode;
};

export default function ScreenHeader({ title, right }: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 ">
      

      <View className="flex-row items-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </Pressable>

        <Text className="ml-3 text-xl font-semibold text-black">
          {title}
        </Text>
      </View>

      <View>
        {right}
      </View>
    </View>
  );
}
