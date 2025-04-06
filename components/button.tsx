import { cn } from '@/lib/utils';
import { Pressable, PressableProps, Text } from 'react-native';

export default function Button({
  className,
  children,
  ...props
}: PressableProps & { children?: string }) {
  return (
    <Pressable
      className={cn(
        className,
        'flex-none items-center justify-center self-auto rounded-lg bg-zinc-800 p-4 active:bg-red-400'
      )}
      {...props}>
      <Text className="text-white">{children ?? 'Submit'}</Text>
    </Pressable>
  );
}
