import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../../common/ScreenHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../store/hooks';
import { setEventTypeId } from '../../../store/slices/eventSlice';

export type EventStackParamList = {
  eventSelector: undefined;
  EventDetails: undefined; // or params if needed
};

type Option = {
  eventTypeId: any;
  title: string;
  image: any;
};

const OPTIONS: Option[] = [
  {
    eventTypeId: '1',
    title: 'Professional',
    image: require('../../../assets/images/eventType1.jpg'),
  },
  {
    eventTypeId: '2',
    title: 'Party',
    image: require('../../../assets/images/eventType2.jpg'),
  },
  {
    eventTypeId: '3',
    title: 'Corporate',
    image: require('../../../assets/images/eventType3.jpg'),
  },
  {
    eventTypeId: '4',
    title: 'Casual',
    image: require('../../../assets/images/eventType4.jpg'),
  },
];

export default function EventTypeSelector() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<EventStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <ScreenHeader
        title="Events"
        right={
          <View className="relative">
            <MaterialIcons name="more-vert" size={22} color="#000" />
          </View>
        }
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* GRID */}
        <View className="flex-row flex-wrap justify-between">
          {OPTIONS.map(item => {
            const isSelected = selected === item.eventTypeId;

            return (
              <Pressable
                key={item.eventTypeId}
                onPress={() => setSelected(item.eventTypeId)}
                className="w-[44%] my-6 mt-8 mx-3 mb-4 shadow-gray-200 shadow-lg rounded-2xl"
              >
                <View className="relative rounded-2xl overflow-hidden">
                  <Image
                    source={item.image}
                    className="w-full h-72"
                    resizeMode="cover"
                  />

                  {/* Overlay */}
                  <View className="absolute inset-0 bg-black/20" />

                  {/* Selection circle */}
                  <View className="absolute top-3 left-3 w-5 h-5 rounded-full border-2 border-white items-center justify-center">
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </View>

                  {/* Title */}
                  <Text className="absolute bottom-3 left-3 text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* CONTINUE BUTTON */}
        <Pressable
          disabled={!selected}
          className="w-full items-center mt-6"
          onPress={() => {
            if (!selected) return;

            dispatch(setEventTypeId(selected));

            navigation.getParent()?.navigate('FlowStack', {
              screen: 'eventDetails',
            });
          }}
        >
          <View style={{ borderRadius: 20, overflow: 'hidden', width: '87%' }}>
            <LinearGradient
              colors={
                selected ? ['#F97316', '#FACC15'] : ['#E5E7EB', '#E5E7EB']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                className={`text-base font-semibold ${
                  selected ? 'text-white' : 'text-gray-400'
                }`}
              >
                Continue
              </Text>
            </LinearGradient>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
