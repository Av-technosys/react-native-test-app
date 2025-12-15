/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */

import { Text, Pressable, View, Animated, Easing } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS: Record<string, string> = {
  Home: 'home',
  Categories: 'grid',
  Event: 'plus-circle',
  Cart: 'shopping-cart',
  Profile: 'user',
};

export default function MyTabBar({ state, navigation }: BottomTabBarProps) {
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: Math.max(inset.bottom, 0),
      }}
      className="absolute left-0 right-0 bottom-0"
    >
      <View className="rounded-full ">
        <LinearGradient
          colors={['#FFD451', '#FFA588']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="flex-row h-20 items-center p-2"
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = ICONS[route.name];

            // Animation values
            const translateY = useRef(new Animated.Value(0)).current;
            const scale = useRef(new Animated.Value(1)).current;
            const bgOpacity = useRef(new Animated.Value(0)).current;
            const bgScale = useRef(new Animated.Value(0.6)).current;

            useEffect(() => {
              Animated.parallel([
                Animated.spring(translateY, {
                  toValue: isFocused ? -12 : 0,
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8,
                  useNativeDriver: true,
                }),
                Animated.spring(scale, {
                  toValue: isFocused ? 1.4 : 1,
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8,
                  useNativeDriver: true,
                }),
                Animated.timing(bgOpacity, {
                  toValue: isFocused ? 1 : 0,
                  duration: 200,
                  useNativeDriver: true,
                }),
                Animated.spring(bgScale, {
                  toValue: isFocused ? 1 : 0.6,
                  stiffness: 160,
                  damping: 20,
                  useNativeDriver: true,
                }),
              ]).start();
            }, [isFocused]);

            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                className="flex-1 items-center justify-center"
              >
                <Animated.View
                  style={{
                    transform: [{ translateY }, { scale }],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isFocused ? (
                    <Animated.View
                      style={{
                        position: 'absolute',
                        // top: -8,
                        height: 46,
                        width: 46,
                        borderRadius: 40,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 4,
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowRadius: 4,
                        shadowOffset: { width: 0, height: 4 },
                      }}
                    >
                      <Feather name={iconName} size={18} color="orange" />
                    </Animated.View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Feather name={iconName} size={18} />
                    </View>
                  )}
                </Animated.View>
                {!isFocused && (
                  <Text className=" text-sm mt-1 font-semibold">
                    {route.name}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );
}
