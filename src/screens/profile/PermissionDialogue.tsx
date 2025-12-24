import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function PermissionDialog({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
    const [selected, setSelected] = useState('once');

    const OPTIONS = [
        { id: 'once', label: 'Only Once' },
        { id: 'while', label: 'While using this app' },
        { id: 'always', label: 'Permanent' },
    ];

    return (
        <Modal transparent visible={visible} animationType="fade">
            {/* Overlay */}
            <Pressable
                className="flex-1 bg-black/40 items-center justify-center px-6"
                onPress={onClose}
            >
                {/* Dialog */}
                <Pressable
                    onPress={() => { }}
                    className="bg-white w-full rounded-2xl p-6"
                >
                    <Text className="text-lg font-semibold text-center">
                        Location
                    </Text>

                    <Text className="text-center text-gray-600 mt-2">
                        Freaky Chimp need permission access
                    </Text>

                    <Text className="text-center text-gray-600 mt-1">
                        Do you want to give access?
                    </Text>

                    {/* Options */}
                    <View className="mt-5 gap-4">
                        {OPTIONS.map((opt) => (
                            <Pressable
                                key={opt.id}
                                onPress={() => setSelected(opt.id)}
                                className="flex-row items-center justify-between"
                            >
                                <Text className="text-gray-700">
                                    {opt.label}
                                </Text>

                                <View
                                    className={`h-5 w-5 rounded-full border-2 items-center justify-center ${selected === opt.id
                                            ? 'border-orange-500'
                                            : 'border-gray-300'
                                        }`}
                                >
                                    {selected === opt.id && (
                                        <View className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                                    )}
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    {/* Confirm */}
                    <LinearGradient
                        colors={['#F97316', '#FACC15']}
                        className="rounded-xl mt-6"
                    >
                        <Pressable
                            onPress={onClose}
                            className="py-3 items-center"
                        >
                            <Text className="text-white font-semibold">
                                Confirm
                            </Text>
                        </Pressable>
                    </LinearGradient>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
