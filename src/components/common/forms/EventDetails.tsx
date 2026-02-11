// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { View, Text, Pressable, Modal, Platform } from 'react-native';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import FloatingInput from '../FloatingInput';
// import Icon from 'react-native-vector-icons/Feather';
// import Button from '../Button';
// import { useAppDispatch } from '../../../store/hooks';
// import { resetEvent, setEventId, setEventType } from '../../../store/slices/eventSlice';
// import { fetchEventType } from '../../../api/event';
// import { createEvent } from '../../../api/event';
// import dayjs from 'dayjs';
// import { Calendar } from 'react-native-calendars';

// import {TimePickerModal } from 'react-native-paper-dates';
// import { showAndroidToast } from '../../toast/androidToast';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import { Dropdown } from 'react-native-element-dropdown';

// type Props = {
//   onSubmit: (data: any) => void;
//   submitLabel?: string;
//   isBottomSheet?: boolean;
// };

// export default function EventDetails({
//   onSubmit,
//   submitLabel = 'Continue',
//   isBottomSheet,
// }: Props) {
//   const dispatch = useAppDispatch();

//   // BASIC DETAILS
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [guests, setGuests] = useState<string | null>(null);

//   // DATE & TIME
//   const [date, setDate] = useState<Date | null>(null);
//   const [time, setTime] = useState<Date | null>(null);
// const [showDatePicker, setShowDatePicker] = useState(false);
// const [showTimePicker, setShowTimePicker] = useState(false);
//   // EVENT TYPES
//   const [eventTypes, setEventTypes] = useState<any[]>([]);
//   const [selectedEventType, setSelectedEventType] = useState<any | null>(null);
// const bookingDetails = useSelector(
// (state: RootState) => state.event.bookingDetails
// );
//   // UI STATES
//   const [showEventModal, setShowEventModal] = useState(false);
// const guestOptions = [
//   '0–100',
//   '101–200',
//   '201–350',
//   '351–500',
// ].map(g => ({ label: g, value: g }));

// const [guestFocus, setGuestFocus] = useState(false);

//   /* ---------------- FETCH EVENT TYPES ---------------- */
//   useEffect(() => {
//     const loadEventTypes = async () => {
//       try {
//         const res = await fetchEventType();
//         setEventTypes(res.data);
//       } catch (err) {
//         console.error('Failed to fetch event types', err);
//       }
//     };

//     loadEventTypes();
//   }, []);

//   /* ---------------- VALIDATION ---------------- */
//   const isFormValid =
//     fullName.trim().length > 0 &&
//     phone.trim().length >= 10 &&
//     address.trim().length > 0 &&
//     !!date &&
//     !!time;

//   /* ---------------- HELPERS ---------------- */
//   const parseGuestRange = (value: string | null) => {
//     if (!value) return { min: 0, max: 0 };
//     const [min, max] = value.split('–').map(Number);
//     return { min, max };
//   };



//   /* ---------------- SUBMIT ---------------- */
// const submitWithEvent = async (eventTypeItem: any) => {

//       // ✅ reset only if booking already exists
//     const hasExistingBooking =
//     bookingDetails &&
//     (bookingDetails.startTime || bookingDetails.contactName);


//     if (hasExistingBooking) {
//     dispatch(resetEvent());
//     }

//     if (!date || !time) return;

//     const start = new Date(date);
//     start.setHours(time.getHours(), time.getMinutes(), 0, 0);

//     const end = new Date(start);
//     end.setHours(start.getHours() + 4);

//     const { min, max } = parseGuestRange(guests);

//     const payload = {
//       eventTypeId: eventTypeItem.id,
//       contactName: fullName.trim(),
//       contactNumber: phone.trim(),
//       description: address.trim(),
//       startTime: start.toISOString(),
//       endTime: end.toISOString(),
//       minGuestCount: min,
//       maxGuestCount: max,
//       latitude: '38.45',
//       longitude: '40.45',
//     };
//  console.log("sending ", payload)
//     try {
//       dispatch(
//         setEventType({
//           id: eventTypeItem.id,
//           name: eventTypeItem.name,
//           image: eventTypeItem.image ?? null,
//         }),
//       );
//       // 1️⃣ store payload in redux
//       onSubmit(payload);

