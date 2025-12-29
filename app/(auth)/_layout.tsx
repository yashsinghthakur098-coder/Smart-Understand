import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#E8DCC4', // Background from theme
        },
      }}
    >
      <Stack.Screen name="class-selection" />
      <Stack.Screen name="stream-selection" />
    </Stack>
  );
}