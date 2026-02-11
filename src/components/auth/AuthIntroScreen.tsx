import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import Button from '../common/Button';
import { FlatList, Dimensions } from 'react-native';

export default function AuthIntroScreen() {
  const { width } = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);

  const TEXT_SLIDES = [
    {
      title: 'Lorem ipsum dolor\nconsectetur Lor',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
    },
    {
      title: 'Plan your perfect\ncelebration',
      desc:
        'Choose venue, guests and schedule. Everything organised smoothly in one place.',
    },
    {
      title: 'Book instantly\nwithout hassle',
      desc:
        'Confirm your booking and relax while we handle coordination.',
    },
  ];

  const navigation = useNavigation()
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} className="flex-1 bg-white">

      {/* HERO */}
      <View className="relative w-full" style={{ height: '52%' }}>
        {/* BG IMAGE */}
        <Image
          source={require('../../assets/images/login-bg-bottom.png')}
          resizeMode="cover"
          className="absolute w-full h-full"
        />

        {/* TOP IMAGE */}
        <Image
          source={require('../../assets/images/login-bg-top.png')}
          resizeMode="contain"
          className="absolute w-full h-4/5 top-[16%]"
        />

        {/* GRADIENT FADE */}
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']} // Transparent to solid white
          style={{
            position: 'absolute',
            bottom: -1, // Overlap the bottom slightly to prevent a tiny line gap
            width: '100%',
            height: 100, // Reduced height so it doesn't cover the text
          }}
        />
      </View>

      {/* CONTENT */}


      <View className="flex-1 pt-1 ">
        {/* TEXT CAROUSEL */}
<View style={{ height: 160 }}>
          <FlatList
            data={TEXT_SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, i) => i.toString()}
            onMomentumScrollEnd={(e) => {
              const i = Math.round(e.nativeEvent.contentOffset.x / width);
              setIndex(i);
            }}
            renderItem={({ item }) => (
              <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>

                <View className="px-6 items-center">
                  <Text
                    style={{ fontFamily: 'SpaceMono-Regular' }}
                    className="text-3xl font-extrabold text-center text-black leading-tight mb-3"
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{ fontFamily: 'SpaceMono-Regular' }}
                    className="text-xl text-center text-gray-400 leading-5"
                  >
                    {item.desc}
                  </Text>
                </View>

              </View>
            )}
          />
        </View>

        <View className="flex-row justify-center items-center my-6">
          {TEXT_SLIDES.map((_, i) => (
            <View
              key={i}
              className={`mx-1 rounded-full ${i === index ? 'w-5 h-2 bg-gray-300' : 'w-2 h-2 bg-gray-200'
                }`}
            />
          ))}
        </View>
        {/* ACTIONS */}
        <View className="mt-2 pb-6 px-6">
          <Button
            label="Sign Up"
            variant="primary"
            className="mb-4"
            onPress={() =>
              navigation.getParent()?.navigate('AuthStack', {
                screen: 'SignUp',
              })
            }
          />

          <Button
            label="Log In"
            variant="outline"
            onPress={() =>
              navigation.getParent()?.navigate('AuthStack', {
                screen: 'Login',
              })
            }
          />
        </View>

      </View>
    </SafeAreaView>
  );
}