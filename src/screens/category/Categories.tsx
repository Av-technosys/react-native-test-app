/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
};

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const services = [
    { id: 1, title: 'Bartender', icon: 'coffee' },
    { id: 2, title: 'Decor', icon: 'flag' },
    { id: 3, title: 'Photography', icon: 'camera' },
    { id: 4, title: 'Henna Artist', icon: 'edit-3' },

    { id: 5, title: 'DJ Services', icon: 'music' },
    { id: 6, title: 'Lighting', icon: 'zap' },
    { id: 7, title: 'Kids Activity', icon: 'smile' },
    { id: 8, title: 'Face Painting', icon: 'aperture' },

    { id: 9, title: 'Catering', icon: 'shopping-bag' },
    { id: 10, title: 'Makeup Artist', icon: 'user' },
    { id: 11, title: 'Live Band', icon: 'headphones' },
    { id: 12, title: 'Sound System', icon: 'speaker' },

    { id: 13, title: 'Balloon Decor', icon: 'cloud' },
    { id: 14, title: 'Flower Decor', icon: 'feather' },
    { id: 15, title: 'Anchor / Host', icon: 'mic' },
    { id: 16, title: 'Event Security', icon: 'shield' },
  ];
  return (
    <SafeAreaView className="flex-1  bg-white mb-16">
      <ScreenHeader
        title="Categories"
        right={
          <View className="relative">
            <Icon name="bell" size={22} color="#000" />
            <View className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
          </View>
        }
      />

      {/* GRID */}
      <FlatList
        data={services}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'CategoryProducts',
              })
            }
            className="mb-4 w-[48%]"
          >
            <View className="h-36 rounded-3xl border border-orange-400 bg-white items-center justify-center shadow shadow-slate-200">
              <View className="w-10 h-10 items-center justify-center">
                <MaskedView
                  style={{ width: 36, height: 36 }}
                  maskElement={<Icon name={item.icon} size={36} color="#000" />}
                >
                  <LinearGradient
                    colors={['#FFD451', '#FFA588']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ width: 36, height: 36 }}
                  />
                </MaskedView>
              </View>

              <Text className="mt-2 text-lg font-medium text-gray-800">
                {item.title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
