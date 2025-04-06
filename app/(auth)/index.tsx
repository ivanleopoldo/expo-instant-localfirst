import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Button from '@/components/button';
import TextInput from '@/components/text-input';

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      setIsSigningIn(true);
      setError(null);
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.error(JSON.stringify(signInAttempt));
      }
    } catch (e) {
      console.error(JSON.stringify(e));
      setError(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView className="m-4 mt-4 h-full">
      <View className="gap-2">
        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-zinc-500">Email</Text>
            <Text className="text-red-500">{error ? error.errors[0].message : ''}</Text>
          </View>
          <TextInput
            placeholder="john@doe.com"
            onChange={(e) => setEmail(e.nativeEvent.text)}
            textContentType="emailAddress"
          />
        </View>
        <View className="mb-3 gap-2">
          <Text className="text-zinc-500">Password</Text>
          <TextInput
            placeholder=""
            onChange={(e) => setPassword(e.nativeEvent.text)}
            textContentType="password"
            secureTextEntry
          />
        </View>
        <Button onPress={onSignInPress}>{isSigningIn ? 'Signing In...' : 'Sign In'}</Button>
        <Text>
          Don't have an account?.{' '}
          <Text onPress={() => router.replace('/(auth)/sign-up')}>Sign Up!</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
