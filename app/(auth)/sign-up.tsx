import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Button from '@/components/button';
import TextInput from '@/components/text-input';

export default function SignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="gap-2">
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          keyboardType="number-pad"
        />
        <Button onPress={onVerifyPress}>Verify</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="m-4">
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
        <Button onPress={onSignUpPress}>{isSigningIn ? 'Signing Up...' : 'Sign Up'}</Button>
        <Text>
          Already have an account?. <Text onPress={() => router.replace('/(auth)')}>Sign In!</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
