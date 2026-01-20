import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FloatingInput from '../FloatingInput';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../Button';
import { useAppDispatch } from '../../../store/hooks';
import { setEventId, setEventType } from '../../../store/slices/eventSlice';
import { fetchEventType } from '../../../api/event';
import { createEvent } from '../../../api/event';
import { showMessage } from 'react-native-flash-message';

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

  // EVENT TYPES
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<any | null>(null);

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

  /* ---------------- SUBMIT ---------------- */
  const submitWithEvent = async (eventTypeItem: any) => {
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

      showMessage({
        message: 'Event Created',
        description: 'Your event has been created successfully.',
        type: 'success',
        duration: 3000,
      });
    } catch (error: any) {
      showMessage({
        message: 'Failed',
        description:
          error?.response?.data?.error ||
          error?.message ||
          'Something went wrong',
        type: 'danger',
        duration: 3000,
      });
    }
  };
  /* ---------------- RENDER ---------------- */
  return (
    <View>
      {isBottomSheet && (
        <Text className="text-2xl font-bold text-black mb-6">Details</Text>
      )}

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
          value={date ? date.toDateString() : ''}
          placeholder="Enter Date"
          icon="calendar"
          editable={false}
          onPress={openDatePicker}
        />
      </Pressable>

      {/* TIME */}
      <FloatingInput
        label="Time"
        value={
          time
            ? time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''
        }
        placeholder="Enter Time"
        icon="clock"
        editable={false}
        onPress={openTimePicker}
      />

      {/* GUESTS */}
      <Pressable onPress={() => setShowGuestPicker(p => !p)}>
        <FloatingInput
          label="Guests"
          value={guests ?? ''}
          placeholder="Select number of guests"
          icon={showGuestPicker ? 'chevron-up' : 'chevron-down'}
          editable={false}
          onPress={() => setShowGuestPicker(p => !p)}
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
    </View>
  );
}
