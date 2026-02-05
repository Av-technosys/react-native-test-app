import React, {useState } from 'react';
import { View, Text, Pressable, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { addCartItem } from '../../api/cart'; // Assuming you have this API function
import FloatingInput from '../common/FloatingInput';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';

import {TimePickerModal } from 'react-native-paper-dates';
import { showAndroidToast } from '../toast/androidToast';


// API payload type
type AddCartItemPayload = {
  productId: number;
  quantity: number;
  name: string;
  contactNumber: string;
  date: string; // ISO string
  minGuestCount: number;
  maxGuestCount: number;
  latitude: number;
  longitude: number;
};

type Props = {
  product: {
    ProductId: number;
    title: string;
    vendorName: string;
    price: number;
  };
};

export default function AddToCartForm({ product }: Props) {
  const dispatch = useAppDispatch();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 20;
const navigation = useNavigation();

  // BASIC DETAILS
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState<string | null>(null);

  // DATE & TIME
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);
  // UI STATES
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const isFormValid =
    fullName.trim().length > 0 &&
    phone.trim().length >= 10 &&
    address.trim().length > 0 &&
    !!date &&
    !!time &&
    !!guests;

  /* ---------------- HELPERS ---------------- */
  const parseGuestRange = (value: string | null) => {
    if (!value) return { min: 0, max: 0 };
    const [min, max] = value.split('–').map(Number);
    return { min, max };
  };


  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async () => {
    if (!date || !time || !guests) return;

    // Combine date and time
    const eventDate = new Date(date);
    eventDate.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const { min, max } = parseGuestRange(guests);

    // Prepare payload for API
    const apiPayload: AddCartItemPayload = {
      productId: product.ProductId,
      quantity: 1,
      name: fullName.trim(),
      contactNumber: phone.trim(),
      date: eventDate.toISOString(),
      minGuestCount: min,
      maxGuestCount: max,
      latitude: 38.45, // Default value, you might want to get actual location
      longitude: 40.45, // Default value
    };

    // Prepare payload for Redux
    const reduxPayload :any = {
      ProductId: product.ProductId,
      title: product.title,
      vendorName: product.vendorName,
      price: product.price,
      quantity: 1,
      bookingDetails: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        date: eventDate.toISOString(),
        guests: guests,
        time: time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    };

    try {
      setLoading(true);

      // 1. Call API to add to cart on server
      const apiResponse = await addCartItem(apiPayload);
     console.log(apiResponse)
     console.log(apiPayload)
      // 2. Dispatch to Redux store for local state
      dispatch(addToCart(reduxPayload));


      showAndroidToast('Added to Cart Successfully');

      navigation.getParent()?.navigate('MainTabs', {
        screen: 'Cart',
      });

     
      // 4. Optional: Reset form
      setFullName('');
      setPhone('');
      setAddress('');
      setGuests(null);
      setDate(null);
      setTime(null);

      console.log('API Response:', apiResponse);
      console.log('Redux Payload:', reduxPayload);

    } catch (error: any) {
      showAndroidToast('Failed to add to cart. Please try again.');
      console.error('Add to cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  
  /* ---------------- RENDER ---------------- */
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View>
        <Text className="text-2xl font-bold text-black mb-6">Booking Details</Text>

        <FloatingInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <FloatingInput
          label="Contact no."
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
        />

        <FloatingInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter event address"
        />


{/* DATE */}

<Pressable onPress={() => setShowDatePicker(true)}>
  <FloatingInput
    label="Date"
    value={date ? dayjs(date).format('DD MMM YYYY') : ''}
    placeholder="Select date"
    icon="calendar"
    editable={false}
  />
</Pressable>


{/* TIME */}
<Pressable onPress={() => setShowTimePicker(true)}>
  <FloatingInput
    label="Time"
    value={time ? dayjs(time).format('hh:mm A') : ''}
    placeholder="Select time"
    icon="clock"
    editable={false}
  />
</Pressable>

<TimePickerModal
  visible={showTimePicker}
  onDismiss={() => setShowTimePicker(false)}
  onConfirm={({ hours, minutes }) => {
    const base = dayjs(date ?? new Date());
    setTime(
      base.hour(hours).minute(minutes).second(0).toDate()
    );
    setShowTimePicker(false);
  }}
/>


        {/* GUESTS */}
        <Pressable onPress={() => setShowGuestPicker(true)}>
          <FloatingInput
            label="Guests"
            value={guests ?? ''}
            placeholder="Select number of guests"
            icon="chevron-down"
            editable={false}
          />
        </Pressable>

        {/* ADD TO CART BUTTON */}
        <View className="mt-6">
          <Button
            label={loading ? "Adding..." : "Add to Cart"}
            variant="primary"
            className="w-full h-16 rounded-[18px]"
            disabled={!isFormValid || loading}
            onPress={handleSubmit}
          />
        </View>

        {/* GUEST PICKER MODAL */}
        {showGuestPicker && (
          <Modal
            visible={showGuestPicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowGuestPicker(false)}
          >
            <Pressable
              className="flex-1 bg-black/40 justify-end"
              onPress={() => setShowGuestPicker(false)}
            >
              <View className="bg-white rounded-t-3xl px-5 pt-4 pb-6">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-semibold text-black">
                    Select Guests
                  </Text>
                  <Pressable onPress={() => setShowGuestPicker(false)}>
                    <Text className="text-gray-500 text-lg">✕</Text>
                  </Pressable>
                </View>

                {['0–100', '101–200', '201–350', '351–500'].map((option) => {
                  const selected = guests === option;

                  return (
                    <Pressable
                      key={option}
                      onPress={() => {
                        setGuests(option);
                        setShowGuestPicker(false);
                      }}
                      className={`py-4 px-3 rounded-xl mb-2 flex-row justify-between items-center ${
                        selected ? 'bg-orange-50' : ''
                      }`}
                    >
                      <Text
                        className={`text-base ${
                          selected
                            ? 'text-orange-600 font-semibold'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </Text>

                      {selected && (
                        <Text className="text-orange-500 text-lg">✓</Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </Pressable>
          </Modal>
        )}


<Modal
  visible={showDatePicker}
  transparent
  animationType="fade"
  onRequestClose={() => setShowDatePicker(false)}
>
  <Pressable
    className="flex-1 bg-black/40 justify-center px-5"
    onPress={() => setShowDatePicker(false)}
  >
    {/* Stop propagation so taps inside don’t close */}
    <Pressable className="bg-white rounded-2xl p-4">

<Calendar
  minDate={dayjs().format('YYYY-MM-DD')}
  onDayPress={(day) => {
    setDate(dayjs(day.dateString).toDate());
    setShowDatePicker(false);
  }}
  markedDates={
    date
      ? {
          [dayjs(date).format('YYYY-MM-DD')]: {
            selected: true,
            selectedColor: '#f97316',
          },
        }
      : {}
  }
/>

    </Pressable>
  </Pressable>
</Modal>


      </View>

    </KeyboardAvoidingView>
  );
}


