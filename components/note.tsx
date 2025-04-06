import { TNote } from '@/lib/types';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Note({ data }: { data: TNote }) {
  return (
    <Link
      href={{ pathname: '/(note)/[id]', params: { id: data.id } }}
      className="mx-4 rounded-lg bg-zinc-200 p-4">
      <View className="flex-col">
        <Text className="text-lg font-bold">{data.title}</Text>
        <Text className="text-zinc-500">{data.description ?? 'Add a description'}</Text>
      </View>
    </Link>
  );
}
