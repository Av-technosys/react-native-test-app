import { Text, TextInput, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function FloatingInput({
  label,
  placeholder,
  icon,
  ...props
}: any) {
  return (
    <View className="mb-4">
      <View className="relative border mt-3 border-orange-400 rounded-xl px-3 pt-3 pb-2">
        {/* FLOATING LABEL */}
        <View className="absolute -top-3 left-3 bg-white px-1">
          <Text className="text-md text-orange-500">
            {label}
          </Text>
        </View>

        <View className="flex-row items-center">
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-black text-sm pt-2"
            {...props}
          />

          {icon && (
            <Feather
              name={icon}
              size={20}
              color="#F97316"
            />
          )}
        </View>
      </View>
    </View>
  );
}