//       const res = await createEvent(payload);

//       dispatch(setEventId(res?.data?.eventId || res?.data?.data?.eventId));

       
//      showAndroidToast('Event created successfully');  
//     } catch (error: any) {
//       showAndroidToast('Failed to create event. Please try again.');
//     }
//   };
//   /* ---------------- RENDER ---------------- */
//   return (
//     <View>
//       {isBottomSheet && (
//         <Text className="text-2xl font-bold text-black mb-6">Details</Text>
//       )}
// <View className="mt-1">
//       <FloatingInput
      
//         label="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <FloatingInput
//         label="Contact no."
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />

//       <FloatingInput
//         label="Address"
//         value={address}
//         onChangeText={setAddress}
//       />

//       {/* DATE */}


// {/* DATE */}

// <Pressable onPress={() => setShowDatePicker(true)}>
//   <FloatingInput
//     label="Date"
//     value={date ? dayjs(date).format('DD MMM YYYY') : ''}
//     placeholder="Select date"
//     editable={false}
//   />
// </Pressable>


// {/* TIME */}
// <FloatingInput
// label="Time"
// value={time ? dayjs(time).format('hh:mm A') : ''}
// placeholder="Select time"
// editable={false}
// onPress={() => setShowTimePicker(true)}
// />

// <TimePickerModal
//   visible={showTimePicker}
//   onDismiss={() => setShowTimePicker(false)}
//   onConfirm={({ hours, minutes }) => {
//     const base = dayjs(date ?? new Date());
//     setTime(
//       base.hour(hours).minute(minutes).second(0).toDate()
//     );
//     setShowTimePicker(false);
//   }}
  
// />


//       {/* GUESTS */}

// <View style={{ marginBottom: 8 }}>
//   <View
//     style={{
//       borderWidth: 1.5,
//       borderColor: guestFocus ? '#FB923C' : '#FB923C',
//       borderRadius: 12,
//       paddingHorizontal: 12,
//       paddingTop: 6,
//       paddingBottom: 2,
//       backgroundColor: 'white',
//       marginTop:8
//     }}
//   >
//     <Text
//       style={{
//         position: 'absolute',
//         top: -8,
//         left: 10,
//         backgroundColor: 'white',
//         paddingHorizontal: 4,
//         fontSize: 12,
//         color: '#FB923C',
//       }}
//     >
//       Guests
//     </Text>

//     <Dropdown
//       style={{ height: 44 }}
//       data={guestOptions}
//       labelField="label"
//       valueField="value"
//       value={guests}
//       placeholder="Select guests"
//       placeholderStyle={{ color: '#9CA3AF', fontSize: 13 }}
//       selectedTextStyle={{ color: '#000000', fontSize: 13 }}

//       onFocus={() => setGuestFocus(true)}
//       onBlur={() => setGuestFocus(false)}
//       onChange={item => {
//         setGuests(item.value);
//         setGuestFocus(false);
//       }}


//       containerStyle={{
//         borderRadius: 12,
//         overflow: 'hidden',
//         elevation: 4,
//       }}
//       activeColor="#FFF7ED"
//     />
//   </View>
// </View>


//       {/* CONTINUE */}
//       <View className="mt-6">
//         <Button
//           label={submitLabel}
//           variant="primary"
//           className="w-full h-16 rounded-[18px]"
//           disabled={!isFormValid}
//           onPress={() => setShowEventModal(true)}
//         />
//       </View>

