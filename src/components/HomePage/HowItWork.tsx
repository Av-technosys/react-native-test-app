import { View, Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import SectionHeader from '../common/SectionHeader';

const steps = [
  {
    id: 1,
    text: 'Choose a tasker by price, skills, and reviews.',
  },
  {
    id: 2,
    text: 'Schedule a Tasker as early as today.',
  },
  {
    id: 3,
    text: 'Chat, pay, tip, and review all in one place.',
  },
];

export default function HowItWorksCard() {
  return (
    <View className="mb-16 ">
      <SectionHeader
        left={
          <Text className="text-2xl font-bold text-black">How It Works</Text>
        }
      />
      <View className="mx-4 mt-2  rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        {steps.map((step, index) => (
          <View
            key={step.id}
            className={`flex-row items-start ${index !== steps.length - 1 ? 'mb-5' : ''}`}
          >
            {/* Gradient Number */}
            <MaskedView
              style={{ width: 36, height: 40 }}
              maskElement={
          <Text className="text-5xl font-extrabold leading-[44px] text-center">
                  {step.id}
                </Text>
              }
            >
              <LinearGradient
                colors={['#FFC107', '#FF5722']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
              />
            </MaskedView>

            {/* Step Text */}
      <Text className="ml-4 pt-2 flex-1 text-lg font-semibold text-gray-800 leading-6">
              {step.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}