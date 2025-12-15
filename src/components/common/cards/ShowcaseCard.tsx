import { View, Text, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export default function ShowcaseCard({ item }: any) {
  return (
    <View className="mr-5 mt-4 px-4">
      
      {/* IMAGE */}
      <Image
        source={item.image}
        className="w-72 h-48 rounded-xl"
        resizeMode="cover"
      />

      {/* NUMBER + TITLE + PRICE */}
<View className="flex-row items-start mt-3 -ml-2">        
        {/* Gradient Number */}
        <MaskedView
          style={{ alignSelf: 'flex-start' }}
          maskElement={
            <Text className="text-[56px] leading-[42px] font-extrabold">
              {item.number}
            </Text>
          }
        >
          <LinearGradient
            colors={['#FFC107', '#FF5722']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text className="text-[56px] leading-[42px] opacity-0 font-extrabold">
              {item.number}
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Right column */}
        <View className="ml-3 flex-col justify-end">
          
          {/* TITLE */}
          <Text
            numberOfLines={1}
            className="text-lg font-bold text-black"
          >
            {item.title}
          </Text>

          {/* PRICE */}
          <Text className="text-base text-gray-800">
            Starting{' '}
            <Text className="text-orange-500 font-semibold">
              ${item.price}
            </Text>
          </Text>

        </View>
      </View>
    </View>
  );
}
