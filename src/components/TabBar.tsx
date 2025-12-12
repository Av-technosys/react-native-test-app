/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */

import { Text, Pressable, View, Animated, Easing } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useEffect, useRef } from 'react';

const ICONS: Record<string, string> = {
  Home: 'home',
  Categories: 'grid',
  Event: 'plus-circle',
  Cart: 'shopping-cart',
  Profile: 'user',
};

export default function MyTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute left-0 right-0 bottom-0">
      <View className="rounded-full ">
        <LinearGradient
          colors={['#FBBF24', '#F97316']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="flex-row h-24 items-center p-2"
          style={{ borderRadius: 40 }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = ICONS[route.name];

            // Animation values
            const translateY = useRef(new Animated.Value(0)).current;
            const scale = useRef(new Animated.Value(1)).current;

            useEffect(() => {
              Animated.parallel([
                Animated.timing(translateY, {
                  toValue: isFocused ? -35 : 0,
                  duration: 250,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }),
                Animated.timing(scale, {
                  toValue: isFocused ? 1.3 : 1,
                  duration: 250,
                  easing: Easing.out(Easing.ease),
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
                        top: -16,
                        height: 60,
                        width: 60,
                        borderRadius: 40,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowRadius: 4,
                        shadowOffset: { width: 0, height: 4 },
                        paddingTop: 8,
                      }}
                    >
                      <Feather
                        name={iconName}
                        size={22}
                        style={{ marginTop: -8 }}
                        color="orange"
                      />

                      {/* <Text
      style={{
        marginTop: 3,
        fontSize: 9,
        fontWeight: '600',
        color: '#111827',
      }}
    >
      {route.name}
    </Text> */}
                    </Animated.View>
                  ) : (
                    <Animated.View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Feather name={iconName} size={24} color={'#11182799'} />

                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        {route.name}
                      </Text>
                    </Animated.View>
                  )}
                </Animated.View>
              </Pressable>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );
}
