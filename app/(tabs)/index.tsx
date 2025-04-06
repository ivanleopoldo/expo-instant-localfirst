import Note from '@/components/note';
import { TNote } from '@/lib/types';
import { Link, Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const data: TNote[] = [
    {
      id: '1',
      title: 'Hello',
    },
    {
      id: '2',
      title: 'Untitled Note',
    },
    {
      id: '3',
      title: 'What is this',
    },
    {
      id: '4',
      title: 'How to use Expo?',
    },
  ];
  return (
    <View className="h-full w-full justify-center">
      <Stack.Screen options={{ title: 'Tab One' }} />
      <FlatList
        contentContainerClassName="my-4 gap-2"
        data={data}
        renderItem={({ item }) => {
          return <Note data={item} />;
        }}
      />
    </View>
  );
}
