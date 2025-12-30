// import React from 'react';
// import { View, Text, Pressable } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';


// type OrderCardProps = {
//   title: string;
//   date: string;
//   time: string;
//   venue: string;
//   location: string;
//   status: any;
//   onPress: () => void;
// };

// export default function OrderCard({
//   title,
//   date,
//   time,
//   venue,
//   location,
//   status,
//   onPress,
// }: OrderCardProps) {
//   const isPaid = status === 'Paid';

//   return (
//     <Pressable
//       onPress={onPress}
//       className="flex-row rounded-2xl bg-white border border-gray-200 overflow-hidden"
//     >
//       {/* LEFT ICON */}
//       <View
//         className={`w-16 items-center justify-center bg-orange-300`} 
//       >
//         <Feather name="gift" size={24} color="white" />
//       </View>

//       {/* CONTENT */}
//       <View className="flex-1 px-4 py-3">
//         <Text className="font-semibold text-base">{title}</Text>

//         <Text className="text-xs text-gray-500 mt-1">{date}</Text>
//         <Text className="text-xs text-gray-500">{time}</Text>

//         <Text className="text-xs text-gray-500 mt-1">
//           {venue} • {location}
//         </Text>
//       </View>

//       {/* STATUS STRIP */}
//       <View
//         className={`w-10 items-center justify-center ${
//           isPaid ? 'bg-green-100' : 'bg-red-300'
//         }`}
//       >
//         <Text
//           className={`text-xs font-semibold rotate-90 ${
//             isPaid ? 'text-green-600' : 'text-black'
//           }`}
//         >
//           {status}
//         </Text>
//       </View>
//     </Pressable>
//   );
// }


import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type OrderCardVariant = 'default' | 'compact';

type OrderCardProps = {
  title: string;
  date: string;
  time?: string;
  venue?: string;
  location: string;
  status?: string;

  onPress: () => void;
  onDelete?: () => void;

  variant?: OrderCardVariant;
};

export default function OrderCard({
  title,
  date,
  time,
  venue,
  location,
  status,
  onPress,
  onDelete,
  variant = 'default',
}: OrderCardProps) {
  /* ---------------- COMPACT VARIANT ---------------- */
if (variant === 'compact') {
  return (
    <View className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <View className="flex-row items-stretch">
        {/* MAIN CONTENT */}
        <Pressable
          onPress={onPress}
          className="flex-row flex-1 items-center px-4 py-4"
        >
          {/* ICON */}
          <View className="w-14 h-14 rounded-xl bg-orange-300 items-center justify-center mr-4">
            <Feather name="gift" size={22} color="white" />
          </View>

          {/* TEXT */}
          <View className="flex-1">
            <Text
              className="font-semibold text-base text-gray-900"
              numberOfLines={1}
            >
              {title}
            </Text>

            <View className="flex-row items-center mt-1">
              <Feather name="map-pin" size={12} color="#6B7280" />
              <Text className="ml-1 text-sm text-gray-500">
                {location}
              </Text>
            </View>

            <Text className="text-sm text-gray-400 mt-0.5">
              {date}
            </Text>
          </View>
        </Pressable>

        {/* DELETE STRIP – FULL HEIGHT */}
        {onDelete && (
          <Pressable
            onPress={onDelete}
            className="w-12 bg-red-300 items-center justify-center"
          >
            <Feather name="trash-2" size={18} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

  return (
    <Pressable
      onPress={onPress}
      className="flex-row rounded-2xl bg-white border border-gray-200 overflow-hidden"
    >
      {/* LEFT ICON */}
      <View className="w-16 items-center justify-center bg-orange-300">
        <Feather name="gift" size={24} color="white" />
      </View>

      {/* CONTENT */}
      <View className="flex-1 px-4 py-3">
        <Text className="font-semibold text-base">{title}</Text>

        <Text className="text-xs text-gray-500 mt-1">
          {date}
        </Text>

        {time && (
          <Text className="text-xs text-gray-500">
            {time}
          </Text>
        )}

        <Text className="text-xs text-gray-500 mt-1">
          {venue} • {location}
        </Text>
      </View>

      {/* STATUS */}
      {status && (
        <View
          className={`w-10 items-center justify-center ${
            status === 'Paid'
              ? 'bg-green-100'
              : 'bg-red-300'
          }`}
        >
          <Text
            className={`text-xs font-semibold rotate-90 ${
              status === 'Paid'
                ? 'text-green-600'
                : 'text-black'
            }`}
          >
            {status}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
