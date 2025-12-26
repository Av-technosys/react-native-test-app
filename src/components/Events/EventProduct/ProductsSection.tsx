/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
//import { View, Text, Image, Pressable } from 'react-native';
import EventProductCard from '../../common/cards/EventProductCard';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../common/forms/FilterForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addProduct, removeProduct } from '../../../store/slices/eventSlice';
import { useNavigation } from '@react-navigation/native';



const EVENT_PRODUCTS = [
  {
    id: '1',
    title: 'Sugar & Slice',
    guests: '150 guests',
    menuType: 'Premium menu',
    rating: 5,
    reviews: '14k+',
    price: 1250,
    image: require('../../../assets/images/event1.png'),
  },
  {
    id: '2',
    title: 'Sweet Royale',
    guests: '150 guests',
    menuType: 'Premium menu',
    rating: 5,
    reviews: '14k+',
    price: 949,
    image: require('../../../assets/images/event2.png'),
  },
  {
    id: '3',
    title: 'Luxe Layers',
    guests: '150 guests',
    menuType: 'Premium menu',
    rating: 4,
    reviews: '12k+',
    price: 899,
    image: require('../../../assets/images/event1.png'),
  },
  {
    id: '4',
    title: 'Choco Charm',
    guests: '150 guests',
    menuType: 'Premium menu',
    rating: 4,
    reviews: '11k+',
    price: 849,
    image: require('../../../assets/images/event2.png'),
  },
  {
    id: '5',
    title: 'Golden Crumbs',
    guests: '120 guests',
    menuType: 'Standard menu',
    rating: 4,
    reviews: '9k+',
    price: 799,
    image: require('../../../assets/images/event1.png'),
  },
  {
    id: '6',
    title: 'Velvet Treats',
    guests: '200 guests',
    menuType: 'Luxury menu',
    rating: 5,
    reviews: '18k+',
    price: 1499,
    image: require('../../../assets/images/event2.png'),
  },
  {
    id: '7',
    title: 'Creamy Bliss',
    guests: '100 guests',
    menuType: 'Standard menu',
    rating: 4,
    reviews: '8k+',
    price: 699,
    image: require('../../../assets/images/event1.png'),
  },
  {
    id: '8',
    title: 'Royal Oven',
    guests: '180 guests',
    menuType: 'Premium menu',
    rating: 5,
    reviews: '16k+',
    price: 1399,
    image: require('../../../assets/images/event2.png'),
  },
];

type StepKey =
  | 'food'
  | 'drinks'
  | 'cake'
  | 'venue'
  | 'photography'
  | 'videography';

type StepStatus = 'initial' | 'green' | 'yellow' | 'red';

const ALL_STEP_KEYS: StepKey[] = [
  'food',
  'drinks',
  'cake',
  'venue',
  'photography',
  'videography',
];

const ALL_STEPS: { key: StepKey; label: string }[] = [
  { key: 'cake', label: 'Cake' },
  { key: 'food', label: 'Food' },
  { key: 'venue', label: 'Venue' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'photography', label: 'Photography' },
  { key: 'videography', label: 'Videography' },
];

