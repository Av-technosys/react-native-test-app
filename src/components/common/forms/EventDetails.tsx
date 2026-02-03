/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FloatingInput from '../FloatingInput';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../Button';
import { useAppDispatch } from '../../../store/hooks';
import { resetEvent, setEventId, setEventType } from '../../../store/slices/eventSlice';
import { fetchEventType } from '../../../api/event';
import { createEvent } from '../../../api/event';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';

import {TimePickerModal } from 'react-native-paper-dates';
import { showAndroidToast } from '../../toast/androidToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

type Props = {
  onSubmit: (data: any) => void;
  submitLabel?: string;
  isBottomSheet?: boolean;
};

export default function EventDetails({
  onSubmit,
  submitLabel = 'Continue',
  isBottomSheet,
}: Props) {
  const dispatch = useAppDispatch();

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
  // EVENT TYPES
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<any | null>(null);
const bookingDetails = useSelector(
(state: RootState) => state.event.bookingDetails
);
  // UI STATES
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  /* ---------------- FETCH EVENT TYPES ---------------- */
  useEffect(() => {
    const loadEventTypes = async () => {
      try {
        const res = await fetchEventType();
        setEventTypes(res.data);
      } catch (err) {
        console.error('Failed to fetch event types', err);
      }
    };

    loadEventTypes();
  }, []);

  /* ---------------- VALIDATION ---------------- */
  const isFormValid =
    fullName.trim().length > 0 &&
    phone.trim().length >= 10 &&
    address.trim().length > 0 &&
    !!date &&
    !!time;

  /* ---------------- HELPERS ---------------- */
  const parseGuestRange = (value: string | null) => {
    if (!value) return { min: 0, max: 0 };
    const [min, max] = value.split('–').map(Number);
    return { min, max };
  };



  /* ---------------- SUBMIT ---------------- */
const submitWithEvent = async (eventTypeItem: any) => {

      // ✅ reset only if booking already exists
    const hasExistingBooking =
    bookingDetails &&
    (bookingDetails.startTime || bookingDetails.contactName);


    if (hasExistingBooking) {
    dispatch(resetEvent());
    }

    if (!date || !time) return;

    const start = new Date(date);
    start.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + 4);

    const { min, max } = parseGuestRange(guests);

    const payload = {
      eventTypeId: eventTypeItem.id,
      contactName: fullName.trim(),
      contactNumber: phone.trim(),
      description: address.trim(),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      minGuestCount: min,
      maxGuestCount: max,
      latitude: '38.45',
      longitude: '40.45',
    };
 console.log("sending ", payload)
    try {
      dispatch(
        setEventType({
          id: eventTypeItem.id,
          name: eventTypeItem.name,
          image: eventTypeItem.image ?? null,
        }),
      );
      // 1️⃣ store payload in redux
      onSubmit(payload);

      const res = await createEvent(payload);

      dispatch(setEventId(res?.data?.eventId || res?.data?.data?.eventId));

       
     showAndroidToast('Event created successfully');  
    } catch (error: any) {
      showAndroidToast('Failed to create event. Please try again.');
    }
  };
  /* ---------------- RENDER ---------------- */
  return (
    <View>
      {isBottomSheet && (
        <Text className="text-2xl font-bold text-black mb-6">Details</Text>
      )}
<View className="mt-1">
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
<FloatingInput
label="Time"
value={time ? dayjs(time).format('hh:mm A') : ''}
placeholder="Select time"
icon="clock"
editable={false}
onPress={() => setShowTimePicker(true)}
/>

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


      {/* CONTINUE */}
      <View className="mt-6">
        <Button
          label={submitLabel}
          variant="primary"
          className="w-full h-16 rounded-[18px]"
          disabled={!isFormValid}
          onPress={() => setShowEventModal(true)}
        />
      </View>

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
              <View className="items-end mb-2">
                <Pressable onPress={() => setShowEventModal(false)}>
                  <Text className="text-2xl text-black">✕</Text>
                </Pressable>
              </View>

              <View className="relative items-center mb-4">
                <View className="absolute left-0 right-0 top-1/2 h-[1px] bg-orange-400" />
                <Text className="px-4 text-xl font-semibold text-orange-500 bg-white z-10">
                  Choose Your Event
                </Text>
              </View>

              {eventTypes.map(item => {
                const selected = selectedEventType?.id === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      setSelectedEventType(item);
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
                      {item.name}
                    </Text>
                    <Icon name="chevron-right" size={20} color="#000" />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Modal>
      )}


      {showGuestPicker && 
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

      {['0–100', '101–200', '201–350', '351–500'].map(option => {
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


      }


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
  );
}
