import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen options={{ title: 'Note' }} name="[id]" />
    </Stack>
  );
}
