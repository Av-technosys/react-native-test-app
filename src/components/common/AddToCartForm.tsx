/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  UIManager,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import FloatingInput from '../common/FloatingInput';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Product = {
  product: {
    ProductId: string;
    title: string;
    vendorName: string;
    price: number;
  };
};


export default function AddToCartForm({ product }: Product) {

  const dispatch = useAppDispatch();
  const [guests, setGuests] = useState<string | null>(null);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
const [fullName, setFullName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


const handleAddToCart = () => {
  dispatch(
    addToCart({
      ProductId: product.ProductId,
      title: product.title,
      vendorName: product.vendorName,
      price: product.price,
      quantity: 1,
      bookingDetails: {
        fullName,
        phone,
        address,
        date: date?.toISOString() || '',
        time: time?.toISOString() || '',
        guests,
      },
    })
  );
};


  return (
    <View>
      {/* HEADER */}
      <Text className="text-2xl font-bold text-black mb-6">Details</Text>

      {/* FLOATING INPUTS */}
      <FloatingInput label="Full Name"   value={fullName}
  onChangeText={setFullName}  placeholder="Enter Your Full Name" />
      <FloatingInput
        label="Contact no."
        placeholder="Enter Your Contact no."
        keyboardType="phone-pad"
  value={phone}
  onChangeText={setPhone}
      />
      <FloatingInput label="Address"  value={address}
  onChangeText={setAddress}  placeholder="Enter Your Address" />

      {/* DATE */}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <FloatingInput
          label="Date"
          placeholder={date ? date.toDateString() : 'Enter Date'}
          icon="calendar"
          editable={false}
        />
      </Pressable>

      {/* TIME */}
      <Pressable onPress={() => setShowTimePicker(true)}>
        <FloatingInput
          label="Time"
          placeholder={
            time
              ? time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Enter Timing'
          }
          icon="clock"
          editable={false}
        />
      </Pressable>

      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_: any, selectedDate: Date | undefined) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* TIME PICKER */}
      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_: any, selectedTime: Date | undefined) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}
{/* GUESTS SELECT */}
<Pressable
  onPress={() => setShowGuestPicker(prev => !prev)}
>
  <FloatingInput
    label="Guests"
    placeholder={guests ?? 'Select number of guests'}
    icon={showGuestPicker ? 'chevron-up' : 'chevron-down'}
    editable={false}
  />
</Pressable>

{showGuestPicker && (
  <View className=" border border-gray-200 rounded-xl bg-white">
    {['0–100', '101–200', '201–350', '351–500'].map(option => {
      const selected = guests === option;

      return (
        <Pressable
          key={option}
          onPress={() => {
            setGuests(option);
            setShowGuestPicker(false);
          }}
          className={`px-4 py-3 ${
            selected ? 'bg-orange-50' : ''
          }`}
        >
          <Text
            className={`${
              selected ? 'text-orange-600 font-semibold' : 'text-gray-700'
            }`}
          >
            {option}
          </Text>
        </Pressable>
      );
    })}
  </View>
)}


      {/* CTA BUTTON (CENTERED) */}
      <View className="items-center mt-8 mb-4">
        <Pressable
          onPress={handleAddToCart}

          style={{
            borderRadius: 18,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <LinearGradient
            colors={['#F97316', '#FACC15']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 64,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text className="text-white text-xl font-bold">Add to Cart</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
