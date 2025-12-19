import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FloatingInput from '../FloatingInput';
import Icon from 'react-native-vector-icons/Feather';

export type BookingDetails = {
  fullName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  guests: string | null;
  eventType: string;
};

type Props = {
  onSubmit: (data: BookingDetails) => void;
  submitLabel?: string;
  isBottomSheet?: boolean;
};

const EVENTS = [
  'Birthday',
  'Wedding',
  'Party',
  'Concert',
  'Engagement',
  'Comedy Show',
  'Pre Wedding Shoot',
  'Screening',
];

export default function EventDetails({
  onSubmit,
  submitLabel = 'Continue',
  isBottomSheet,
}: Props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState<string | null>(null);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [eventType, setEventType] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const isFormValid =
    fullName.trim().length > 0 &&
    phone.trim().length >= 10 &&
    address.trim().length > 0 &&
    !!date &&
    !!time;


  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date || new Date(),
        mode: 'date',
        is24Hour: true,
        onChange: (_, selectedDate) => {
          if (selectedDate) setDate(selectedDate);
        },
      });
    }
  };

  const openTimePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: time || new Date(),
        mode: 'time',
        is24Hour: false,
        onChange: (_, selectedTime) => {
          if (selectedTime) setTime(selectedTime);
        },
      });
    }
  };


  const submitWithEvent = (selectedEvent: string) => {
    onSubmit({
      fullName,
      phone,
      address,
      guests,
      date: date?.toISOString() || '',
      time: time?.toISOString() || '',
      eventType: selectedEvent,
    });
  };

  const handleContinue = () => {
    setShowEventModal(true);
  };


  return (
    <View>
      {isBottomSheet && (
        <Text className="text-2xl font-bold text-black mb-6">Details</Text>
      )}

      {/* BASIC DETAILS */}
      <FloatingInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <FloatingInput
        label="Contact no."
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <FloatingInput
        label="Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* DATE */}
      <Pressable onPress={openDatePicker}>
        <FloatingInput
          label="Date"
          placeholder={date ? date.toDateString() : 'Enter Date'}
          icon="calendar"
          editable={false}
        />
      </Pressable>

      {/* TIME */}
      <Pressable onPress={openTimePicker}>
        <FloatingInput
          label="Time"
          placeholder={
            time
              ? time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Enter Time'
          }
          icon="clock"
          editable={false}
        />
      </Pressable>

      {/* GUESTS */}
      <Pressable onPress={() => setShowGuestPicker(p => !p)}>
        <FloatingInput
          label="Guests"
          placeholder={guests ?? 'Select number of guests'}
          icon={showGuestPicker ? 'chevron-up' : 'chevron-down'}
          editable={false}
        />
      </Pressable>

      {showGuestPicker && (
        <View className="border border-gray-200 rounded-xl bg-white mb-4">
          {['0–100', '101–200', '201–350', '351–500'].map(option => (
            <Pressable
              key={option}
              onPress={() => {
                setGuests(option);
                setShowGuestPicker(false);
              }}
              className="px-4 py-3"
            >
              <Text className="text-gray-700">{option}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* CONTINUE BUTTON */}
      <View className="mt-6">
        <Pressable disabled={!isFormValid} onPress={handleContinue}>
          <LinearGradient
            colors={
              isFormValid ? ['#F97316', '#FACC15'] : ['#E5E7EB', '#E5E7EB']
            }
            style={{
              height: 64,
              borderRadius: 18,
              justifyContent: 'center',
              opacity: isFormValid ? 1 : 0.7,
            }}
          >
            <Text className="text-white text-center text-lg font-bold">
              {submitLabel}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* EVENT MODAL */}
      {!isBottomSheet && (
        <Modal
          visible={showEventModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowEventModal(false)}
        >
          <View className="flex-1 items-center justify-center bg-black/40">
            <View className="w-[90%] bg-white rounded-2xl p-5 max-h-[70%]">
              {/* CLOSE */}
              <View className="items-end mb-2">
                <Pressable onPress={() => setShowEventModal(false)}>
                  <Text className="text-2xl text-black">✕</Text>
                </Pressable>
              </View>

              {/* TITLE */}
              <View className="relative items-center mb-4">
                <View className="absolute left-0 right-0 top-1/2 h-[1px] bg-orange-400" />
                <Text className="px-4 text-xl font-semibold text-orange-500 bg-white z-10">
                  Choose Your Event
                </Text>
              </View>

              {EVENTS.map(item => {
                const selected = item === eventType;
                return (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setEventType(item);
                      setShowEventModal(false);
                      submitWithEvent(item);
                    }}
                    className={`py-3 flex-row justify-between items-center ${
                      selected ? 'bg-orange-50 rounded-lg px-2' : ''
                    }`}
                  >
                    <Text
                      className={`text-md font-semibold ${
                        selected ? 'text-orange-600' : 'text-orange-500'
                      }`}
                    >
                      {item}
                    </Text>
                    <Icon name="chevron-right" size={20} color="#000" />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
