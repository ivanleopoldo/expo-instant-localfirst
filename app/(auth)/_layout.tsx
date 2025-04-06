import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/(tabs)" />;
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: 'systemChromeMaterial',
        headerShadowVisible: true,
        headerLargeStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
    </Stack>
  );
}
