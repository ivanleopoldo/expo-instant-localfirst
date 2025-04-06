import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

export default function TextInput({ className, ...props }: RNTextInputProps) {
  return <RNTextInput className={cn(className, 'rounded-md bg-zinc-200 p-4')} {...props} />;
}
