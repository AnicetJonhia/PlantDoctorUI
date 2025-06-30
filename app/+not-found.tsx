import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-xl font-semibold text-gray-800 mb-4">This screen doesn't exist.</Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-base text-blue-600 underline">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

