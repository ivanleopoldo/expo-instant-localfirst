import { Link, Redirect, router, Tabs } from 'expo-router';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Pressable, Text } from 'react-native';

export default function TabLayout() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();

      router.replace('/(auth)');
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

  if (!user) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          headerRight: () => {
            return (
              <Pressable onPress={handleSignOut}>
                <Text>Sign Out</Text>
              </Pressable>
            );
          },
        }}
      />
    </Tabs>
  );
}