// </View>
//       {/* EVENT MODAL */}
//       {!isBottomSheet && (
//         <Modal
//           visible={showEventModal}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setShowEventModal(false)}
//         >
//           <View className="flex-1 items-center justify-center bg-black/40">
//             <View className="w-[90%] bg-white rounded-2xl p-5 max-h-[70%]">
//               <View className="items-end mb-2">
//                 <Pressable onPress={() => setShowEventModal(false)}>
//                   <Text className="text-2xl text-black">✕</Text>
//                 </Pressable>
//               </View>

//               <View className="relative items-center mb-4">
//                 <View className="absolute left-0 right-0 top-1/2 h-[1px] bg-orange-400" />
//                 <Text className="px-4 text-xl font-semibold text-orange-500 bg-white z-10">
//                   Choose Your Event
//                 </Text>
//               </View>

//               {eventTypes.map(item => {
//                 const selected = selectedEventType?.id === item.id;

//                 return (
//                   <Pressable
//                     key={item.id}
//                     onPress={() => {
//                       setSelectedEventType(item);
//                       setShowEventModal(false);
//                       submitWithEvent(item);
//                     }}
//                     className={`py-3 flex-row justify-between items-center ${
//                       selected ? 'bg-orange-50 rounded-lg px-2' : ''
//                     }`}
//                   >
//                     <Text
//                       className={`text-md font-semibold ${
//                         selected ? 'text-orange-600' : 'text-orange-500'
//                       }`}
//                     >
//                       {item.name}
//                     </Text>
//                     <Icon name="chevron-right" size={20} color="#000" />
//                   </Pressable>
//                 );
//               })}
//             </View>
//           </View>
//         </Modal>
//       )}


  

//       <Modal
//         visible={showDatePicker}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowDatePicker(false)}
//       >
//         <Pressable
//           className="flex-1 bg-black/40 justify-center px-5"
//           onPress={() => setShowDatePicker(false)}
//         >
//           {/* Stop propagation so taps inside don’t close */}
//           <Pressable className="bg-white rounded-2xl p-4">
      
//       <Calendar
//         minDate={dayjs().format('YYYY-MM-DD')}
//         onDayPress={(day) => {
//           setDate(dayjs(day.dateString).toDate());
//           setShowDatePicker(false);
//         }}
//         markedDates={
//           date
//             ? {
//                 [dayjs(date).format('YYYY-MM-DD')]: {
//                   selected: true,
//                   selectedColor: '#f97316',
//                 },
//               }
//             : {}
//         }
//       />
      
