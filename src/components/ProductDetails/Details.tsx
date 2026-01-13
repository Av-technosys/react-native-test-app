import React from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Markdown from 'react-native-markdown-display';

/**
 * ALWAYS return a string to Markdown
 * Prevents AstRenderer crash
 */
const safeMarkdown = (value?: string | null) =>
  typeof value === 'string' ? value : '';

type DetailsProps = {
  title?: string;
  subtitle?: string;
  rating: number;
  ratingCount: string;
  price?: number | null;
  description?: string;
  services?: any;
};

export default function Details({
  title,
  subtitle,
  rating,
  ratingCount,
  price,
  description,
  services,
}: DetailsProps) {
  return (
    <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">

      {/* TITLE */}
      <Markdown
        style={{
          body: {
            fontSize: 22,
            fontWeight: '700',
            color: '#000',
            lineHeight: 28,
          },
          paragraph: { marginBottom: 0 },
        }}
      >
        {safeMarkdown(title)}
      </Markdown>

      {/* SUBTITLE */}
      <Markdown
        style={{
          body: {
            fontSize: 16,
            color: '#6B7280',
            lineHeight: 22,
            marginTop: 4,
          },
          paragraph: { marginBottom: 0 },
        }}
      >
        {safeMarkdown(subtitle)}
      </Markdown>

      {/* RATING */}
      <View className="mt-2 flex-row items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <AntDesign
            key={index}
            name="star"
            size={16}
            color={index < Math.round(rating) ? '#FACC15' : '#E5E7EB'}
            style={{ marginRight: 2 }}
          />
        ))}
        <Text className="ml-2 text-md text-gray-500">
          {ratingCount}
        </Text>
      </View>

      {/* PRICE (only if available) */}
      {typeof price === 'number' && (
        <View className="mt-3 flex-row items-center">
          <MaterialIcons
            name="attach-money"
            size={24}
            color="#F97316"
          />
          <Text className="text-2xl font-bold text-orange-500">
            {price}
          </Text>
        </View>
      )}

      {/* CTA */}
      <Text className="mt-1 text-md text-gray-500">
        See all options
      </Text>

      {/* DIVIDER */}
      <View className="my-4 h-px bg-gray-200" />

      {/* DESCRIPTION */}
      <Text className="text-base font-semibold text-black">
        Description
      </Text>

      <Markdown
        style={{
          body: {
            color: '#4B5563',
            fontSize: 14,
            lineHeight: 22,
            marginTop: 8,
          },
          paragraph: { marginBottom: 6 },
          strong: { fontWeight: '700' },
          em: { fontStyle: 'italic' },
          bullet_list: { marginTop: 6 },
          list_item: { marginBottom: 4 },
        }}
      >
        {safeMarkdown(description)}
      </Markdown>

      {/* SERVICES */}
      <Text className="mt-4 text-base font-semibold text-black">
        What We Provide
      </Text>

      <Markdown
        style={{
          body: {
            color: '#4B5563',
            fontSize: 14,
            lineHeight: 22,
            marginTop: 8,
          },
          bullet_list: { marginTop: 6 },
          list_item: { marginBottom: 4 },
        }}
      >
        {safeMarkdown(services)}
      </Markdown>

    </View>
  );
}