export default function EventProductSection() {
  const navigation = useNavigation()
  const filterSheetRef = useRef<BottomSheet>(null);
  const [activeStep, setActiveStep] = useState<StepKey>('food');
  const insets = useSafeAreaInsets();

  const [enabledSteps, setEnabledSteps] = useState<StepKey[]>([
    'food',
    'drinks',
    'cake',
    'venue',
  ]);
  const [tempEnabledSteps, setTempEnabledSteps] =
    useState<StepKey[]>(enabledSteps);

  const STEPS = ALL_STEPS.filter(s => enabledSteps.includes(s.key));

  const [showServiceModal, setShowServiceModal] = useState(false);

const dispatch = useAppDispatch();


  const [stepStatus, setStepStatus] = useState<Record<StepKey, StepStatus>>(
    () =>
      ALL_STEP_KEYS.reduce((acc, key) => {
        acc[key] = 'initial';
        return acc;
      }, {} as Record<StepKey, StepStatus>),
  );

  const activeIndex = STEPS.findIndex(s => s.key === activeStep);
  const isLastStep = activeIndex === STEPS.length - 1;
  const selections = useAppSelector(state => state.event.selections);

const handleContinue = () => {
  const hasItems = selections[activeStep].length > 0;

  const updatedStatus = {
    ...stepStatus,
    [activeStep]: hasItems ? 'green' : 'red',
  };

  setStepStatus(updatedStatus);

  // ✅ LAST STEP → FINAL ACTION
  if (isLastStep) {
    console.log('FINAL SELECTION:', {
      selections,
      stepStatus: updatedStatus,
    });

    navigation.getParent()?.navigate('FlowStack', {
      screen: 'ProductDetails',
    });

    return;
  }

  const nextIndex = activeIndex + 1;
  const nextStep = STEPS[nextIndex];

  setActiveStep(nextStep.key);

  navigation.getParent()?.navigate('FlowStack', {
    screen: 'eventDetails',
    params: {
      step: nextStep.key,
    },
  });
};
  const handleSkip = () => {
    setStepStatus(prev => ({
      ...prev,
      [activeStep]: 'yellow',
    }));


    const next = STEPS[activeIndex + 1];
    setActiveStep(next.key);
  };

  return (
    <View className="bg-white ">
      <View className="flex-row items-center relative  justify-between  gap-2 mx-3">
        {/* LEFT: STEPS BAR */}
        <View className="flex-row items-center justify-between bg-white  p-2 flex-1">
          <View className="flex-row items-center  gap-1">
            {STEPS.map((step, index) => (
              <Pressable
                key={step.key}
                onPress={() => setActiveStep(step.key)}
                className="flex-row items-center"
              >
                <Text
                  className={`text-md font-semibold ${
                    step.key === activeStep ? 'underline' : ''
                  } ${
                    stepStatus[step.key] === 'green'
                      ? 'text-green-600'
                      : stepStatus[step.key] === 'yellow'
                      ? 'text-yellow-500'
                      : stepStatus[step.key] === 'red'
                      ? 'text-red-500'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </Text>

                {index < STEPS.length - 1 && (
                  <Text className="mx-2 text-gray-700">{'>'}</Text>
                )}
              </Pressable>
            ))}
          </View>
          {/* FILTER ICON */}
          <View>
            <Pressable
              onPress={() => filterSheetRef.current?.expand()}
              className="ml-3"
            >
              <Feather name="sliders" size={20} color="#00000" />
            </Pressable>
          </View>
        </View>

        {/* RIGHT: PLUS BUTTON */}
        <Pressable
          onPress={() => {
            setTempEnabledSteps(enabledSteps);
            setShowServiceModal(true);
          }}
          className="ml-3 w-9 h-9 rounded-full bg-orange-500 items-center justify-center shadow"
        >
          <AntDesign name="plus" size={20} color="#fff" />
        </Pressable>
      </View>


      <FlatList
        data={EVENT_PRODUCTS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => (
          <EventProductCard
            title={item.title + ` ${activeStep}`}
            guests={item.guests}
            menuType={item.menuType}
            rating={item.rating}
            reviews={item.reviews}
            price={item.price}
            image={item.image}
            added={selections[activeStep].includes(item.id)}
            disabled={false}
            onAdd={() =>
              dispatch(addProduct({ step: activeStep, productId: item.id }))
            }
            onRemove={() =>
              dispatch(removeProduct({ step: activeStep, productId: item.id }))
            }
          />
        )}
      />

 <View
  style={{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: insets.bottom + 20,
  }}
  className="px-4 py-3"
>
  <View className="flex-row justify-between items-center gap-8">
    
    {/* SKIP BUTTON */}
    <Pressable
      onPress={handleSkip}
      className="flex-1 h-14 rounded-2xl border-2 bg-white border-yellow-400  justify-center"
    >
      <Text className="text-center text-base font-semibold text-black">
        Skip
      </Text>
    </Pressable>

    {/* CONTINUE BUTTON */}
    <Pressable
      onPress={handleContinue}
      className="flex-1 h-14 rounded-2xl overflow-hidden"
    >
      <LinearGradient
        colors={['#F97316', '#FACC15']}
        className="flex-1 justify-center"
      >
        <Text className="text-white text-center text-lg font-bold">
          Continue
        </Text>
      </LinearGradient>
    </Pressable>

  </View>
</View>

      {/* FILTER BOTTOM SHEET */}

      <Modal
        visible={showServiceModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowServiceModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-[90%] bg-white rounded-2xl p-5">
            {/* CLOSE */}
            <View className="items-end">
              <Pressable onPress={() => setShowServiceModal(false)}>
                <Text className="text-2xl">✕</Text>
              </Pressable>
            </View>

            {/* TITLE */}
            <View className="relative items-center mb-4">
              <View className="absolute left-0 right-0 top-1/2 h-[1px] bg-orange-400" />
              <Text className="px-4 text-lg font-semibold text-orange-500 bg-white">
                Choose Your Services
              </Text>
            </View>

            {/* SERVICES */}
            <View className="mt-2">
              {ALL_STEPS.map(step => {
                const checked = tempEnabledSteps.includes(step.key);

                return (
                  <Pressable
                    key={step.key}
                    onPress={() => {
                      setTempEnabledSteps(prev =>
                        prev.includes(step.key)
                          ? prev.filter(k => k !== step.key)
                          : [...prev, step.key],
                      );
                    }}
                    className={`flex-row items-center justify-between px-3 py-2 rounded-xl mb-2 `}
                  >
                    {/* LEFT: LABEL */}
                    <Text
                      className={`text-lg font-medium ${
                        checked ? 'text-orange-600' : 'text-orange-500'
                      }`}
                    >
                      {step.label}
                    </Text>

                    {/* RIGHT: CHECKBOX */}
                    <View
                      className={`w-6 h-6 rounded-md border items-center justify-center ${
                        checked
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-gray-400'
                      }`}
                    >
                      {checked && (
                        <Feather name="check" size={16} color="#fff" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* CONFIRM */}
            <Pressable
              onPress={() => {
                // commit once
                setEnabledSteps(tempEnabledSteps);

                // ensure activeStep is valid
                if (!tempEnabledSteps.includes(activeStep)) {
                  setActiveStep(tempEnabledSteps[0]);
                }

                setShowServiceModal(false);
              }}
              className="mt-6"
            >
              <LinearGradient
                colors={['#F97316', '#FACC15']}
                style={{
                  height: 48,
                  borderRadius: 14,
                  justifyContent: 'center',
                }}
              >
                <Text className="text-white text-center font-bold">
                  Confirm
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>


            <FilterBottomSheet ref={filterSheetRef} />

    </View>
  );
}