//           </Pressable>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FloatingInput from '../FloatingInput';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../Button';
import { useAppDispatch } from '../../../store/hooks';
import { resetEvent, setEventId, setEventType } from '../../../store/slices/eventSlice';
import { fetchEventType, createEvent } from '../../../api/event';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { showAndroidToast } from '../../toast/androidToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState<string | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<any | null>(null);

  const bookingDetails = useSelector((state: RootState) => state.event.bookingDetails);

  const [showEventModal, setShowEventModal] = useState(false);

  const guestOptions = ['0–100','101–200','201–350','351–500'].map(g => ({ label: g, value: g }));
  const [guestFocus, setGuestFocus] = useState(false);

  useEffect(() => {
    fetchEventType().then(res => setEventTypes(res.data)).catch(()=>{});
  }, []);

  const isFormValid =
    fullName.trim().length > 0 &&
    phone.trim().length >= 10 &&
    address.trim().length > 0 &&
    !!date &&
    !!time;

  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time ?? new Date(),
      mode: 'time',
      is24Hour: false,
      onChange: (_, selected) => {
        if (selected) setTime(selected);
      },
    });
  };

  const parseGuestRange = (value: string | null) => {
    if (!value) return { min: 0, max: 0 };
    const [min, max] = value.split('–').map(Number);
    return { min, max };
  };

  const submitWithEvent = async (eventTypeItem: any) => {

    const hasExistingBooking = bookingDetails && (bookingDetails.startTime || bookingDetails.contactName);
    if (hasExistingBooking) dispatch(resetEvent());

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
      dispatch(setEventType({
        id: eventTypeItem.id,
        name: eventTypeItem.name,
        image: eventTypeItem.image ?? null,
      }));

      onSubmit(payload);

      const res = await createEvent(payload);
      dispatch(setEventId(res?.data?.eventId || res?.data?.data?.eventId));

      showAndroidToast('Event created successfully');
    } catch {
      showAndroidToast('Failed to create event. Please try again.');
    }
  };

  return (
       <KeyboardAwareScrollView
      bottomOffset={80}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 4 }}
    >

     

      <FloatingInput size="medium" label="Full Name" value={fullName} onChangeText={setFullName}/>
      <FloatingInput size="medium" label="Contact no." value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
      <FloatingInput size="medium" label="Address" value={address} onChangeText={setAddress}/>

      {/* DATE */}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <FloatingInput
          size="medium"
          label="Date"
          value={date ? dayjs(date).format('DD MMM YYYY') : ''}
          placeholder="Select date"
          editable={false}
        />
      </Pressable>

      {/* TIME */}
      <Pressable onPress={openTimePicker}>
        <FloatingInput
          size="medium"
          label="Time"
          value={time ? dayjs(time).format('hh:mm A') : ''}
          placeholder="Select time"
          editable={false}
        />
      </Pressable>

      {/* GUESTS */}
 <View style={{ marginTop: 8 }}>
  <View
    style={{
      borderWidth: 1.5,
      borderRadius: 12,
      borderColor: guestFocus ? '#FB923C' : '#FB923C',
      backgroundColor: 'white',
      height: 55,
      justifyContent: 'center',
      paddingHorizontal: 14,
    }}
  >
    {/* floating label */}
    <Text
      style={{
        position: 'absolute',
        top: -8,
        left: 10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        fontSize: 12,
        color: '#FB923C',
      }}
    >
      Guests
    </Text>

    <Dropdown
      style={{ height: 36 }}

      data={guestOptions}
      labelField="label"
      valueField="value"
      value={guests}
      placeholder="Select guests"

      placeholderStyle={{
        fontSize: 16,
        color: '#9CA3AF',
      }}

      selectedTextStyle={{
        fontSize: 16,
        color: '#000',
      }}

      itemTextStyle={{
        fontSize: 16,
        color: '#374151',
      }}

      activeColor="#FFF7ED"

      onFocus={() => setGuestFocus(true)}
      onBlur={() => setGuestFocus(false)}
      onChange={item => {
        setGuests(item.value);
        setGuestFocus(false);
      }}

      containerStyle={{
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
      }}
    />
  </View>
</View>

      <View className="mt-16">
        <Button
          label={submitLabel}
          variant="primary"
          className="w-full h-14 rounded-[18px]"
          disabled={!isFormValid}
          onPress={()=>setShowEventModal(true)}
        />
      </View>

      {/* EVENT TYPE MODAL */}
      <Modal visible={showEventModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-[90%] bg-white rounded-2xl p-5 max-h-[70%]">
            {eventTypes.map(item=>(
              <Pressable key={item.id} onPress={()=>submitWithEvent(item)} className="py-3 flex-row justify-between items-center">
                <Text className="text-md font-semibold text-orange-500">{item.name}</Text>
                <Icon name="chevron-right" size={20} color="#000"/>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* DATE MODAL */}
      <Modal visible={showDatePicker} transparent animationType="fade">
        <Pressable className="flex-1 bg-black/40 justify-center px-5" onPress={()=>setShowDatePicker(false)}>
          <Pressable className="bg-white rounded-2xl p-4">
            <Calendar
              minDate={dayjs().format('YYYY-MM-DD')}
              onDayPress={day=>{
                setDate(dayjs(day.dateString).toDate());
                setShowDatePicker(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

    </KeyboardAwareScrollView>
  );
}